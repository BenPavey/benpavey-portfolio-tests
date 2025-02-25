### **📝 Updated `README.md` - BenPavey Portfolio Test Suite**
```md
# BenPavey Portfolio Test Suite

This repository contains a test suite built with [Playwright](https://playwright.dev/) to validate the functionality, usability, and performance of the [benpavey.com](https://benpavey.com) portfolio website. The site is a single-page application built with Django (serving minimal Python code) alongside HTML, CSS, and JavaScript.

## **🚀 Automated Testing & CI/CD Workflow**

### **✅ GitHub Actions - Automated Testing**
This test suite is **automatically executed** using **GitHub Actions**, which:
- Runs tests **inside a Docker container** for consistency.
- Executes **on every push to `main`** to catch regressions.
- Runs **every Tuesday at 10:30 AM UTC** as a scheduled job.
- Uploads test reports as an **artifact** for review.
- Sends **email notifications** about test success or failure.

#### **📌 Running Tests via GitHub Actions**
You don’t need to manually trigger tests—they run automatically based on:
- **Push to `main`** → Triggers tests immediately.
- **Scheduled Cron Job** → Runs at `10:30 AM UTC on Tuesdays`.

**Test Reports:**  
After the workflow completes, **test reports are available** as GitHub Artifacts.

---

## **📂 Project Structure**

- **README.md**  
  Overview of the project, setup instructions, and workflow details.

- **.github/workflows/playwright.yml**  
  - Defines **GitHub Actions** for running tests in **Docker**.
  - Triggers tests on **push to `main`** and **every Tuesday at 10:30 AM UTC**.
  - Uploads test reports as artifacts.

- **Dockerfile**  
  - Defines the **Playwright test environment** inside a Docker container.
  - Ensures tests run consistently across environments.

- **playwright.config.js**  
  - Configuration for Playwright test execution.
  - Specifies browsers (`Chromium`, `WebKit`), reporting, and timeouts.

- **tests/**  
  Contains all Playwright test files covering user journeys across the website:
  - `tests/navbar.spec.js` – Tests navigation bar, links, and dark mode toggle.
  - `tests/hero.spec.js` – Verifies hero section, text, and scrolling icons.
  - `tests/about.spec.js` – Ensures profile, typing effect, and CV download work.
  - `tests/projects.spec.js` – Checks project listings and GitHub links.
  - `tests/articles.spec.js` – Validates articles section and Substack links.
  - `tests/contact.spec.js` – Tests contact section and external links.

- **.gitignore**  
  - Prevents sensitive files (`.env`, `node_modules`, test reports) from being committed.

---

## **🛠 Dependencies & Setup**

### **📌 Required Tools**
| Dependency  | Purpose |
|------------|---------|
| **Node.js & npm** | Required for running Playwright tests. |
| **Playwright** | Automated browser testing framework. |
| **Docker** | Containerizes the test suite for CI/CD. |
| **GitHub Actions** | Automates test execution and reporting. |
| **(Optional) Minikube & Helm** | Used for Kubernetes-based test execution (future migration). |

---

### **🔧 Installation & Running Tests Locally**
#### **1️⃣ Install Node & Playwright**
```bash
# Install dependencies
npm install
npx playwright install
```
#### **2️⃣ Run Tests Locally**
```bash
npx playwright test
```
#### **3️⃣ Run Tests in Docker**
```bash
# Build the Docker image
docker build -t benpavey-tests .

# Run tests inside Docker
docker run --rm benpavey-tests
```

---

## **🚀 Running Tests in Kubernetes (Future Reference)**
Although **GitHub Actions is currently used**, Kubernetes configurations are **kept for future migration**.

### **📌 Kubernetes & Helm**
| File | Purpose |
|------|---------|
| `chart.yaml` | Defines the Helm chart for Kubernetes deployment. |
| `values.yaml` | Stores configurable parameters (Docker image, test settings, resource limits). |
| `job.yaml` | Defines a Kubernetes **Job** to execute tests inside a cluster. |

### **📌 Running Tests in Minikube**
```bash
# Start Minikube
minikube start

# Load the latest test image
minikube image load benpavey-tests:latest

# Deploy tests using Helm
helm upgrade --install playwright-tests ./playwright-tests

# View test logs
kubectl logs job/playwright-tests
```
**🔹 Next Step for Future Migration**: Move to **Google Kubernetes Engine (GKE)** for fully automated test execution in the cloud.

---

## **🔄 CI/CD Workflow Summary**
1️⃣ **Code is pushed to `main`**  
2️⃣ **GitHub Actions triggers Playwright tests inside Docker**  
3️⃣ **Tests execute and generate a report**  
4️⃣ **Results are uploaded as an artifact**  
5️⃣ **Email notifications are sent** on success or failure  
6️⃣ **Tests automatically re-run every Tuesday at 10:30 AM UTC**  

---

## **🌟 Future Enhancements**
- **GCP Migration** – Move from GitHub Actions to **Google Kubernetes Engine (GKE)** for fully cloud-based testing.
- **Automated Reporting** – Improve test result notifications.
- **Parallel Test Execution** – Optimize test runtime.

---

## **💡 Contributing**
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (`feature/new-test`).
3. Commit changes with clear messages.
4. Open a pull request.

---

For support, contact [contact@benpavey.com].
