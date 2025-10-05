import { test, expect } from '../fixtures/fixtures';
import { RegisterPage } from '../pages/registerPage';

test('Register form validation', async ({ page, randomData }) => {
  const reg = new RegisterPage(page);
  await reg.open();
  await reg.submitEmpty();
  const msgs = await reg.getValidationTexts();
  expect(msgs.length).toBeGreaterThan(0);

  // invalid email
  await reg.register({ email: randomData.invalidEmail, password: randomData.shortPassword, confirm: randomData.shortPassword });
  const msgs2 = await reg.getValidationTexts();
  expect(msgs2.length).toBeGreaterThan(0);
});
