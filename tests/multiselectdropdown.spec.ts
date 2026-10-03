import { test, expect, Locator } from '@playwright/test';


test("Multi Select Drop Dwon", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    //1) select options from the drop down (4 ways)
    //await page.locator("#colors").selectOption(['Red', 'Blue', 'Green']); //Using visible text 
    // await page.locator('#colors').selectOption(['red','green','white']); // using value atrribute
    //await page.locator('#colors').selectOption([{ label: 'red' }, { label: 'green' }, { label: 'white' }]);  //Using label
    await page.locator('#colors').selectOption([{ index: 0 }, { index: 2 }, { index: 3 }]);


    //2) check number of options in the dropdown count 
    const dropdownOptions: Locator = page.locator('#colors>option');
    await expect(dropdownOptions).toHaveCount(7);

    //3)Check an option present in the dropdown 
    const optionsText: String[] = (await dropdownOptions.allTextContents()).map(text => text.trim());

    console.log(optionsText)
    expect(optionsText).toContain('Green');
    
     //4)printing options from the drop down
    for (const option of optionsText) {
        console.log(option);
    }

    await page.waitForTimeout(5000);
})