import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Checkout Overview Page', () => {
  let overviewPage;

  test.beforeEach(async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');

    const cartPage = await productsPage.openCart();
    const checkoutPage = await cartPage.openCheckout();
    await checkoutPage.fillInformation('Irma', 'Topcagic', '71000');
    overviewPage = await checkoutPage.clickContinueButton();
  });

  test('should display the correct title', async () => {
    await expect(overviewPage.header).toHaveText('Checkout: Overview');
  });

  test('should display products added to cart', async () => {
    await expect(overviewPage.cartItems).toHaveCount(2);
    await expect(overviewPage.cartItem('Sauce Labs Backpack')).toBeVisible();
    await expect(overviewPage.cartItem('Sauce Labs Bike Light')).toBeVisible();
  });

  test('should display payment and shipping information', async () => {
    await expect(overviewPage.paymentInfo).toHaveText('SauceCard #31337');
    await expect(overviewPage.shippingInfo).toHaveText('Free Pony Express Delivery!');
  });

  test('item total should equal sum of product prices', async () => {
    const prices = await overviewPage.getItemPrices();
    const sum = prices.reduce((total, price) => total + price, 0);
    const subtotal = await overviewPage.getSubtotal();

    expect(subtotal).toBeCloseTo(sum, 2);
  });

  test('total should equal item total plus tax', async () => {
    const subtotal = await overviewPage.getSubtotal();
    const tax = await overviewPage.getTax();
    const total = await overviewPage.getTotal();

    expect(total).toBeCloseTo(subtotal + tax, 2);
  });

  test('should return to products page on cancel', async () => {
    const productsPage = await overviewPage.cancel();
    await expect(productsPage.header).toHaveText('Products');
  });

  test('should complete the order on finish', async () => {
    const completePage = await overviewPage.finish();
    await expect(completePage.header).toHaveText('Checkout: Complete!');
    await expect(completePage.completeHeader).toHaveText('Thank you for your order!');
  });
});