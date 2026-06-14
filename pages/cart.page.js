export class CartPage{

    constructor(page){
        this.page = page;
        
        this.addedProducts = page.locator('[data-test="cart-list"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.addedItemName = page.locator('[data-test="inventory-item-name"]');
    }

    async goToCheckout(){
        await this.checkoutButton.click();
    }

    async continueShopping(){
        await this.continueShoppingButton.click();
    }

    async getAddedItem(){
        return await this.addedItemName.innerText();
    }
}