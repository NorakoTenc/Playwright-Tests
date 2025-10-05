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
    // 1. Define the mock data that the test will use
    const mockData = {
      filename: `fake-download-${Date.now()}.zip`,
      content: 'This is the content of the mocked file.',
    };

    // 2. Set up the network interception
    // This regex matches any URL ending in .zip or .tar.gz
    await page.route(/\.(zip|tar\.gz)$/, async (route) => {
      console.log(`✅ Intercepted download request for: ${route.request().url()}`);
      
      // 3. Fulfill the request with a mocked response
      await route.fulfill({
        status: 200,
        headers: {
          // Tells the browser this is a file to be downloaded
          'Content-Type': 'application/octet-stream',
          // Crucially, sets the filename for the download
          'Content-Disposition': `attachment; filename=${mockData.filename}`,
        },
        // The body/content of your fake file
        body: mockData.content,
      });
    });

    // 4. Pass the mockData to the test function
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