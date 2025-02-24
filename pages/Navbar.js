// pages/Navbar.js
const { expect } = require('@playwright/test');

class Navbar {
  constructor(page) {
    this.page = page;
    // Select the logo by its tag and class
    this.logo = page.locator('h1.logo');
    // Desktop navigation links selected by text within the ul.nav-links
    this.aboutLink = page.locator('ul.nav-links a', { hasText: 'About' });
    this.projectsLink = page.locator('ul.nav-links a', { hasText: 'Projects' });
    this.articlesLink = page.locator('ul.nav-links a', { hasText: 'Articles' });
    this.contactLink = page.locator('ul.nav-links a', { hasText: 'Contact' });
    // Dark/Light mode toggle button selected by its id
    this.darkModeToggle = page.locator('#dark-mode-toggle');
    // If you have a "scroll-to-top" button, adjust the selector accordingly.
    // For now, we'll assume there is a button with id="scroll-top". If not, we'll simulate scrolling.
    this.scrollTopButton = page.locator('#scroll-top');
  }

  async verifyLogoVisible() {
    await expect(this.logo).toBeVisible();
  }

  async clickNavLink(link) {
    await link.click();
    // Wait for any smooth scrolling to complete
    await this.page.waitForTimeout(500);
  }

  async verifySectionInView(sectionId) {
    const section = this.page.locator(sectionId);
    // Ensure the section is visible (i.e. scrolled into view)
    await expect(section).toBeVisible();
  }

  async scrollToTop() {
    // If a scroll-to-top button exists, click it; otherwise, simulate scrolling to the top
    if (await this.scrollTopButton.count() > 0) {
      await this.scrollTopButton.click();
    } else {
      await this.page.evaluate(() => window.scrollTo(0, 0));
    }
    await this.page.waitForTimeout(500);
  }

  async toggleLightMode() {
    await this.darkModeToggle.click();
    // Allow time for the theme transition
    await this.page.waitForTimeout(500);
  }
}

module.exports = Navbar;
