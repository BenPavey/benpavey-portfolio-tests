# BenPavey Portfolio Test Suite

This repository contains a test suite built with [Playwright](https://playwright.dev/) to validate the functionality, usability, and performance of the [benpavey.com](https://benpavey.com) portfolio website. The site is a single-page application built with Django (serving minimal Python code) alongside HTML, CSS, and JavaScript.

## Project Structure

- **README.md**  
  This file provides an overview of the project, setup instructions, and a description of each file's responsibilities.

- **package.json**  
  Contains metadata about the Node.js project, including dependencies (like `@playwright/test`), scripts, and configuration details. This file ensures that everyone working on the project installs the exact required packages.

- **playwright.config.js**  
  The main configuration file for Playwright. It defines:
  - Global settings (e.g., headless mode, screenshot capture on test failures)
  - Two test projects:
    - **Chromium** for testing in a Chrome-like environment.
    - **WebKit** for testing in a Safari-like environment.
  - Reporter configuration that outputs an HTML report and console logs.

- **tests/**  
  Contains all the test files:
  - **tests/homepage.spec.js**  
    A sample test that:
    - Navigates to [benpavey.com](https://benpavey.com)
    - Verifies the page title matches expectations
    - Captures a screenshot on failure

- **.gitignore**  
  Specifies files and directories that Git should ignore to keep the repository clean. This includes:
  - `node_modules/` — Local Node dependencies.
  - `.env` — Local environment variable definitions.
  - `screenshots/` — Folder for saving test screenshots.
  - `test-report/` — Folder where test reports are generated.

- **.env** *(Local file; not committed)*  
  Used for storing environment-specific configurations and sensitive data (e.g., API keys, base URLs). It is not tracked by Git to protect sensitive information.

## Getting Started

### Prerequisites

- **Node.js and npm**:  
  Ensure you have Node.js (which includes npm) installed. Download from [nodejs.org](https://nodejs.org).

- **Python (Optional)**:  
  If you're working with Django for your portfolio, consider setting up a Python virtual environment to manage Python dependencies separately.

### Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/benpavey-portfolio-tests.git
   cd benpavey-portfolio-tests
   ```

2. **(Optional) Create a Python Virtual Environment:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Node Dependencies:**

   ```bash
   npm install
   ```

4. **Install Playwright Browsers:**

   ```bash
   npx playwright install
   ```

5. **Run the Tests:**

   ```bash
   npx playwright test
   ```

## Testing Modes

- **Head Mode:**  
  Tests run with a visible browser window for easier debugging.
  
- **Headless Mode:**  
  For faster execution (especially in CI/CD environments), tests can be run in headless mode by toggling the setting in `playwright.config.js` or via CLI flags.

## CI/CD and Future Enhancements

- **CI/CD Pipeline:**  
  Plans include integrating with GitHub Actions to run tests on pushes to the main branch and scheduled runs (e.g., weekly or daily at 8 AM).

- **Docker and Kubernetes:**  
  Future phases will containerize the test suite using Docker and deploy it to a GCP Kubernetes cluster, using Helm charts for configuration and deployment. This will also include setting up scheduled tests to reduce service usage.

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (e.g., `feature/new-test`).
3. Commit your changes with clear commit messages.
4. Open a pull request for review.


---

For questions or support, please contact [contact@benpavey.com].
