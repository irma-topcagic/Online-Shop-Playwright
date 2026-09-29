import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

const invalidCheckoutData = [
  { title: 'empty first name', firstName: '', lastName: 'Topcagic', postalCode: '71000', error: 'Error: First Name is required' },
  { title: 'empty last name', firstName: 'Irma', lastName: '', postalCode: '71000', error: 'Error: Last Name is required' },
  { title: 'empty postal code', firstName: 'Irma', lastName: 'Topcagic', postalCode: '', error: 'Error: Postal Code is required' },
];

test.describe('Checkout Information Page', () => {
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.addProductToCart('Sauce Labs Backpack');
    const cartPage = await productsPage.openCart();
    checkoutPage = await cartPage.openCheckout();
  });

  test('should display the correct title', async () => {
    await expect(checkoutPage.header).toHaveText('Checkout: Your Information');
  });

  test('should continue to overview with valid data', async () => {
    await checkoutPage.fillInformation('Irma', 'Topcagic', '71000');
    const overviewPage = await checkoutPage.clickContinueButton();
    await expect(overviewPage.header).toHaveText('Checkout: Overview');
  });

  for (const data of invalidCheckoutData) {
    test(`should show error with ${data.title}`, async ({ page }) => {
      await checkoutPage.fillInformation(data.firstName, data.lastName, data.postalCode);
      await checkoutPage.clickContinueButton();

      await expect(checkoutPage.errorMessage).toHaveText(data.error);
      await expect(page).toHaveURL(/checkout-step-one/);
    });
  }

  test('should return to cart on cancel', async () => {
    const cartPage = await checkoutPage.clickCancelButton();
    await expect(cartPage.header).toHaveText('Your Cart');
  });
});