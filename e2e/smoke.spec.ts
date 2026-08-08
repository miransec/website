import { expect, test } from "@playwright/test";

const siteConfigEmail = "contact@muhammadmiran.com";

test.describe("portfolio smoke", () => {
  test("home page shows brand and selected systems", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Miran" })).toBeVisible();
    await expect(
      page.getByText("AI engineer building secure, intelligent systems."),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "SELECTED SYSTEMS" })).toBeVisible();
    await expect(page.getByText("AtlasCore").first()).toBeVisible();
    await expect(page.getByText("VaaniDesk").first()).toBeVisible();
    await expect(
      page.getByRole("link", { name: /View engineering case study/i }).first(),
    ).toBeVisible();
    await expect(page.getByText(/717 backend tests/)).toBeVisible();
    await expect(page.getByText(/206 backend tests/)).toBeVisible();
    await expect(page.getByText("AI engineering × cybersecurity")).toBeVisible();
    await expect(
      page.getByText(/Open to AI engineering, applied AI, and secure systems internships/),
    ).toBeVisible();
  });

  test("primary navigation reaches core pages", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "work" }).click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(page.getByRole("heading", { name: "Work" })).toBeVisible();

    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "about" }).click();
    await expect(page).toHaveURL(/\/about$/);

    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "writing" }).click();
    await expect(
      page.getByText(/Technical notes on secure AI systems/),
    ).toBeVisible();

    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "contact" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Contact" })).toBeVisible();
  });

  test("case studies render verified project information", async ({ page }) => {
    await page.goto("/projects/vaanidesk");
    await expect(page.getByRole("heading", { name: "VaaniDesk" })).toBeVisible();
    await expect(page.getByText(/206 passed/).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /repository/i })).toHaveAttribute(
      "href",
      "https://github.com/miransec/vaanidesk",
    );
    await expect(page.getByRole("img", { name: /homepage/i }).first()).toBeVisible();
    await expect(page.getByText(/repository coming soon/i)).toHaveCount(0);
    await expect(page.getByText(/MCP server/i)).toBeVisible();

    await page.goto("/projects/atlascore");
    await expect(page.getByRole("heading", { name: "AtlasCore" })).toBeVisible();
    await expect(page.getByText(/717 passed/).first()).toBeVisible();
    await expect(page.getByText(/46\/46/).first()).toBeVisible();
    await expect(page.getByText(/FORCE RLS/).first()).toBeVisible();
    await expect(page.getByText(/Workspace UI v2/i).first()).toBeVisible();
    await expect(page.getByText(/Not shipped/i).first()).toBeVisible();
    await expect(page.getByText(/Gemini/i).first()).toBeVisible();
    await expect(page.getByText(/In active development/)).toHaveCount(0);
    await expect(page.getByRole("link", { name: /repository/i })).toHaveAttribute(
      "href",
      "https://github.com/miransec/atlascore",
    );
    await expect(page.getByText(/unpublished/i)).toHaveCount(0);
  });

  test("contact email and safe placeholders", async ({ page }) => {
    await page.goto("/contact");
    await expect(
      page.locator('a[href="mailto:contact@muhammadmiran.com"]').first(),
    ).toBeVisible();
    await expect(page.getByText(siteConfigEmail).first()).toBeVisible();
    await expect(
      page.locator(
        'a[href="https://www.linkedin.com/in/muhammad-miran-3672a242"]',
      ),
    ).toBeVisible();
    await expect(page.getByText(/LinkedIn.*coming soon/i)).toHaveCount(0);

    await page.goto("/");
    await expect(
      page.locator('a[href="https://github.com/miransec"]').first(),
    ).toBeVisible();
    await expect(
      page.locator(
        'a[href="https://www.linkedin.com/in/muhammad-miran-3672a242"]',
      ).first(),
    ).toBeVisible();

    await page.goto("/resume");
    await expect(page.getByText(/coming soon/i)).toBeVisible();
    await expect(page.locator('a[href="/resume.pdf"]')).toHaveCount(0);
  });
});
