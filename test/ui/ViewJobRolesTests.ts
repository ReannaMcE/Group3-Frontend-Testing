import { Builder, Capabilities, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { ViewJobRolesPage } from './ViewJobRolesTestPage';
import * as chrome from 'selenium-webdriver/chrome';


// run the view job roles page
describe('View Job Roles Test', function () {
    let driver: WebDriver;
    let viewJobRolesPage: ViewJobRolesPage;

    before(async function () {
        driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options())
            .build();

        //viewJobRolesPage = new viewJobRolesPage(driver);
    });

    after(async function () {
        try {
            await driver.quit(); // Ensure this is awaited
        } catch (error) {
            console.error('Error quitting the driver:', error);
        }
    });

    
    it('Job roles page should load', async function () {
        const url: string = process.env.UI_TEST_URL || 'https://jptw3amsi2.eu-west-1.awsapprunner.com/jobRoles';
        await viewJobRolesPage.open(url);

       // check here that things display on the view job roles page- buttons, titles etc

        const actualText = await viewJobRolesPage.getTitleText();
        expect(actualText).to.equal('Available Job Roles');
    });

// Test case: Verify that the facebook link redirects to facebook
    it('Facebook link should work', async function () {
        const url: string = process.env.UI_TEST_URL || 'https://jptw3amsi2.eu-west-1.awsapprunner.com/jobRoles';
        await viewJobRolesPage.open(url);  // Open the viewJobRolesPage page

        await viewJobRolesPage.clickFacebook();  // click facebook button
        driver.navigate().back(); // go back to kainos page

//         const actualText = await loginPage.getSuccessMessageText();  // Get the success message
//         expect(actualText).to.equal('Together we write our story...');  // Verify the success message

        driver.quit();
    });
});



