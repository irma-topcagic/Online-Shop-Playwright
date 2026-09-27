import { ProductsPage } from './ProductsPage';

export class CartPage{
    constructor(page){
        this.page=page;
        this.header=page.getByTestId('title');
         this.cartItems = page.getByTestId('inventory-item');
         this.itemNames = page.getByTestId('inventory-item-name');
         this.continueShoppingButton = page.getByTestId('continue-shopping');
         this.checkoutButton = page.getByTestId('checkout');
    }

    async goto(){
        await this.page.goto('/cart.html');
    }

     cartItem(productName) {
        return this.cartItems.filter({ hasText: productName });
    }


    async removeProduct(productName){
        await this.cartItem(productName).getByRole('button',{name:'Remove'}).click();
    }

    async continueShopping(){
        await this.continueShoppingButton.click();
        return new ProductsPage(this.page);
    }



}