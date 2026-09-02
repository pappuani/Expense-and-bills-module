import { Page, Locator, expect } from '@playwright/test';

export class ExpensesBillsPage {
  readonly page: Page;

  // Header & Main Action Buttons
  readonly addExpenseButton: Locator;
  readonly manageCategoriesButton: Locator;
  readonly exportExcelButton: Locator;
  readonly exportCsvButton: Locator;

  // Filter Dropdowns
  readonly statusFilter: Locator;
  readonly categoryFilter: Locator;
  readonly paymentFilter: Locator;
  readonly branchFilter: Locator;

  // Add Expense Modal Elements
  readonly expenseModal: Locator;
  readonly expenseAmountInput: Locator;
  readonly expenseNotesInput: Locator;
  readonly selectCategoryTrigger: Locator;
  readonly paymentModeTrigger: Locator;
  readonly completeButton: Locator;
  readonly cancelButton: Locator;
  readonly modalCloseButton: Locator;

  // Category Modal Elements
  readonly categoryModal: Locator;
  readonly categoryNameInput: Locator;
  readonly categoryAddButton: Locator;
  readonly categoryActiveTab: Locator;
  readonly categoryInactiveTab: Locator;
  readonly categoryCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header actions
    this.addExpenseButton = page.locator('#btn-add-expense');
    this.manageCategoriesButton = page.locator('#btn-manage-categories');
    this.exportExcelButton = page.locator('#btn-export-excel');
    this.exportCsvButton = page.locator('#btn-export-csv');

    // Filter dropdowns
    this.statusFilter = page.locator('button.nice-select-trigger:has-text("Completed")');
    this.categoryFilter = page.locator('button.nice-select-trigger:has-text("All Categories")');
    this.paymentFilter = page.locator('button.nice-select-trigger:has-text("All Payments")');
    this.branchFilter = page.locator('button.nice-select-trigger:has-text("All Branches")');

    // Expense Modal
    this.expenseModal = page.locator('.cafeqr-popup-container, .modal');
    this.expenseAmountInput = page.locator('#expense-amount');
    this.expenseNotesInput = page.locator('#expense-notes');
    this.selectCategoryTrigger = page.locator('.Expenses_mdl-field__t1EHK .nice-select-trigger:has-text("Select category…")');
    this.paymentModeTrigger = page.locator('.Expenses_mdl-field__t1EHK .nice-select-trigger:has-text("Cash")');
    this.completeButton = page.locator('button.popup-btn-primary:has-text("Complete")');
    this.cancelButton = page.locator('button.popup-btn-secondary:has-text("Cancel")');
    this.modalCloseButton = page.locator('.close-btn');

    // Category Modal
    this.categoryModal = page.locator('.cafeqr-popup-container, .modal');
    this.categoryNameInput = page.locator('#cat-name-input');
    this.categoryAddButton = page.locator('#cat-add-btn');
    this.categoryActiveTab = page.locator('#cat-tab-active');
    this.categoryInactiveTab = page.locator('#cat-tab-inactive');
    this.categoryCloseButton = page.locator('button.popup-btn-secondary:has-text("Close")');
  }

  async navigate() {
    await this.page.goto('/owner/expenses');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1500);
  }

  async openAddExpenseModal() {
    await this.addExpenseButton.click();
    await expect(this.expenseAmountInput).toBeVisible({ timeout: 5000 });
  }

  async openCategoriesModal() {
    await this.manageCategoriesButton.click();
    await expect(this.categoryNameInput).toBeVisible({ timeout: 5000 });
  }

  async createNewCategory(name: string) {
    await this.categoryNameInput.fill(name);
    await this.categoryAddButton.click();
    await this.page.waitForTimeout(1000);
  }

  async fillAndSubmitExpense(amount: string, note: string) {
    // 1. Fill Amount and Notes
    await this.expenseAmountInput.fill(amount);
    await this.expenseNotesInput.fill(note);

    // 2. Select Category if dropdown is present
    if (await this.selectCategoryTrigger.isVisible()) {
      await this.selectCategoryTrigger.click();
      await this.page.waitForTimeout(500);
      const option = this.page.locator('div, li, button').filter({ hasText: /Utilities|General|Maintenance|Supplies/i }).first();
      if (await option.isVisible()) {
        await option.click();
      } else {
        // click trigger again or escape to close dropdown if no options found
        await this.page.keyboard.press('Escape');
      }
    }

    // 3. Submit
    await this.completeButton.click();
    await this.page.waitForTimeout(1500);
  }
}
