// tests/navigation.spec.ts
import { test, expect, Page } from '@playwright/test';
import { RedmineGuidePage } from '../pages/guidePage'; 
import { RubyDocPage } from '../pages/rubyDocPage'; 

test.describe('External Link Navigation', () => {

  test('should navigate to RubyDoc page in the same tab', async ({ page }) => {
    
    const redmineGuidePage = new RedmineGuidePage(page);
    let rubyDocPage: RubyDocPage;
    let newPage: Page; 
    await redmineGuidePage.gotoGuidePage();
    await expect(page).toHaveURL(new RegExp(redmineGuidePage.guidePath)); 
    newPage = await redmineGuidePage.clickClassesAndMethodsLinkToOpenNewPage();
    rubyDocPage = new RubyDocPage(newPage);
    await rubyDocPage.verifyUrlIsCorrect();
    await expect(newPage).toHaveTitle("RubyDoc.info: Documentation for redmine/redmine (master) – RubyDoc.info");
    await expect(page).not.toHaveURL(new RegExp(redmineGuidePage.guidePath));
  });
});