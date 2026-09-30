## Online Shop – Playwright Tests

[![Playwright Tests](https://github.com/irma-topcagic/Online-Shop-Playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/irma-topcagic/Online-Shop-Playwright/actions/workflows/playwright.yml)

End-to-end tests for the [SauceDemo](https://www.saucedemo.com) online shop, written with Playwright and JavaScript.

### What is tested

- **Login** – successful login and error messages for empty fields, wrong password and a locked out user
- **Products** – page title, adding and removing products from the cart, cart badge, sorting by name and price
- **Cart** – products shown in the cart, quantity, removing one or more products, continue shopping and checkout
- **Checkout information** – valid data and error messages for each empty field
- **Checkout overview** – products, payment and shipping info, and whether item total, tax and total add up correctly
- **Checkout complete** – order confirmation, empty cart after the order and downloading the order as PDF

### How the project is organized

- **Page Object Model** – every page has its own class, and methods that open another page return that page's object
- **Login once** – `auth.setup.js` logs in and saves the session with `storageState`, so other tests start logged in
- **Data-driven tests** – negative login and checkout cases are generated from an array of test data
- **Web-first assertions** – Playwright waits and retries, so there are no manual waits
- **Smoke tests** – key tests are tagged `@smoke` for a quick check, and all tests together are the regression suite

### Project structure

    pages/              page objects
    tests/              test files and auth setup
    playwright.config.js

### How to run

    npm install
    npx playwright install
    npx playwright test

Useful commands:

    npx playwright test --grep "@smoke"   # run smoke tests only
    npx playwright test --ui              # run tests in UI mode
    npx playwright test login             # run only login tests
    npx playwright show-report            # open the HTML report

### CI

Tests run automatically on every push with GitHub Actions. The HTML report is saved as an artifact of each run.

## Tools

Playwright, JavaScript, Node.js, GitHub Actions
