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

---

## **🛠 Dependencies & Getting Started**

This section covers all required dependencies and steps to run the Playwright test suite **locally** or within **Kubernetes (Minikube).**

---

### **📌 Prerequisites**
Ensure you have the following installed:

- **Node.js & npm** – Required for Playwright and test execution.
- **Playwright** – Automated browser testing framework.
- **Docker** – Required for containerizing the test suite (optional for local execution).
- **Kubernetes (Minikube)** – Local Kubernetes cluster for running tests inside a Job.
- **Helm** – Package manager for deploying test workloads in Kubernetes.
- **(Optional) Python** – If working with Django, set up a virtual environment.

---

### **🔧 Installation Commands**
#### **1️⃣ Install Core Dependencies**
```bash
# Install Node.js and npm (if not installed)
brew install node  # macOS
sudo apt install nodejs npm  # Ubuntu/Debian
choco install nodejs  # Windows

# Install Playwright and required browsers
npm install
npx playwright install
```

#### **2️⃣ (Optional) Set Up a Python Virtual Environment**
```bash
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate  # Windows
```

#### **3️⃣ Install Docker & Kubernetes Tools**
```bash
# Install Docker
brew install --cask docker  # macOS
sudo apt install docker.io  # Ubuntu/Debian
choco install docker-desktop  # Windows

# Install Minikube (for local Kubernetes)
brew install minikube  # macOS
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && sudo install minikube-linux-amd64 /usr/local/bin/minikube  # Linux

# Install Helm (for managing Kubernetes deployments)
brew install helm  # macOS
sudo apt install helm  # Ubuntu/Debian
choco install kubernetes-helm  # Windows
```

---

## **🚀 Running the Tests**
This section covers **two ways to execute tests:**
1. **Locally** (without Kubernetes)
2. **Inside Kubernetes (Minikube)**

---

### **1️⃣ Running Playwright Tests Locally**
For local execution, run:

```bash
npx playwright test
```

This will:
- Launch a browser and execute tests.
- Run in **headless mode** by default (configurable in `playwright.config.js`).
- Generate an **HTML report** with results.

---

### **2️⃣ Running the Tests in Kubernetes**
To run the tests inside **Minikube**: refer to GUIDE.md

---

## **Workflow Summary**
The Playwright test suite follows this workflow:

1. **Tests are defined** in Playwright (`tests/` directory).
2. **Locally, tests can be executed** via `npx playwright test`.
3. **To run tests in Kubernetes**, a Docker image is built and deployed:
   - The **Docker container** includes Playwright, dependencies, and tests.
   - The container is **deployed as a Kubernetes Job** via Helm.
   - **Helm charts** (`values.yaml`, `job.yaml`) configure the test execution.
4. **Test logs are retrieved from Kubernetes** after execution.

---

## **Future Enhancements**
### **1️⃣ Automating Tests with a Scheduled CronJob**
- Once the test suite is migrated to **Google Kubernetes Engine (GKE)**, a **Kubernetes CronJob** will be used to **run tests automatically every Monday at 8 AM**.
- This will remove the need for manual execution.

### **2️⃣ Migrating to Google Kubernetes Engine (GKE)**
- Move from **Minikube (local)** to **Google Cloud** to allow **tests to run without requiring a local machine to be online**.
- Docker images will be stored in **Google Container Registry (GCR)**.

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (e.g., `feature/new-test`).
3. Commit your changes with clear commit messages.
4. Open a pull request for review.

---

For questions or support, please contact [contact@benpavey.com].
