import { test, expect } from '../fixtures/fixtures';
import { LoginPage } from '../pages/loginPage';
import { RegisterPage } from '../pages/registerPage';

test.describe('Auth Validation', () => {
test('Login validation shows errors for empty and invalid inputs', async ({ page, randomData }) => {
  const login = new LoginPage(page);
  await login.open();
  await login.submitEmpty();
  await expect(login.errorMessages.first()).toBeVisible();

  await login.username.fill(randomData.invalidEmail);
  await login.password.fill(randomData.shortPassword);
  await login.submit.click();

  const txt = await login.getErrorText();
  expect(txt.length).toBeGreaterThan(0);
});
test('Register form validation', async ({ page, randomData }) => {
  const reg = new RegisterPage(page);
  await reg.open();
  await reg.submitEmpty();
  const msgs = await reg.getValidationTexts();
  expect(msgs.length).toBeGreaterThan(0);
  await reg.register({ email: randomData.invalidEmail, password: randomData.shortPassword, confirm: randomData.shortPassword });
  const msgs2 = await reg.getValidationTexts();
  expect(msgs2.length).toBeGreaterThan(0);
});
});