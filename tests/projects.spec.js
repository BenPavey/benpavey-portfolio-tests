// tests/projects.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Projects Section', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to your production URL (or BASE_URL from .env) and scroll to the Projects section.
    await page.goto(process.env.BASE_URL);
    await page.locator('section#projects').scrollIntoViewIfNeeded();
  });

  test('Projects section elements are visible', async ({ page }) => {
    const projectsSection = page.locator('section#projects');
    await expect(projectsSection).toBeVisible();

    // Verify that the section header and description are rendered.
    const header = projectsSection.locator('h3');
    await expect(header).toBeVisible();
    await expect(header).toHaveText(/Projects/);

    const description = projectsSection.locator('p').first();
    await expect(description).toBeVisible();

    // Verify that there is at least one project card present.
    const projectCards = projectsSection.locator('.project-card');
    const count = await projectCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('GitHub button in project cards works', async ({ page, context }) => {
    const projectsSection = page.locator('section#projects');
    // Select the GitHub button of the first project card.
    const githubButton = projectsSection.locator('.project-card a.github-icon').first();
    await expect(githubButton).toBeVisible();

    // Wait for the new page (popup) event triggered by clicking the button.
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      githubButton.click(),
    ]);
    await newPage.waitForLoadState();
    // Assert that the new page's URL contains "github.com/benpavey"
    expect(newPage.url()).toContain('github.com/benpavey');
    // Optionally, close the new page.
    await newPage.close();
  });
});
