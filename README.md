# Playwright-Tests

## Repository Summary

This repository hosts an End-to-End (E2E) testing framework built using Playwright with a strong emphasis on architectural best practices.

**Key Architectural Highlights:**
* **Page Object Model (POM)**: All tests strictly adhere to the POM pattern, separating test logic from element locators and actions for superior maintainability.
* **Best Practices**: Includes examples of handling complex web interactions like external navigation (in the same tab) and managing file downloads through network mocking.
* **CI/CD Automation**: Features a robust GitHub Actions pipeline for continuous integration.
---

## Requirements

Before you can install and run the tests, ensure you have the following installed:

* **Node.js** (version 18 or higher is recommended)
* **npm** (Node Package Manager)

---

## Steps to Install

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/NorakoTenc/Playwright-Tests.git 
    cd Playwright-Tests
    ```

2.  **Install dependencies:**
    This command installs Playwright, the test runner, and the Allure reporter.
    ```bash
    npm ci
    ```

3.  **Install Playwright browsers:**
    ```bash
    npm playwright install
    ```

---

## Steps to Launch

Tests can be launched either locally using the command line or automatically via GitHub Actions (see the `main.yml` file).

### Local Launch

To run all tests in the project:

```bash
# Set the base URL environment variable
export BASE_URL=https://www.redmine.org/

# Run the tests
npm playwright test
```
To watch the tests run in a visible browser window, use the `--headed` flag:
```
npm playwright test --headed
```
---
## Steps to Creating the Report
After the test execution is complete, you can view a detailed HTML report.

1. The report is generated automatically after each run and stored in the `playwright-report` folder.

2. To view the last test run report, execute the following command:
```
npx playwright show-report
```
This will open the report in your default web browser, where you can inspect each test, its steps, and results.