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
  Contains all the test files that simulate real user journeys across the website:
  - **tests/navbar.spec.js**  
    Verifies that the navigation bar works as expected by ensuring:
    - The logo is visible.
    - All navigation links (About, Projects, Articles, Contact) are present, clickable, and scroll to the correct sections.
    - The light/dark mode toggle switches the theme appropriately.
  - **tests/hero.spec.js**  
    Checks the Hero section by confirming:
    - The header and subtext are rendered correctly.
    - Tech icons are visible in the slider.
    - (Note: The hover effect test for tech icons is currently skipped.)
  - **tests/about.spec.js**  
    Validates the About section by ensuring:
    - Key elements like the profile picture, typing effect, and "About Me" text are visible.
    - The CV download button is present and successfully initiates a file download.
  - **tests/projects.spec.js**  
    Tests the Projects section by verifying:
    - The section header, description, and project cards are visible.
    - Clicking the GitHub button on a project card opens the expected GitHub URL.
  - **tests/articles.spec.js**  
    Confirms the Articles & Guides section works as intended by checking:
    - The section header and description are visible.
    - The featured article's "Read More on Substack" link opens the correct external page.
  - **tests/contact.spec.js**  
    Ensures the Contact section is fully functional by:
    - Verifying the header and descriptive text are rendered.
    - Checking that each external contact link (GitHub, LinkedIn, Substack) and the mailto link have the correct hrefs.
    - Simulating clicks on the external links to ensure they navigate to the expected pages.


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
