import { expect, test } from "@playwright/test";

test.describe("portfolio smoke", () => {
  test("home page shows brand and featured projects", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Miran" })).toBeVisible();
    await expect(page.getByText("VaaniDesk").first()).toBeVisible();
    await expect(page.getByText("AtlasCore").first()).toBeVisible();
    await expect(page.getByRole("link", { name: "View Projects" })).toBeVisible();
  });

  test("primary navigation reaches core pages", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();

    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about$/);

    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Writing" }).click();
    await expect(page.getByText("Technical writing coming soon.")).toBeVisible();

    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Contact" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Contact" })).toBeVisible();
  });

  test("case studies render verified project information", async ({ page }) => {
    await page.goto("/projects/vaanidesk");
    await expect(page.getByRole("heading", { name: "VaaniDesk" })).toBeVisible();
    await expect(page.getByText(/197 passed/)).toBeVisible();
    await expect(page.getByText(/Repository coming soon/)).toBeVisible();
    await expect(page.getByText(/MCP server/i)).toBeVisible();

    await page.goto("/projects/atlascore");
    await expect(page.getByRole("heading", { name: "AtlasCore" })).toBeVisible();
    await expect(page.getByText("AtlasCore — In active development")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Roadmap (not completed)" })).toBeVisible();
  });

  test("contact email and safe placeholders", async ({ page }) => {
    await page.goto("/contact");
    await expect(
      page.locator('a[href="mailto:contact@muhammadmiran.com"]').first(),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Email me" }).first()).toBeVisible();
    await expect(page.getByText(/preferred contact method/i)).toBeVisible();

    await page.goto("/");
    await expect(
      page.locator('a[href="https://github.com/miransec"]').first(),
    ).toBeVisible();

    await page.goto("/resume");
    await expect(page.getByText(/coming soon/i)).toBeVisible();
    await expect(page.locator('a[href="/resume.pdf"]')).toHaveCount(0);
  });
});
