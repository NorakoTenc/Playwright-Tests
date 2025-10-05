import { Page, Locator, Download } from '@playwright/test';

export class DownloadPage {
  readonly page: Page;
  readonly downloadLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.downloadLinks = page.locator('#content .wiki a[href$=".zip"], #content .wiki a[href$=".tar.gz"]');
  }
  async open() {
    await this.page.goto('/projects/redmine/wiki/Download');
  }
  async downloadFirst(): Promise<Download | null> {
    const count = await this.downloadLinks.count();
    if (count === 0) {
      return null;
    }
    const firstLink = this.downloadLinks.first();
    const [download] = await Promise.all([
      this.page.waitForEvent('download'), 
      firstLink.click()                  
    ]);
    return download;
  }
}