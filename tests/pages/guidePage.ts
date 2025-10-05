// pages/RedmineGuidePage.ts
import { Page, Locator } from '@playwright/test';

export class RedmineGuidePage {
  readonly page: Page;
  readonly classesAndMethodsLink: Locator;
  
  readonly guidePath = '/guide'; 
  readonly expectedRubyDocUrl = 'https://www.rubydoc.info/github/redmine/redmine/index';

  constructor(page: Page) {
    this.page = page;
    this.classesAndMethodsLink = page.getByRole('link', { name: 'Classes and methods of Redmine source code' });
  }

  async gotoGuidePage() {
    await this.page.goto(this.guidePath); 
  }

  async clickClassesAndMethodsLinkToOpenNewPage() {
    await this.classesAndMethodsLink.click();
    return this.page; 
  }
}