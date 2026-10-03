import {test,expect,Locator} from '@playwright/test'


test("handle Dynamic Elements using Xpath ",async ({page}) =>{

await page.goto('https://testautomationpractice.blogspot.com/');
//loop to click the button 5 times 
for(let i=1;i<=5; i++){
 let button:Locator =page.locator('//button[text()="STOP" or text()="START"])'); //Locate the button with either 'STOP' or 'START'

 //Click button
 await button.click();

 //wait for 2 sec
 await page.waitForTimeout(2000);

}
});

//Using css
test("handle Dynamic Elements using CSS ",async ({page}) =>{

await page.goto('https://testautomationpractice.blogspot.com/');
//loop to click the button 5 times 
for(let i=1;i<=5; i++){
    //Locate dynamic element using css attribute(name can be stop or start)
 let button:Locator =page.locator('button[name="start"],button[name="stop"])'); //Locate the button with either 'STOP' or 'START'

 //Click button
 await button.click();

 //wait for 2 sec
 await page.waitForTimeout(2000);

}
});


//Using playwright specific locators
test("handle Dynamic Elements using PW Locators ",async ({page}) =>{

await page.goto('https://testautomationpractice.blogspot.com/');
//loop to click the button 5 times 
for(let i=1;i<=5; i++){
    //Locate dynamic element using css attribute(name can be stop or start)
 let button:Locator =page.getByRole('button',{ name:/START|STOP/ }); //Locate the button with either 'STOP' or 'START'

 //Click button
 await button.click();

 //wait for 2 sec
 await page.waitForTimeout(2000);

}
});