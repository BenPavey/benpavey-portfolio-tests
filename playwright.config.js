// playwright.config.js
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    use: {
      // Global settings for all tests
      headless: false, // Initially run in head mode for debugging; switch to headless for faster CI runs.
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
    reporter: [['list'], ['html', { outputFolder: 'test-report', open: 'never' }]],
  };
  module.exports = config;
  