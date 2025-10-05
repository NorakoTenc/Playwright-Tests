import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#q');
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await this.page.keyboard.press('Enter');
  }
}
