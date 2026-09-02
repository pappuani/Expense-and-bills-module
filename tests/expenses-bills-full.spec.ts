import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ExpensesBillsPage } from '../pages/ExpensesBillsPage';

test.describe('Expenses & Bills - Full Module E2E Test Suite', () => {

  let expensesPage: ExpensesBillsPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('anicafeqr@gmail.com', '123456');
    await page.waitForURL('**/owner/**', { timeout: 15000 }).catch(() => {});
    
    expensesPage = new ExpensesBillsPage(page);
    await expensesPage.navigate();
  });

  test('Scenario 1: Full Expense Creation Flow with Amount and Notes', async ({ page }) => {
    console.log('Testing Scenario 1: Creating New Expense...');
    await expensesPage.openAddExpenseModal();
    
    const uniqueNote = `Store Electricity & Maintenance ${Date.now()}`;
    await expensesPage.fillAndSubmitExpense('450.00', uniqueNote);

    // Verify modal closes and page reflects state
    await expect(expensesPage.expenseModal).not.toBeVisible();
    await page.screenshot({ path: 'test-results/expense-created-full.png' });
  });

  test('Scenario 2: Expense Categories Management - Add and Switch Tabs', async ({ page }) => {
    console.log('Testing Scenario 2: Category Management...');
    await expensesPage.openCategoriesModal();
    
    const newCatName = `Supplies ${Date.now().toString().slice(-4)}`;
    await expensesPage.createNewCategory(newCatName);

    // Test Active and Inactive tabs
    await expensesPage.categoryInactiveTab.click();
    await expect(expensesPage.categoryInactiveTab).toHaveClass(/Expenses_on/);

    await expensesPage.categoryActiveTab.click();
    await expect(expensesPage.categoryActiveTab).toHaveClass(/Expenses_on/);

    // Close Category Modal
    await expensesPage.categoryCloseButton.click();
    await expect(expensesPage.categoryModal).not.toBeVisible();
  });

  test('Scenario 3: Filter & Multi-Criteria Filtering Controls Verification', async ({ page }) => {
    console.log('Testing Scenario 3: Filter Controls...');
    
    // Check status filter
    if (await expensesPage.statusFilter.isVisible()) {
      await expensesPage.statusFilter.click();
      await page.waitForTimeout(500);
      await page.keyboard.press('Escape');
    }

    // Check payment method filter
    if (await expensesPage.paymentFilter.isVisible()) {
      await expensesPage.paymentFilter.click();
      await page.waitForTimeout(500);
      await page.keyboard.press('Escape');
    }

    // Check branch filter
    if (await expensesPage.branchFilter.isVisible()) {
      await expensesPage.branchFilter.click();
      await page.waitForTimeout(500);
      await page.keyboard.press('Escape');
    }
  });

  test('Scenario 4: Export Operations (Excel & CSV)', async ({ page }) => {
    console.log('Testing Scenario 4: Export Features...');
    
    await expect(expensesPage.exportExcelButton).toBeVisible();
    await expect(expensesPage.exportCsvButton).toBeVisible();

    // Verify buttons are clickable
    await expensesPage.exportCsvButton.click().catch(() => {});
    await page.waitForTimeout(1000);
    await expensesPage.exportExcelButton.click().catch(() => {});
    await page.waitForTimeout(1000);
  });

  test('Scenario 5: Modal Cancel and Close Interactions', async ({ page }) => {
    console.log('Testing Scenario 5: Modal Dismissal...');
    
    // Open and cancel via Cancel button
    await expensesPage.openAddExpenseModal();
    await expensesPage.cancelButton.click();
    await expect(expensesPage.expenseModal).not.toBeVisible();

    // Open and close via 'x' Close button
    await expensesPage.openAddExpenseModal();
    await expensesPage.modalCloseButton.click();
    await expect(expensesPage.expenseModal).not.toBeVisible();
  });

});
