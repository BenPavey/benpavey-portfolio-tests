// tests/contact.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Contact Section', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the production URL (or BASE_URL from .env) and scroll to the Contact section.
    await page.goto(process.env.BASE_URL);
    await page.locator('section#contact').scrollIntoViewIfNeeded();
  });

  test('Contact section elements are visible', async ({ page }) => {
    const contactSection = page.locator('section#contact');
    await expect(contactSection).toBeVisible();

    // Verify that the header and description are present.
    const header = contactSection.locator('h3');
    await expect(header).toBeVisible();
    await expect(header).toHaveText(/Contact/);

    const description = contactSection.locator('p');
    await expect(description).toBeVisible();
    await expect(description).toHaveText(/Let's connect/);

    // Verify that contact links are present.
    const contactLinks = contactSection.locator('ul.contact-links li a');
    const count = await contactLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Contact links simulate clicks and navigate correctly', async ({ page, context }) => {
    const contactSection = page.locator('section#contact');
    // Define an array of contact links with their selectors and expected hrefs.
    const links = [
      { selector: 'a:has(i.devicon-github-original)', expected: 'https://github.com/BenPavey' },
      { selector: 'a:has(i.devicon-linkedin-plain)', expected: 'https://www.linkedin.com/in/benpavey/' },
      { selector: 'a:has(i.fa-solid.fa-book-open)', expected: 'https://benpavey.substack.com/' },
      { selector: 'a:has(i.fas.fa-envelope)', expected: 'mailto:contact@benpavey.com' },
    ];

    for (const { selector, expected } of links) {
      const linkLocator = contactSection.locator(selector);
      await expect(linkLocator).toBeVisible();
      const href = await linkLocator.getAttribute('href');
      expect(href).toBe(expected);

      // For HTTP/HTTPS links, simulate a click and verify the new page.
      if (href.startsWith('https://')) {
        const [newPage] = await Promise.all([
          context.waitForEvent('page'),
          linkLocator.click(),
        ]);
        await newPage.waitForLoadState();
        // Check that the new page's URL contains the expected domain.
        // This is a simple check; you can refine it as needed.
        const domain = expected.replace('https://', '').split('/')[0];
        expect(newPage.url()).toContain(domain);
        await newPage.close();
      }
    }
  });
});
