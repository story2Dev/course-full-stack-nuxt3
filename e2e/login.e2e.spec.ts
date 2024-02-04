import { test, expect } from "@playwright/test";

test("Login page test", async ({ page }) => {
  // Navigate to your Nuxt 3 app's URL
  await page.goto("/login");

  await page.locator("input[type=text]").fill("test@email.com");
  await page.locator('input[type=password]').fill("1234");
  await page.click("button");
  // capture the screenshot
  await page.screenshot();
  // after login
  await page.goto("/");
  const text = await page.textContent("h1");
  expect(text).toBe("Welcome");

});
