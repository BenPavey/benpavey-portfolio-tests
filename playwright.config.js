const fs = require('fs');
const path = require('path');

const reportPath = path.resolve(__dirname, 'test-report');

// Ensure the directory exists before writing reports
if (!fs.existsSync(reportPath)) {
  fs.mkdirSync(reportPath, { recursive: true });
}

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
    ['html', { outputFolder: 'test-report', open: 'never' }],
  ],
};

module.exports = config;