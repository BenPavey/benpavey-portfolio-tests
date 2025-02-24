// tests/about.spec.js
const { test, expect } = require('@playwright/test');

test.describe('About Section', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to production URL and scroll to the about section.
    await page.goto(process.env.BASE_URL);
    await page.locator('section#about').scrollIntoViewIfNeeded();
  });

  test('About section elements are visible', async ({ page }) => {
    const aboutSection = page.locator('section#about');
    await expect(aboutSection).toBeVisible();

    // Verify the profile picture is visible.
    const profilePic = aboutSection.locator('img.profile-pic');
    await expect(profilePic).toBeVisible();

    // Verify the typing effect element is present.
    const typingEffect = aboutSection.locator('#typing-effect');
    await expect(typingEffect).toBeVisible();

    // Verify the About Me heading is visible.
    const aboutHeading = aboutSection.locator('.about-card h3');
    await expect(aboutHeading).toBeVisible();
    await expect(aboutHeading).toHaveText(/About Me/);

    // Verify that at least one paragraph is visible.
    const aboutParagraph = aboutSection.locator('.about-card p').first();
    await expect(aboutParagraph).toBeVisible();

    // Verify the CV download button is visible.
    const cvButton = aboutSection.locator('a.cv-button');
    await expect(cvButton).toBeVisible();
  });

  test('CV download button initiates download', async ({ page }) => {
    const cvButton = page.locator('a.cv-button');
    // Listen for the download event when clicking the CV button.
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      cvButton.click(),
    ]);
    // Verify the suggested filename contains "Ben_Pavey_CV"
    const filename = download.suggestedFilename();
    expect(filename).toContain('Ben_Pavey_CV');
  });

  test('Typing effect displays text', async ({ page }) => {
    const typingEffect = page.locator('#typing-effect');
    // Wait for the typing effect to display some non-empty text (up to 10 seconds)
    await expect(typingEffect).toHaveText(/.+/, { timeout: 10000 });
  });
});
