import { test, expect, Locator } from "@playwright/test";

test("E-commerce checkout flow full end to end scenario", async ({ page }) => {

    // 1. Open application
    await page.goto('https://www.saucedemo.com/');

    // 2. Login
    const usernameInput: Locator = page.locator('#user-name');
    const passwordInput: Locator = page.locator('#password');
    const loginBtn: Locator = page.locator('[data-test="login-button"]');
    await usernameInput.fill('standard_user');
    await passwordInput.fill('secret_sauce');

    await loginBtn.click();

    // 3. Verify Products page
    const productHeader = page.locator('[data-test="title"]');
    await expect(productHeader).toHaveText('Products');



    // 4. Sort products by price
    const productSortDropdown = page.locator('[data-test="product-sort-container"]');
    await productSortDropdown.selectOption({ value: 'lohi' });

    // 5. Find cheapest product
    const productPrices = page.locator('[data-test="inventory-item-price"]');
    const priceText: string[] = (await productPrices.allTextContents()).map(text => text.trim());
    console.log(priceText);

    let lowprice = Number.POSITIVE_INFINITY;
    for (const price of priceText) {
        const numericPrice = Number(price.replace('$', '').trim());
        lowprice = numericPrice < lowprice ? numericPrice : lowprice;
    }

    // 6. Add cheapest product to cart
    const cheapestIndex = priceText.findIndex(price => Number(price.replace('$', '')) === lowprice);
    expect(cheapestIndex).toBeGreaterThanOrEqual(0);

    const cheapestProduct = page.locator('[data-test="inventory-item"]').nth(cheapestIndex);
    const addToCartButton = cheapestProduct.getByRole('button', { name: 'Add to cart' });
    const itemName = await cheapestProduct.locator('[data-test="inventory-item-name"]').innerText();
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();
    await expect(cheapestProduct.getByRole('button', { name: 'Remove' })).toBeVisible();

    // 7. Verify cart
    const cartLink = page.locator('[data-test="shopping-cart-link"]');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await cartLink.click();
    await expect(page).toHaveURL(/cart\.html/);

    const itemNameInCart = page.locator('[data-test="cart-list"] [data-test="inventory-item-name"]');
    await expect(itemNameInCart).toHaveText(itemName);


    // 8. Checkout
    const checkoutButton = page.getByRole('button', { name: 'Checkout' });
    await checkoutButton.click();

    // 9. Verify checkout overview
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
    const firstNamePlaceholder = page.getByPlaceholder('First Name');
    await expect(firstNamePlaceholder).toBeVisible();
    const lastNamePlaceholder = page.getByPlaceholder('Last Name');
    await expect(lastNamePlaceholder).toBeVisible();
    const zipCodePlaceholder = page.getByPlaceholder('Zip/Postal Code');
    await expect(zipCodePlaceholder).toBeVisible();
    await firstNamePlaceholder.fill('prem');
    await lastNamePlaceholder.fill('Kok');
    await zipCodePlaceholder.fill("411062");
    // 10. Finish order
    const continueButton = page.getByRole('button', { name: 'continue' });
    await continueButton.click();
    await expect(page.locator('[data-test="payment-info-label"]')).toBeVisible();
    const finishbtn = page.getByRole('button', { name: 'finish' });
    expect(finishbtn).toBeVisible();
    finishbtn.click();
    // 11. Verify success message
    await expect(
        page.locator('[data-test="complete-header"]')
    ).toHaveText('Thank you for your order!');

});
