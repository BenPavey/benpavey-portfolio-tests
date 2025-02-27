// tests/homepage.spec.js
const { test, expect } = require('@playwright/test');

test('Homepage loads correctly', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await expect(page).toHaveTitle(/Ben Pavey/i);
  // Capture a screenshot at the end of the test for reference
  await page.screenshot({ path: 'screenshots/homepage.png' });
});
