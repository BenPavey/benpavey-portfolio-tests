// playwright.config.js

require('dotenv').config();

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: {
    // Global settings for all tests
    headless: true,
    screenshot: 'only-on-failure', // Capture screenshots on test failures.
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit' },
    },
  ],
  reporter: [['list'], ['html', { outputFolder: '/app/playwright-report', open: 'never' }]],
};

module.exports = config;