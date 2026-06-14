export class CheckoutStepOnePage{

    constructor(page){
        this.page = page;

        this.firstNameField = page.locator('[data-test="firstName"]');
        this.lastNameField = page.locator('[data-test="lastName"]');
        this.postalCodeField = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
    }

    async fillUserInfo(firstName, lastName, postalCode){
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.postalCodeField.fill(postalCode);

        await this.continueButton.click();
    }
}