import{test,Locator,expect} from "@playwright/test"
import { log } from "node:console";


test("XPath demo in playwright", async({page}) =>{

     await page.goto("https://demowebshop.tricentis.com/");

 //1.Absolute xpath 
   const logo:Locator = page.locator("//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]");
   await expect(logo).toBeVisible();


//2.Realative xpath 
   const relativelogo:Locator = page.locator("//img[@alt='Tricentis Demo Web Shop']");
   await expect(logo).toBeVisible();

//3.Contains
    const products:Locator = page.locator("//h2/a[contains(@href,'omputer')]");
    const productsCount: number = await products.count();
    console.log(productsCount);
   expect(productsCount).toBeGreaterThan(0);

   //console.log(await products.textContent()); //Error: strict mode violation:
   console.log("Text content of first element",await products.first().textContent()); 
   console.log("Text content of last element",await products.last().textContent()); 
   console.log("Text content of nth element",await products.nth(3).textContent()); 

   let productTitles:string[]=await products.allTextContents(); // getting matched product in to an array 

   for(let pt of productTitles){
    console.log(pt);
   }

//4.start-with()

   const buildingProducts:Locator = page.locator("//h2/a[starts-with(@href,'/build')]"); //Returns multiple Elements
   const count :number = await buildingProducts.count();
   expect(count).toBeGreaterThan(0);
 


//5.Text()- return single element 
   const  regLink:Locator = page.locator("//a[text()='Register']");
   await expect(regLink).toBeVisible();
//6.last()
    const lastitem: Locator=page.locator("//div[@class='column follow-us']//li[last()]") ;
    await expect(lastitem).toBeVisible(); 
    console.log("Text content of last element :", await lastitem.textContent())
//7.Postion()
    const positionitem: Locator=page.locator("//div[@class='column follow-us']//li[position()=2]") ;
    await expect(positionitem).toBeVisible();
    console.log("Text content of last element :", await positionitem.textContent())

    page.close();
})