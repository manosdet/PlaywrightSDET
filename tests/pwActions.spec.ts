import { test, expect, Locator } from "@playwright/test";


test('Test Input Actions', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const textBox = page.locator('#name');

    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();

    const maxlength: string | null = await textBox.getAttribute("maxlength"); //Returns value of max length attribute of the element 

    console.log(maxlength);
    expect(maxlength).toBe("15");
    await textBox.fill("Jhon Canedy");

    console.log("test content of first Name", await textBox.textContent()); //return empty scince there is no value of element in html tag

    const enteredValue: string = await textBox.inputValue();
    console.log("test content of first Name", await textBox.inputValue()); //return 

    expect(enteredValue).toBe("Jhon Canedy");
    await page.waitForTimeout(5000);

})


test('Test Radio Button Actions', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const maleRadioBtn = page.locator('#male'); //male radio button 

    await expect(maleRadioBtn).toBeVisible();
    await expect(maleRadioBtn).toBeVisible();

    expect(await maleRadioBtn.isChecked()).toBeFalsy();

    await maleRadioBtn.check(); //Select radio button
    expect(maleRadioBtn).toBeChecked();

    expect(await maleRadioBtn.isChecked()).toBeTruthy();

    await page.waitForTimeout(5000);

})

test("test Check box Actions", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    //1. Select specific check box
    const sandayCheckbox = page.getByLabel('Sunday'); //male radio button 

    //await sandayCheckbox.check();
    //await expect(sandayCheckbox).toBeChecked();
    //2.Select all checkboxes and assert each is checked
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    /*
        const checkboxes: Locator[] = days.map(index => page.getByLabel(index))
        expect(checkboxes.length).toBe(7);
    
        //3.Select all the check boxes and assert each is checked
        for (const checkbox of checkboxes) {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    
    
        //4.Uncheck last 3 checkboxes and assesrt
        for (const checkbox of checkboxes.slice(-3)) {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        }
    
        //5.Toggle checkboxes : If checked Uncheck; if unchecked check.Assert state flipped
        for (const checkbox of checkboxes) {
            if (await checkbox.isChecked()) {
                //Only if not cheked 
                await checkbox.check();
                await expect(checkbox).toBeChecked();
    
            } else {
                //Only if checked
                await checkbox.uncheck();
                await expect(checkbox).not.toBeChecked();
            }
        }
    
        //6.Randomely select check boxes - Select checkboxes by index(1,3,6) and assert
        const indexes: number[] = [1, 3, 6];
    
        for (const i of indexes) {
            await checkboxes[i].check();
            await expect(checkboxes[i]).toBeChecked();
        }
    
        //7. Select the check box based on the label
        */
    /* for (const label of days) {
         if (label.toLowerCase() === weekday.toLowerCase()) {
             const checkbox = page.getByLabel(label);
             checkbox.check();
             await expect(checkbox).toBeChecked();
         }
     }
         */


    async function checkWeekDay(day: string) {
        const checkbox = page.getByLabel(day);
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }

    await checkWeekDay("Sunday");






    await page.waitForTimeout(3000);

});