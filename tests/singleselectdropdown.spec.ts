import { test, expect, Locator } from "@playwright/test";

test("Single Select Drop down", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com");

    //1) Select option from tech drop down 
    //await page.locator('#country').selectOption('India'); // visible text
    //await page.locator('#country').selectOption({ value: 'uk' }); // by using value attribute
    //await page.locator('#country').selectOption({label:'India'}); // by using label text
    //page.locator('#country').selectOption({index:3}); // by using index

    //2)Check number of options in the dropdwon(*count)
    const dropdownOptions: Locator = page.locator('#country>option');
    await expect(dropdownOptions).toHaveCount(10);

    //3)Check an option present in the dropdown 
    const optionsText: String[] = (await dropdownOptions.allTextContents()).map(text => text.trim());

    console.log(optionsText)
    expect(optionsText).toContain('Japan');

    //4)printing options from the drop down
    for (const option of optionsText) {
        console.log(option);
    }

    await page.waitForTimeout(5000);
});