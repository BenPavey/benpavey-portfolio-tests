// tests/hero.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to production URL (or the URL defined in your .env)
    await page.goto(process.env.BASE_URL || 'https://www.benpavey.com');
  });

  test('Hero header and subtext are visible', async ({ page }) => {
    // Check that the hero section header and subtext are rendered
    const heroHeader = page.locator('.hero .hero-text');
    const heroSubtext = page.locator('.hero .hero-subtext');
    
    await expect(heroHeader).toBeVisible();
    await expect(heroHeader).toHaveText(/Engineering with Purpose and Precision/);
    await expect(heroSubtext).toBeVisible();
    await expect(heroSubtext).toHaveText(/DevOps, Quality, and the pursuit of simplicity in Engineering/);
  });

  test('Tech icons are visible in the tech slider', async ({ page }) => {
    // Select all tech icons in the slider
    const techIcons = page.locator('.tech-slider-container .tech-track-container i');
    // Verify at least one icon is visible
    await expect(techIcons.first()).toBeVisible();
    const count = await techIcons.count();
    expect(count).toBeGreaterThan(0);
  });

  test.skip('Tech icon enlarges on hover', async ({ page }) => {
    // This test is currently skipped due to hover effect issues.
    // TODO: Revisit the hover test to check for CSS transition changes when hovering over tech icons.
  });
});
