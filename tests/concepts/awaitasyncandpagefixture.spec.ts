import {chromium, test, expect } from '@playwright/test';

test("Basic setup for Playwright", async ({ page }) => {

    //Without page fixture we need to write the below code in every test case
   // const browser = await chromium.launch();
   // const context = await browser.newContext();
    //const page = await context.newPage();

    //With page fixture we can directly use page object in test case and no need to write the above code in every test case
    await page.goto('https://testautomationpractice.blogspot.com/');

    const table = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

});