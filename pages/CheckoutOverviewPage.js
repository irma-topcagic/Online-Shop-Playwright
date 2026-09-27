import { ProductsPage } from './ProductsPage';
import { CheckoutCompletePage } from './CheckoutCompletePage';

export class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.header = page.getByTestId('title');
    this.cartItems = page.getByTestId('inventory-item');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.paymentInfo = page.getByTestId('payment-info-value');
    this.shippingInfo = page.getByTestId('shipping-info-value');
    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');
    this.cancelButton = page.getByTestId('cancel');
  }

  cartItem(productName) {
    return this.cartItems.filter({ hasText: productName });
  }

  async getItemPrices() {
    await this.itemPrices.first().waitFor();
    const texts = await this.itemPrices.allTextContents();
    return texts.map(text => this.parsePrice(text));
  }

  async getSubtotal() {
    return this.parsePrice(await this.subtotalLabel.textContent());
  }

  async getTax() {
    return this.parsePrice(await this.taxLabel.textContent());
  }

  async getTotal() {
    return this.parsePrice(await this.totalLabel.textContent());
  }

  async finish() {
    await this.finishButton.click();
    return new CheckoutCompletePage(this.page);
  }

  async cancel() {
    await this.cancelButton.click();
    return new ProductsPage(this.page);
  }

  parsePrice(text) {
    return parseFloat(text.split('$')[1]);
  }
}