import { test, expect, Locator } from '@playwright/test';

test("Test example for practice ", async ({ page }) => {

    page.goto('https://google.com/');

    await page.waitForTimeout(10000);

})