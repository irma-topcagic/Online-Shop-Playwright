import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Checkout Complete Page', () => {
  let completePage;

  test.beforeEach(async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    const cartPage = await productsPage.openCart();
    const checkoutPage = await cartPage.openCheckout();
    await checkoutPage.fillInformation('Irma', 'Topcagic', '71000');
    const overviewPage = await checkoutPage.clickContinueButton();
    completePage = await overviewPage.finish();
  });

  test('should display order confirmation', { tag: '@smoke' }, async () => {
    await expect(completePage.header).toHaveText('Checkout: Complete!');
    await expect(completePage.completeHeader).toHaveText('Thank you for your order!');
    await expect(completePage.completeText).toBeVisible();
  });

  test('should empty the cart after order', async () => {
    const productsPage = await completePage.backHome();
    await expect(productsPage.header).toHaveText('Products');
    await expect(productsPage.cartBadge).toHaveCount(0);
  });

  test('should download order as PDF', async () => {
    const download = await completePage.generatePdf();
    expect(download.suggestedFilename()).toMatch(/\.pdf$/);
  });
});