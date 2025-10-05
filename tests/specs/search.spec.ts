import { test, expect } from '../fixtures/fixtures';
import { HeaderComponent } from '../pages/headerComponent';

test.describe('Search Functionality', () => {
test('Global search returns expected content', async ({ page, searchTerms }) => {
  await page.goto('/');
  const header = new HeaderComponent(page);
  const { term, expectContains } = searchTerms[0];
  await header.search(term);
  await expect(page.locator('body')).toContainText(new RegExp(expectContains, 'i'));
});
});