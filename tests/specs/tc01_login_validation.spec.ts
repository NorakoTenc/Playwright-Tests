import { test, expect } from '../fixtures/fixtures';
import { LoginPage } from '../pages/loginPage';
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