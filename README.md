# ?? Expense & Bills Module - Playwright Automation Suite

End-to-end (E2E) test automation suite for the **Expenses & Bills** module in the Cafe QR Management System, built with TypeScript, Playwright, and the Page Object Model (POM) pattern.

---

## ?? Application Details & History

- **Base URL:** `https://cafe-test-qr-frontend.vercel.app`
- **Login URL:** `https://cafe-test-qr-frontend.vercel.app/login`
- **Expenses & Bills URL:** `https://cafe-test-qr-frontend.vercel.app/owner/expenses`

### ?? Test Credentials
- **Email:** `anicafeqr@gmail.com`
- **Password:** `123456`
- **Role:** `Owner`

---

## ?? Scenarios Covered

1. **Scenario 1: Expense Creation Flow**
   - Launches "Record New Expense" modal.
   - Fills Amount, Notes, selects Category, and submits payment details.
2. **Scenario 2: Expense Category Management**
   - Opens "Expense Categories" modal.
   - Dynamically adds new categories and toggles between **Active** and **Inactive** tabs.
3. **Scenario 3: Multi-Criteria Filter Validation**
   - Validates dropdown filtering across **Status**, **Categories**, **Payment Modes**, and **Branches**.
4. **Scenario 4: Export Operations**
   - Triggers and validates data export for both **Excel** (`.xlsx`) and **CSV** formats.
5. **Scenario 5: Modal Dismissal & UI Integrity**
   - Verifies cancellation via secondary `Cancel` buttons and top-right `?` close triggers without state corruption.

---

## ?? Project Structure

```
+-- pages/
¦   +-- LoginPage.ts            # POM for authentication
¦   +-- ExpensesBillsPage.ts    # POM for all Expenses & Bills workflows
+-- tests/
¦   +-- expenses-bills-full.spec.ts  # Full 5-scenario E2E test suite
¦   +-- expenses-bills.spec.ts       # Core integration tests
+-- playwright.config.ts        # Playwright runner configuration
+-- tsconfig.json               # TypeScript configuration
+-- package.json                # Project dependencies and scripts
+-- README.md                   # Project documentation
```

---

## ?? Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- npm / npx

### 2. Installation
```bash
npm install
```

### 3. Run Tests
- **Headless Mode (All Tests):**
  ```bash
  npx playwright test
  ```
- **Headed Mode (Visual Execution):**
  ```bash
  npx playwright test --headed
  ```
- **Interactive UI Mode:**
  ```bash
  npx playwright test --ui
  ```

### 4. View Test Reports
```bash
npx playwright show-report
```
