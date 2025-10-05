import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly errorMessages: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('#username, input[name="username"]');
    this.password = page.locator('#password, input[name="password"]');
    this.submit = page.locator('input[name="login"], button[type="submit"]');
    this.errorMessages = page.locator('.error, .flash.error, .validation-error');
  }

  async open() {
    await this.page.goto('/login');
  }

  async submitEmpty() {
    await this.submit.click();
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }

  async getErrorText() {
    return await this.errorMessages.first().innerText().catch(() => '');
  }
}
