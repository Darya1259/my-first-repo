export class InventoryPage{

    constructor(page){
        this.page = page;

        this.pageTitle = page.locator('[data-test="title"]');
        this.shoppingCartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.productsList = page.locator('[data-test="inventory-list"]');
        this.productItem = page.locator('[data-test="inventory-item"]');
        this.productSort = page.locator('[data-test="product-sort-container"]');
    }

    async addItemToCart(itemName){
        await this.productItem.filter({hasText: itemName}).locator('button:has-text("Add to cart")').click();
    }

    async openCart(){
        await this.shoppingCartIcon.click();
    }

    async getPageTitle(){
       return await this.pageTitle.innerText();
    }

    async sortItemsHighToLow(){
        await this.productSort.selectOption('hilo');
    }

    async addFirstItemToCart() {
        await this.productItem.first().locator('button:has-text("Add to cart")').click();
    }
}
