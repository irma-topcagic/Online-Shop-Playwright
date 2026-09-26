import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Products Page',()=>{
    let productsPage;
    test.beforeEach(async ({ page }) => {
        productsPage = new ProductsPage(page);
        await productsPage.goto();
    });

    test('should display the correct title', async () => {
        await expect(productsPage.header).toHaveText('Products');
    });

    test('add single product to cart', async()=>{
        await productsPage.addProductToCart('Sauce Labs Backpack');
        await expect(productsPage.cartBadge).toHaveText('1');
    });

    test('add products to cart', async()=>{
        await productsPage.addProductToCart('Sauce Labs Backpack');
        await productsPage.addProductToCart('Sauce Labs Bike Light');
        await productsPage.addProductToCart('Sauce Labs Onesie');
        await expect(productsPage.cartBadge).toHaveText('3');
    });

    test('should not display cart badge when empty',async()=>{
        await expect(productsPage.cartBadge).toHaveCount(0);
    });

    test('remove product from cart',async()=>{
        await productsPage.addProductToCart('Sauce Labs Backpack');
        await expect(productsPage.cartBadge).toHaveText('1');
        await productsPage.removeProductFromCart('Sauce Labs Backpack');
        await expect(productsPage.cartBadge).toHaveCount(0);
    });

    test('should sort products by name A to Z', async () => {
  await productsPage.sort('za');
  await productsPage.sort('az');

  const actualNames = await productsPage.getProductNames();
  const expectedNames = [...actualNames].sort();

  expect(actualNames).toEqual(expectedNames);
});

test('should sort products by name Z to A', async () => {
  await productsPage.sort('za');

  const actualNames = await productsPage.getProductNames();
  const expectedNames = [...actualNames].sort().reverse();

  expect(actualNames).toEqual(expectedNames);
});

test('should sort products by price low to high', async () => {
  await productsPage.sort('lohi');

  const actualPrices = await productsPage.getProductPrices();
  const expectedPrices = [...actualPrices].sort((a, b) => a - b);

  expect(actualPrices).toEqual(expectedPrices);
});

test('should sort products by price high to low', async () => {
  await productsPage.sort('hilo');

  const actualPrices = await productsPage.getProductPrices();
  const expectedPrices = [...actualPrices].sort((a, b) => b - a);

  expect(actualPrices).toEqual(expectedPrices);
});


})