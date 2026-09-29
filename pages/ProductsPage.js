import { CartPage } from './CartPage';

export class ProductsPage{
    constructor(page){
        this.page=page;
        this.header=page.getByTestId('title');
        this.sortDropdown = page.getByTestId('product-sort-container');
        this.productNames = page.getByTestId('inventory-item-name');
        this.productPrices = page.getByTestId('inventory-item-price');
        this.cartIcon = page.getByTestId('shopping-cart-link');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
    }

    async goto(){
        await this.page.goto('/inventory.html');
    }

    async sort(value){
        await this.sortDropdown.selectOption(value);
    }

    async getProductNames() {
    await this.productNames.first().waitFor();
    return await this.productNames.allTextContents();
  }

  async getProductPrices() {
    await this.productPrices.first().waitFor();
    const texts = await this.productPrices.allTextContents();
    return texts.map(text => parseFloat(text.replace('$', '')));
  }

  async addProductToCart(productName) {
    await this.page.getByTestId(`add-to-cart-${this.toSlug(productName)}`).click();
  }

  async removeProductFromCart(productName) {
    await this.page.getByTestId(`remove-${this.toSlug(productName)}`).click();
  }

  async openCart() {
    await this.cartIcon.click();
    return new CartPage(this.page);
  }

  toSlug(productName) {
    return productName.toLowerCase().replaceAll(' ', '-');
  }
}