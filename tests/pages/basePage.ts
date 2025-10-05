import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(path = '/') {
    await this.page.goto(path);
  }
  async openLogin() { await this.open('/login'); }
  async openRegister() { await this.open('/account/register'); }
}