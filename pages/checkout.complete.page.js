export class CheckoutCompletePage{
    constructor(page){
        this.page = page;

        this.title = page.locator('[data-test="complete-header"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async getCompletionMessage(){
        return await this.title.innerText();
    }

    async backHome(){
        await this.backHomeButton.click();
    }
}