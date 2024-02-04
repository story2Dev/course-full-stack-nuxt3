import { test, expect } from "@playwright/test";

test("Example test", async ({ page }) => {
  // Navigate to your Nuxt 3 app's URL
  await page.goto("/test");

  // Perform actions and assertions using Playwright's API
  await page.click("button");
  const text = await page.textContent("h1");

  // Use assertions from the 'expect' module to validate the test results
  expect(text).toBe("Hello, Nuxt 3!");
  await page.locator('#input').fill('12345')
});