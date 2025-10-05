import { test, expect } from '../fixtures/fixtures';
import { DownloadPage } from '../pages/downloadPage';

test.describe('Download Page', () => {
test('Download page provides a downloadable file (mocked)', async ({ page, downloadMock }) => {
  const dl = new DownloadPage(page);
  await dl.open();
  const download = await dl.downloadFirst(); 
  expect(download).not.toBeNull();
  const fname = await download!.suggestedFilename();
  expect(fname).toContain(downloadMock.filename.split('.zip')[0]);
});
});
