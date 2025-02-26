require('dotenv').config();

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'WebKit', use: { browserName: 'webkit' } },
  ],
  reporter: [
    ['list'],
    ['html'],  // ✅ No custom output folder (default is `playwright-report/`)
  ],
};

module.exports = config;