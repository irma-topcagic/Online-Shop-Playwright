import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/CartPage';

test.describe('Cart Page',()=>{
    let cartPage;

    test.beforeEach(async({page})=>{
        cartPage = new CartPage(page);
        await cartPage.goto();
    });

    


});