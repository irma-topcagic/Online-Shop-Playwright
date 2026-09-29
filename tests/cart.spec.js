import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Cart Page', () => {
  let productsPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.goto();
  });

  test.describe('with one product in the cart', () => {
    test.beforeEach(async () => {
      await productsPage.addProductToCart('Sauce Labs Backpack');
      cartPage = await productsPage.openCart();
    });

    test('should display the correct title', async () => {
      await expect(cartPage.header).toHaveText('Your Cart');
    });

    test('should display added product with quantity 1', async () => {
      const item = cartPage.cartItem('Sauce Labs Backpack');
      await expect(item).toBeVisible();
      await expect(item.getByTestId('item-quantity')).toHaveText('1');
    });

    test('should remove product from cart', async () => {
      await cartPage.removeProduct('Sauce Labs Backpack');
      await expect(cartPage.cartItems).toHaveCount(0);
    });

    test('should return to products page on continue shopping', async () => {
      const productsPageAfter = await cartPage.continueShopping();
      await expect(productsPageAfter.header).toHaveText('Products');
    });

    test('should open checkout page', async () => {
      const checkoutPage = await cartPage.openCheckout();
      await expect(checkoutPage.header).toHaveText('Checkout: Your Information');
    });
  });

  test.describe('with multiple products in the cart', () => {
    test.beforeEach(async () => {
      await productsPage.addProductToCart('Sauce Labs Backpack');
      await productsPage.addProductToCart('Sauce Labs Bike Light');
      await productsPage.addProductToCart('Sauce Labs Onesie');
      cartPage = await productsPage.openCart();
    });

    test('should display all added products', async () => {
      await expect(cartPage.cartItems).toHaveCount(3);
      await expect(cartPage.itemNames).toHaveText([
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Onesie',
      ]);
    });

    test('should remove only selected product', async () => {
      await cartPage.removeProduct('Sauce Labs Bike Light');
      await expect(cartPage.cartItems).toHaveCount(2);
      await expect(cartPage.cartItem('Sauce Labs Bike Light')).toHaveCount(0);
      await expect(cartPage.cartItem('Sauce Labs Backpack')).toBeVisible();
    });
  });
});