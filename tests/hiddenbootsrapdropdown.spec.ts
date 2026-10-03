import { test, expect, Locator } from "@playwright/test";

test("Bootsrtap hidden dropdown", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    //login steps 
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[type=submit]').click();


    //Click on the PIM 
    await page.getByText('PIM').click();
    //Clicked on job title drop dwon
    await page.waitForTimeout(3000);
    await page.locator('form i').nth(2).click();
    await page.waitForTimeout(3000);
    //capture all the options from drop down
    const options = page.locator("div[role='listbox'] span");
    const count = await options.count();
    console.log(count);

    //print all the options

    console.log(await options.allTextContents());
    for (let i = 0; i < count; i++) {
        //console.log(await options.nth(i).innerText());
        console.log(await options.nth(i).textContent());

    }
    //Select/click on option
    for (let i = 0; i < count; i++) {
        const text = await options.nth(i).innerText();
        if (text === 'Automation Tester') {
            await options.nth(i).click();
            break;
        }

    }


});

