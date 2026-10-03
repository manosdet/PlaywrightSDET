import { test, expect } from "@playwright/test"



/*
//Syntaxt
test("title",() =>{
//Steps...

})
*/
//fixture - global variable, page browser

test("Verify page title", async ({ page }) => {
    //Steps...
    await page.goto("http:www.automationpractice.pl/index.php");
    let title: string = await page.title();
    console.log("Title:", title);
    await expect(page).toHaveTitle("My Shop")

})