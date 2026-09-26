import { ProductsPage } from './ProductsPage';

export class CartPage{
    constructor(page){
        this.page=page;
        this.header=page.getByTestId('title');
    }
    
}