// tests/articles.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Articles & Guides Section', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the production URL (or BASE_URL from .env) and scroll to the articles section.
    await page.goto(process.env.BASE_URL);
    await page.locator('section#articles').scrollIntoViewIfNeeded();
  });

  test('Articles section elements are visible', async ({ page }) => {
    const articlesSection = page.locator('section#articles');
    await expect(articlesSection).toBeVisible();

    // Verify that the section header is visible and correct.
    const header = articlesSection.locator('h3');
    await expect(header).toBeVisible();
    await expect(header).toHaveText(/Articles & Guides/);

    // Verify that the description paragraph is visible.
    const description = articlesSection.locator('p').first();
    await expect(description).toBeVisible();
  });

  test('Featured article "Read More" link works', async ({ page, context }) => {
    const articlesSection = page.locator('section#articles');
    // Select the "Read More on Substack" link inside the featured article.
    const readMoreButton = articlesSection.locator('.featured-article a.read-more-button');
    await expect(readMoreButton).toBeVisible();

    // Wait for a new page (popup) event triggered by clicking the link.
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      readMoreButton.click(),
    ]);
    await newPage.waitForLoadState();
    // Assert that the new page's URL contains the expected Substack domain.
    expect(newPage.url()).toContain('benpavey.substack.com');
    // Optionally, close the new page.
    await newPage.close();
  });
});
