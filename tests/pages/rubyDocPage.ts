import { Page, expect } from '@playwright/test';

export class RubyDocPage {
  readonly page: Page;
  readonly expectedUrl = 'https://www.rubydoc.info/github/redmine/redmine/index';

  constructor(page: Page) {
    this.page = page;
  }
  async verifyUrlIsCorrect() {
    await expect(this.page).toHaveURL(this.expectedUrl);
  }
}