# Playwright-Tests

## Repository Summary

This repository contains a simple End-to-End (E2E) testing framework built with **Playwright** and structured using the **Page Object Model (POM)** design pattern. The project's primary goal is to demonstrate a robust, maintainable, and scalable test architecture, with a specific focus on verifying link navigation.

The core test case validates external navigation:
* **Action:** Navigating from the Redmine Guide page (`https://www.redmine.org/guide`) and clicking the "Classes and methods of Redmine source code" link.
* **Assertion:** Verifying that the application successfully navigates to the external RubyDoc page (`https://www.rubydoc.info/github/redmine/redmine/index`) in the same tab.

The project is fully integrated with **GitHub Actions** for Continuous Integration (CI) and generates comprehensive, persistent **Allure Reports** which are automatically published to GitHub Pages.

---

## Requirements

Before you can install and run the tests, ensure you have the following installed:

* **Node.js** (version 18 or higher is recommended)
* **npm** (Node Package Manager)

---

## Steps to Install

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/NorakoTenc/Playwright-Tests.git](https://github.com/NorakoTenc/Playwright-Tests.git)
    cd Playwright-Tests
    ```

2.  **Install dependencies:**
    This command installs Playwright, the test runner, and the Allure reporter.
    ```bash
    npm ci
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```

---

## Steps to Launch

Tests can be launched either locally using the command line or automatically via GitHub Actions (see the `main.yml` file).

### Local Launch

To run all tests in the project (defaulting to Chromium, Firefox, and WebKit as defined in `playwright.config.ts`):

```bash
# Set the base URL environment variable (as defined in the config)
export BASE_URL=[https://www.redmine.org/](https://www.redmine.org/)

# Run the tests
npx playwright test