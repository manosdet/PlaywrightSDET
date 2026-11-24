import { test, expect } from "@playwright/test";

test("practice locators", async ({ page }) => {
   await page.goto("https://www.saucedemo.com/");
   //Xpath
   await page.locator('//input[@name="user-name"]').fill("standard_user");
   //CSS selector
   await page.locator('input#password').fill("secret_sauce");
   //await page.locator(`input.submit-button`).click();
   await page.locator('input[value=Login]').click();

   //Text
   // await page.locator("text='Sauce Labs Backpack'").click();//Case Sensitive
   await page.locator("text=Sauce LAbs Backpack").click();
   //await page.locator('id=add-to-cart').click();
   await page.locator('data-test=add-to-cart').click();
   await page.locator('data-test=remove').click();




})