import { ProductsPage } from './ProductsPage';

export class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.header = page.getByTestId('title');
    this.completeHeader = page.getByTestId('complete-header');
    this.completeText = page.getByTestId('complete-text');
    this.backHomeButton = page.getByTestId('back-to-products');
    this.generatePdfButton = page.getByTestId('generate-pdf-order');
  }

  async backHome() {
    await this.backHomeButton.click();
    return new ProductsPage(this.page);
  }

  async generatePdf() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.generatePdfButton.click();
    return await downloadPromise;
  }
}