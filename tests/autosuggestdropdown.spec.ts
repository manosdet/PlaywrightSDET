import { test, expect, Locator } from "@playwright/test";

test("Auto suggest drop down", async ({ page }) => {
    await page.goto('https://www.flipkart.com/');

    if (await page.locator('span.bUyoc9').isEnabled()) {
        await page.getByText('✕', { exact: true }).click();
    }

    await page.locator("input[name='q']").fill('smart')
    await page.waitForTimeout(4000);

    //Get all the suggested options --> ctrl+shift+p
    const options = page.locator("ui>li");
    const count = await options.count();
    console.log("Number of auto suggestions ", count);

    //Printing all the suggested options in the console
    console.log("5th options", await options.nth(5).innerText());
    console.log("Printing all the suggestions")

    for (let i = 0; i < count; i++) {
        console.log(await options.nth(i).innerText());
        console.log(await options.nth(i).textContent());

    }

    //Select /click on the smartphone option 
    for (let i = 0; i < count; i++) {
        const text = await options.nth(i).innerText();

        if (text === 'smartphone') {
            options.nth(i).click();
            break;
        }
    }
    await page.waitForTimeout(4000);

});
