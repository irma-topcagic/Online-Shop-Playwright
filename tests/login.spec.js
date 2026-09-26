import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

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

    test('login with empty username', async () => {
        await loginPage.login('', 'secret_sauce');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
    });

    test('login with empty password',async()=>{
        await loginPage.login('standard_user','');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
    });

    test('login with wrong password',async()=>{
        await loginPage.login('standard_user','wrong_password');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    test('login with locked out user', async ({ page }) => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        await expect.soft(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
        await expect.soft(page).not.toHaveURL(/inventory/);
});
});