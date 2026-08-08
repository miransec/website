#!/usr/bin/env node
/**
 * Capture real AtlasCore UI screenshots into public/projects/atlascore/.
 *
 * Prerequisites:
 * - AtlasCore frontend reachable (SSH tunnel): http://localhost:3100
 * - Optional backend: http://localhost:8100
 * - Env:
 *     ATLASCORE_SCREENSHOT_EMAIL
 *     ATLASCORE_SCREENSHOT_PASSWORD
 *
 * Never hardcode credentials. Never print the password or tokens.
 */

import { chromium } from "@playwright/test";
import { existsSync, mkdirSync, renameSync, unlinkSync, promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "projects", "atlascore");
const TMP_DIR = join(ROOT, "screenshots", "atlascore-tmp");

const BASE_URL = process.env.ATLASCORE_BASE_URL || "http://localhost:3100";
const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE = 1;

const SENSITIVE =
  /(password\s*[:=]|bearer\s+[a-z0-9\-._~+/]+=*|eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+|sk-[a-zA-Z0-9]{16,}|api[_-]?key\s*[:=]\s*[a-z0-9_\-]{12,}|authorization\s*[:=])/i;

/** @typedef {'PASS'|'SKIP'|'FAIL'} ShotStatus */

/**
 * @typedef {{
 *  id: string,
 *  file: string,
 *  path: string,
 *  prepare: (page: import('@playwright/test').Page) => Promise<'ok'|'skip'>,
 *  validate?: (page: import('@playwright/test').Page) => Promise<boolean>,
 * }} ShotSpec
 */

function requireCreds() {
  const email = process.env.ATLASCORE_SCREENSHOT_EMAIL;
  const password = process.env.ATLASCORE_SCREENSHOT_PASSWORD;
  if (!email || !password) {
    console.error(`
Missing screenshot credentials.

Set temporary environment variables (PowerShell), then re-run:

  $env:ATLASCORE_SCREENSHOT_EMAIL="your@email"
  $env:ATLASCORE_SCREENSHOT_PASSWORD="your-password"
  npm run screenshots:atlascore

AtlasCore frontend must already be reachable at ${BASE_URL}
(typically via SSH tunnel). Do not put credentials in source files.
`);
    process.exit(1);
  }
  return { email, password };
}

async function assertReachable(url) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok && res.status >= 500) {
      throw new Error(`HTTP ${res.status}`);
    }
  } catch (err) {
    console.error(`AtlasCore frontend not reachable at ${url}`);
    console.error(String(err?.message || err));
    console.error("Start the SSH tunnel / local frontend, then retry.");
    process.exit(1);
  }
}

async function dismissNoise(page) {
  // Best-effort toast / dialog dismissal without fabricating content.
  const candidates = [
    page.getByRole("button", { name: /dismiss|close|got it|ok/i }),
    page.locator("[data-sonner-toast] button"),
  ];
  for (const loc of candidates) {
    try {
      const count = await loc.count();
      for (let i = 0; i < Math.min(count, 3); i++) {
        const item = loc.nth(i);
        if (await item.isVisible().catch(() => false)) {
          await item.click({ timeout: 500 }).catch(() => {});
        }
      }
    } catch {
      // ignore
    }
  }
}

async function waitSettled(page) {
  await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
  await page
    .locator(".animate-spin, [data-loading='true'], [aria-busy='true']")
    .first()
    .waitFor({ state: "hidden", timeout: 15000 })
    .catch(() => {});
  await page.waitForTimeout(400);
  await dismissNoise(page);
}

async function login(page, email, password) {
  await page.goto(`${BASE_URL}/login`, { waitUntil: "domcontentloaded" });
  await waitSettled(page);

  const emailInput = page.getByLabel(/email/i).or(page.locator('input[type="email"]'));
  const passwordInput = page
    .getByLabel(/password/i)
    .or(page.locator('input[type="password"]'));

  await emailInput.first().fill(email);
  await passwordInput.first().fill(password);
  await page.getByRole("button", { name: /continue|sign in|log in/i }).click();

  // After login AtlasCore routes through org selection.
  await page.waitForURL(/\/(select-org|dashboard)/, { timeout: 45000 });
  await waitSettled(page);

  if (page.url().includes("select-org")) {
    const orgButton = page
      .getByRole("button")
      .filter({ hasText: /.+/ })
      .first()
      .or(page.locator("button, a").filter({ hasText: /continue|select|open/i }).first());
    // Prefer clicking the first organisation card/button if present.
    const cards = page.locator("button, [role='button'], a").filter({
      hasText: /./,
    });
    const n = await cards.count();
    let clicked = false;
    for (let i = 0; i < n; i++) {
      const el = cards.nth(i);
      const text = ((await el.innerText().catch(() => "")) || "").trim();
      if (!text || /register|sign out|log out/i.test(text)) continue;
      if (text.length < 2) continue;
      await el.click().catch(() => {});
      clicked = true;
      break;
    }
    if (!clicked) {
      await orgButton.click().catch(() => {});
    }
    await page.waitForURL(/\/dashboard/, { timeout: 45000 });
    await waitSettled(page);
  }

  if (!page.url().includes("/dashboard")) {
    throw new Error(`Login did not reach dashboard. Current URL: ${page.url()}`);
  }
}

async function pageLooksSensitive(page) {
  const text = await page.locator("body").innerText();
  return SENSITIVE.test(text);
}

async function gotoDashboardPath(page, path) {
  await page.goto(`${BASE_URL}${path}`, { waitUntil: "domcontentloaded" });
  await waitSettled(page);
  if (page.url().includes("/login")) {
    throw new Error(`Session lost navigating to ${path}`);
  }
}

/**
 * @returns {ShotSpec[]}
 */
function shotSpecs() {
  return [
    {
      id: "dashboard",
      file: "dashboard.png",
      path: "/dashboard",
      prepare: async (page) => {
        await gotoDashboardPath(page, "/dashboard");
        return "ok";
      },
    },
    {
      id: "workspaces",
      file: "workspaces.png",
      path: "/dashboard/workspaces",
      prepare: async (page) => {
        await gotoDashboardPath(page, "/dashboard/workspaces");
        return "ok";
      },
    },
    {
      id: "knowledge",
      file: "knowledge.png",
      path: "/dashboard/sources",
      prepare: async (page) => {
        await gotoDashboardPath(page, "/dashboard/sources");
        const empty = await page
          .getByText(/no sources|empty|get started/i)
          .first()
          .isVisible()
          .catch(() => false);
        if (empty) {
          await gotoDashboardPath(page, "/dashboard/documents");
        }
        return "ok";
      },
    },
    {
      id: "search",
      file: "search.png",
      path: "/dashboard/search",
      prepare: async (page) => {
        await gotoDashboardPath(page, "/dashboard/search");
        const input = page
          .getByRole("searchbox")
          .or(page.getByPlaceholder(/search/i))
          .or(page.locator('input[type="search"], input[type="text"]').first());
        if (await input.first().isVisible().catch(() => false)) {
          const query =
            process.env.ATLASCORE_SCREENSHOT_SEARCH_QUERY || "knowledge";
          await input.first().fill(query);
          await page.keyboard.press("Enter");
          await waitSettled(page);
        }
        return "ok";
      },
    },
    {
      id: "ask-ai",
      file: "ask-ai.png",
      path: "/dashboard/answer",
      prepare: async (page) => {
        await gotoDashboardPath(page, "/dashboard/answer");
        const question =
          process.env.ATLASCORE_SCREENSHOT_ASK_QUERY ||
          "What does the knowledge base say about workspace access control?";
        const box = page
          .getByRole("textbox")
          .or(page.getByPlaceholder(/ask|question|message/i))
          .or(page.locator("textarea").first());
        if (!(await box.first().isVisible().catch(() => false))) {
          return "skip";
        }
        await box.first().fill(question);
        const send = page.getByRole("button", {
          name: /ask|send|submit|generate/i,
        });
        if (await send.first().isVisible().catch(() => false)) {
          await send.first().click();
        } else {
          await page.keyboard.press("Enter");
        }
        // Wait for answer / abstention / evidence — do not fabricate.
        await page
          .getByText(/evidence|citation|abstain|insufficient|answer|sources/i)
          .first()
          .waitFor({ timeout: 90000 })
          .catch(() => {});
        await waitSettled(page);

        const failed = await page
          .getByText(/provider (error|unavailable)|failed to|rate limit/i)
          .first()
          .isVisible()
          .catch(() => false);
        if (failed) {
          throw new Error(
            "Ask AI provider failure — leaving existing ask-ai.png untouched if present",
          );
        }
        return "ok";
      },
      validate: async (page) => {
        const body = await page.locator("body").innerText();
        return /evidence|citation|abstain|insufficient|answer|ask/i.test(body);
      },
    },
    {
      id: "security",
      file: "security.png",
      path: "/dashboard/audit",
      prepare: async (page) => {
        const candidates = [
          "/dashboard/audit",
          "/dashboard/api-keys",
          "/dashboard/service-accounts",
          "/dashboard/members",
          "/dashboard/teams",
        ];
        for (const path of candidates) {
          await gotoDashboardPath(page, path);
          if (await pageLooksSensitive(page)) {
            continue;
          }
          const empty = await page
            .getByText(/no (api keys|service accounts|audit|members|teams)/i)
            .first()
            .isVisible()
            .catch(() => false);
          if (!empty) return "ok";
        }
        // Fall back to audit even if sparse — still a real security surface.
        await gotoDashboardPath(page, "/dashboard/audit");
        if (await pageLooksSensitive(page)) {
          return "skip";
        }
        return "ok";
      },
    },
  ];
}

async function captureOne(page, spec) {
  /** @type {ShotStatus} */
  let status = "FAIL";
  const finalPath = join(OUT_DIR, spec.file);
  const tmpPath = join(TMP_DIR, `${spec.id}.tmp.png`);

  try {
    const prep = await spec.prepare(page);
    if (prep === "skip") {
      status = "SKIP";
      return status;
    }
    if (await pageLooksSensitive(page)) {
      console.warn(`[${spec.id}] SKIP — sensitive patterns visible in page text`);
      status = "SKIP";
      return status;
    }
    if (spec.validate) {
      const ok = await spec.validate(page);
      if (!ok) {
        throw new Error("validation failed for page content");
      }
    }

    await page.screenshot({
      path: tmpPath,
      fullPage: false,
      type: "png",
    });

    // Basic size sanity — reject tiny/blank captures.
    const { size } = await fs.stat(tmpPath);
    if (size < 8_000) {
      throw new Error(`screenshot too small (${size} bytes)`);
    }

    renameSync(tmpPath, finalPath);
    status = "PASS";
  } catch (err) {
    status = "FAIL";
    console.error(`[${spec.id}] FAIL — ${err?.message || err}`);
    if (existsSync(tmpPath)) {
      try {
        unlinkSync(tmpPath);
      } catch {
        // ignore
      }
    }
    // Do not overwrite a valid existing final with a failure.
  }

  return status;
}

async function main() {
  const { email, password } = requireCreds();
  await assertReachable(BASE_URL);

  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(TMP_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DEVICE_SCALE,
    colorScheme: "dark",
  });
  const page = await context.newPage();

  /** @type {Record<string, ShotStatus>} */
  const results = {};

  try {
    console.log(`Logging into AtlasCore at ${BASE_URL} …`);
    await login(page, email, password);
    console.log("Authenticated dashboard ready.");

    for (const spec of shotSpecs()) {
      process.stdout.write(`Capturing ${spec.id} … `);
      const status = await captureOne(page, spec);
      results[spec.id] = status;
      console.log(status);
    }
  } finally {
    await context.close();
    await browser.close();
  }

  console.log("\nScreenshot summary");
  console.log(`Viewport: ${VIEWPORT.width}x${VIEWPORT.height} @${DEVICE_SCALE}x`);
  for (const [id, status] of Object.entries(results)) {
    console.log(`  ${id}: ${status}`);
  }

  const failed = Object.values(results).filter((s) => s === "FAIL");
  if (failed.length) {
    process.exitCode = 2;
  }
}

main().catch((err) => {
  console.error(String(err?.message || err));
  process.exit(1);
});
