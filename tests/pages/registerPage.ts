import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly validationMessages: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginInput = page.locator('input#user_login, input[name="user[login]"], input[name="login"]');
    this.passwordInput = page.locator('input#user_password, input[name="user[password]"]');
    this.confirmPasswordInput = page.locator('input#user_password_confirmation, input[name*="confirm"]');
    this.emailInput = page.locator('input#user_mail, input[name="user[mail]"], input[type="email"]');
    this.submitButton = page.locator('input[type="submit"], button[type="submit"]');
    this.validationMessages = page.locator('.error, .validation-error, label.error, .flash.error');
  }

  async open() {
    await this.page.goto('/account/register');
  }

  async submitEmpty() {
    await this.submitButton.click();
  }

  async register(data: { login?: string; email?: string; password?: string; confirm?: string }) {
    if (data.login !== undefined) await this.loginInput.fill(data.login);
    if (data.email !== undefined) await this.emailInput.fill(data.email);
    if (data.password !== undefined) await this.passwordInput.fill(data.password);
    if (data.confirm !== undefined) await this.confirmPasswordInput.fill(data.confirm);
    await this.submitButton.click();
  }

  async getValidationTexts() {
    return await this.validationMessages.allTextContents();
  }
}
