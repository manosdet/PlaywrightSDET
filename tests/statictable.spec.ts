import { test, expect, Locator } from "@playwright/test";


test("", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const table = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    //1)count number of rows in table

    const rows: Locator = page.locator("table[name='BookTable'] tbody tr"); //returns all the rows including header
    await expect(rows).toHaveCount(7);  //Approache 1

    const rowCount: number = await rows.count();
    console.log("Number of rows in a table", rowCount)

    expect(rowCount).toBe(7); //appraoch 2


});