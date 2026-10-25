import { test, expect, Locator } from "@playwright/test";


test("comparing methods", async ({ page }) => {


    await page.goto('https://demowebshop.tricentis.com/');
    const products: Locator = page.locator('.product-title');  //
    //1) innerText() vs textContent()

    console.log(await products.nth(2).innerText());
    console.log(await products.nth(2).textContent());
    const count = await products.count();

    for (let i = 0; i < count; i++) {
        // const productName: string = await products.nth(i).innerText(); //Extracts plain text.Eliminates whitespaces and line 
        //console.log(productName);

        //const productName: string | null = await products.nth(i).textContent(); //Extracts text including extra whitespaces,line breaks,etc
        //console.log(productName);

        const productName: string | null = await products.nth(i).textContent(); //Extracts text including extra whitespaces,line breaks,etc
        console.log(productName?.trim());

    }

    //2) allInnerText() vs allTextContent()

    console.log("************* Comparing allInnertext() vs alltextContent()********")
    const productNames: string[] = await products.allInnerTexts();
    console.log("Product Names captured by allInnertext():", productNames)

    const productNamesTrimmed: string[] = await productNames.map(Text => Text.trim());
    console.log("Product Names after trim:", productNamesTrimmed);

    //3) All()

    const productLocators: Locator[] = await products.all();
    console.log(productLocators);

    //console.log(await productLocators[1].innerText);
    //for of loop
    for (let productloc of productLocators) {
        console.log(await productloc.innerText());
    }

    //for in loop 
    for (let i in productLocators) {
        console.log(await productLocators[i].innerText());
    }

})