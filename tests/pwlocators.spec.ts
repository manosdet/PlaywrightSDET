import {test,expect,Locator} from "@playwright/test"
import { link } from "node:fs";

//Locator-Identifies the element on the page.
//DOM - Document object module 
//DOM is API Interface provided by browser

/*
page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
*/
test("Verify Playwright locators",async ({page}) =>{
//Steps...
await page.goto("http://demo.nopcommerce.com/");


//1.page.getByAltText() to locate an element, usually image, by its text alternative.
//Use this locator when your element supports  alt text such as img and area elements.
const logo:Locator = page.getByAltText("nopCommerce demo store");
//logo.click();
await expect(logo).toBeVisible();

//2.page.getByText() to locate by visible text content.You can match by a substring,exact string,
//Locate by visible text.
//Use this locator to find non interactive element like div , span ,p ,etc.
//For interactive elements like button, a, input,etc. use role locators.
/*

<p> welcome</p>
<div>hellow</div>
*/
await expect(page.getByText("Welcome to our store")).toBeVisible(); //Full String/Full text
await expect(page.getByText("Welcome to o")).toBeVisible(); //it will work for substring also
await expect(page.getByText(/Welcome\s+To\s+Our\s+Store/i)).toBeVisible(); //Regular expression

//3 Yes page.getByRole() to locate by explicit and implicit accessibility attributes.
/*Role locators include button s, checkbox ,headings ,links,lists,tables and many more and follows W3C specification for ARIA role .
Prefer for interactive elements like buttons ,checkboxes,links ,lists,headings,tables, etc. */

await page.getByRole("link",{name:'Register'}).click();

await expect(page.getByRole("heading",{name:'Register'})).toBeVisible();


//4.page.getByLabel() to locate a form control by associated label's text.
//when to use: idel for form filds with visible labels .
//page.getByLabel('First name:').type("John"); //type is deprecated 
await page.getByLabel('First name:').fill("John"); //type is deprecated 
await page.getByLabel('Last name:').fill("Tom"); //type is deprecated 
await page.getByLabel('Email:').fill("abc@gmail.com"); //type is deprecated 

//5.page.getByPlaceholder() to locate an input by placeholder.
//Best for inputs without a label but having a placeholder

await page.getByPlaceholder("Search ").fill('Apple MacBook Pro');

//6.page.getByTitle() to locate an element by its title attribute.
//When to use : When your element has a meaningfull title attribut.
await page.goto("url");
//const link:Locator=page.getByTitle("Home page link")
//expect(link).toHaveText("Home");

await expect(page.getByTitle("Home page link")).toHaveText("Home");
await expect(page.getByTitle("HyperText Markup Language")).toHaveText("Home");

//.7page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
//When to use:When txet or role-based locators are unstable or not suiteable
await expect(page.getByTestId("profile-name")).toHaveText("john.doe@example.com");

})