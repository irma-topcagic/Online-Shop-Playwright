import { CartPage } from './CartPage';
import { CheckoutOverviewPage } from './CheckoutOverviewPage';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.header = page.getByTestId('title');
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.cancelButton = page.getByTestId('cancel');
    this.errorMessage = page.getByTestId('error');
  }

  async goto() {
    await this.page.goto('/checkout-step-one.html');
  }

  async enterFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async enterPostalCode(postalCode) {
    await this.postalCodeInput.fill(postalCode);
  }

  async fillInformation(firstName, lastName, postalCode) {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterPostalCode(postalCode);
  }

  async clickContinueButton() {
    await this.continueButton.click();
    return new CheckoutOverviewPage(this.page);
  }

  async clickCancelButton() {
    await this.cancelButton.click();
    return new CartPage(this.page);
  }
}