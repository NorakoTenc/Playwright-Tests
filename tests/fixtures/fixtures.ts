import { test as base, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

type Fixtures = {
  randomData: {
    invalidEmail: string;
    shortPassword: string;
    longText: string;
    noteText: string;
  };
  downloadMock: {
    filename: string;
    content: string;
  };
  searchTerms: { term: string; expectContains: string }[];
  issueMode: 'public' | 'mock';
};

export const test = base.extend<Fixtures>({
  randomData: async ({}, use) => {
    const data = {
      invalidEmail: 'invalid-email-format',
      shortPassword: 'x1',
      longText: faker.lorem.paragraphs(2),
      noteText: `E2E note ${faker.lorem.sentence()}`,
    };
    await use(data);
  },

  downloadMock: async ({ page }, use) => {
    const mockData = {
      filename: `fake-download-${Date.now()}.zip`,
      content: 'This is the content of the mocked file.',
    };
    await page.route(/\.(zip|tar\.gz)$/, async (route) => {
      await route.fulfill({
        status: 200,
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename=${mockData.filename}`,
        },
        body: mockData.content,
      });
    });
    await use(mockData);
  },
  searchTerms: async ({}, use) => {
    const terms = [
      { term: 'redmine', expectContains: 'Redmine' },
      { term: 'plugins', expectContains: 'Plugins' },
      { term: 'installation', expectContains: 'Installation' },
    ];
    await use(terms);
  },
  issueMode: async ({}, use) => {
    const mode = (process.env.TEST_ISSUE_FIXTURE as 'mock' | 'public') || 'public';
    await use(mode);
  },
});
export { expect } from '@playwright/test';