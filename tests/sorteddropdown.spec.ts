import { test, expect, Locator } from '@playwright/test';

test("Check drop down is in shorted order ", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const dropDownOptions: Locator = page.locator('#animals>option');
    //const dropDownOptions: Locator = page.locator('#colors>option');
    console.log(await dropDownOptions.allTextContents());

    const optiontext = (await dropDownOptions.allTextContents()).map(text => text.trim());

    const orignalList: string[] = [...optiontext];
    const shortedlist = [...optiontext].sort();


    console.log(orignalList);
    console.log(shortedlist);
    expect(orignalList).toEqual(shortedlist)


    //await page.waitForTimeout(5000);


});