import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const invalidLogins = [
  { title: 'empty username', username: '', password: 'secret_sauce', error: 'Epic sadface: Username is required' },
  { title: 'empty password', username: 'standard_user', password: '', error: 'Epic sadface: Password is required' },
  { title: 'wrong credentials', username: 'standard_user', password: 'wrong_password', error: 'Epic sadface: Username and password do not match any user in this service' },
];

test.describe('Login Tests',() =>{
    let loginPage;
    test.beforeEach(async({page})=>{
        loginPage = new LoginPage(page);
        await loginPage.goto();

    });

    test('successful Login',async({page})=>{
        await loginPage.login('standard_user','secret_sauce');
        await expect(page).toHaveURL(/inventory\.html/);
    });

    for (const data of invalidLogins) {
  test(`login with ${data.title}`, async () => {
    await loginPage.login(data.username, data.password);
    await expect(loginPage.errorMessage).toHaveText(data.error);
  });
}

    test('login with locked out user', async ({ page }) => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        await expect.soft(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
        await expect.soft(page).not.toHaveURL(/inventory/);
});
});