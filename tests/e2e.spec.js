import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/login.page.js';
import { InventoryPage } from '../pages/inventory.page.js';
import { CartPage } from '../pages/cart.page.js';
import { CheckoutStepOnePage } from '../pages/checkout.stepOne.page.js';
import { CheckoutStepTwoPage } from '../pages/checkout.stepTwo.page.js';
import { CheckoutCompletePage } from '../pages/checkout.complete.page.js';

test('Проверка успешной работы пользовательского сценария', async({page}) =>{
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");

    const pageTitle = await inventoryPage.getPageTitle();
    expect(pageTitle).toBe('Products');

    await inventoryPage.sortItemsHighToLow();
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.openCart();

    const addedProduct = await cartPage.getAddedItem();
    expect(addedProduct).toBe('Sauce Labs Fleece Jacket');
    await cartPage.goToCheckout();

    await checkoutStepOnePage.fillUserInfo('Test', 'User', '12345');
    await checkoutStepTwoPage.finishCheckout();

    const succesfulMessage = await checkoutCompletePage.getCompletionMessage();
    expect(succesfulMessage).toBe('Thank you for your order!');
})