// tests/navbar.spec.js
const { test, expect } = require('@playwright/test');
const Navbar = require('../pages/Navbar');

test.describe('Navbar User Journeys', () => {
  test.beforeEach(async ({ page }) => {
    // Run tests against the production version (set BASE_URL in your .env or default to your URL)
    await page.goto(process.env.BASE_URL);
  });

  test('Logo is visible', async ({ page }) => {
    const navbar = new Navbar(page);
    await navbar.verifyLogoVisible();
  });

  test('Navigation links scroll to expected sections and scroll-to-top works', async ({ page }) => {
    const navbar = new Navbar(page);
    // Define nav links and corresponding section selectors (assumes sections have ids matching the href values)
    const navItems = [
      { link: navbar.aboutLink, section: '#about' },
      { link: navbar.projectsLink, section: '#projects' },
      { link: navbar.articlesLink, section: '#articles' },
      { link: navbar.contactLink, section: '#contact' },
    ];

    for (const { link, section } of navItems) {
      await navbar.clickNavLink(link);
      await navbar.verifySectionInView(section);
      await navbar.scrollToTop();
    }
  });

  test.fixme('Dark/Light mode toggle works', async ({ page }) => {
    // This test is currently unstable.
    // TODO: Revisit the dark/light mode toggle implementation and update the test accordingly.
  });
  
});
