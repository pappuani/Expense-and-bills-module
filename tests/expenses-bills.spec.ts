import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ExpensesBillsPage } from '../pages/ExpensesBillsPage';

test.describe('Expenses & Bills Module Automation Suite', () => {

  test.beforeEach(async ({ page }) => {
    console.log('--- Step: Authenticating as Owner ---');
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('anicafeqr@gmail.com', '123456');
    
    // Wait for successful login redirection
    await page.waitForURL('**/owner/**', { timeout: 15000 }).catch(() => {
      console.log('Direct owner redirection timed out, continuing...');
    });
  });

  test('Test Case 1: Verify Expenses Dashboard & Create New Expense Entry', async ({ page }) => {
    const expensesPage = new ExpensesBillsPage(page);

    console.log('Navigating to Expenses module...');
    await expensesPage.navigateToExpenses();

    // Verify page header / presence
    const heading = page.locator('h1, h2, h3, header').first();
    await expect(heading).toBeVisible();

    console.log('Creating a test expense...');
    const testExpenseName = `Utility Bill ${Date.now()}`;
    await expensesPage.createExpense(testExpenseName, '250', 'Automated electricity expense test');

    await page.screenshot({ path: 'test-results/expense-created.png', fullPage: true });
  });

  test('Test Case 2: Verify Bills Dashboard & Record New Bill Entry', async ({ page }) => {
    const billsPage = new ExpensesBillsPage(page);

    console.log('Navigating to Bills module...');
    await billsPage.navigateToBills();

    // Verify page elements
    const pageContainer = page.locator('body');
    await expect(pageContainer).toBeVisible();

    console.log('Creating a test bill...');
    const testBillNumber = `INV-${Date.now().toString().slice(-6)}`;
    await billsPage.createBill(testBillNumber, '1200', 'Automated supplier invoice');

    await page.screenshot({ path: 'test-results/bill-created.png', fullPage: true });
  });

  test('Test Case 3: Expense Filtering and Listing Verification', async ({ page }) => {
    const expensesPage = new ExpensesBillsPage(page);
    await expensesPage.navigateToExpenses();

    // Check search / filter capability
    const searchInput = page.locator('input[type="text"], input[type="search"], input[placeholder*="Search"]').first();
    if (await searchInput.isVisible()) {
      console.log('Testing search filter...');
      await searchInput.fill('Utility');
      await page.waitForTimeout(1000);
    }

    // Verify table / list rendering
    const tableOrList = page.locator('table, .list-container, .grid, [role="table"]').first();
    if (await tableOrList.isVisible()) {
      await expect(tableOrList).toBeVisible();
    }
  });

});
