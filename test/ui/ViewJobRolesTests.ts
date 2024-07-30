import { Builder, By, WebDriver, until } from 'selenium-webdriver';
import { expect } from 'chai';
import * as chrome from 'selenium-webdriver/chrome';
import { ViewJobRolesTestsPage } from './ViewJobRolesTestsPage';

describe('View Job Roles Tests', function () {
    let driver: WebDriver;
    let viewRolesPage: ViewJobRolesTestsPage;

    before(async function () {
        driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options())
            .build();
    });

    after(async function () {
        try {
            await driver.quit();
        } catch (error) {
            console.error('Error quitting the driver:', error);
        }
    });

    it('Job roles page should load', async function () {
        const url: string = process.env.UI_TEST_URL || 'https://jptw3amsi2.eu-west-1.awsapprunner.com/jobRoles';
        await driver.get(url);

        const title = By.xpath("//h2[normalize-space()='Available Job Roles']");
        const element = await driver.findElement(title);
        const actualText = await element.getText();
        expect(actualText).to.equal('Available Job Roles');
    });

    it.only('Facebook link should work', async function () {
        this.timeout(30000); // Increase the timeout for the entire test

    const url: string = process.env.UI_TEST_URL || 'https://jptw3amsi2.eu-west-1.awsapprunner.com/jobRoles';
    const driver: WebDriver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get(url);

        await ViewJobRolesTestsPage.clickFacebook(driver);

        await driver.wait(async () => {
            const currentUrl = await driver.getCurrentUrl();
            return currentUrl.includes('facebook.com/KainosSoftware');
        }, 15000); // Wait up to 15 seconds

        const facebookUrl = await driver.getCurrentUrl();
        expect(facebookUrl).to.include('facebook.com/KainosSoftware');

        await driver.navigate().back();

        const title = By.xpath("//h2[normalize-space()='Available Job Roles']");
        await driver.wait(until.elementLocated(title), 10000); // Wait up to 10 seconds

        const elementBack = await driver.findElement(title);
        const newTitleText = await elementBack.getText();
        expect(newTitleText).to.equal('Available Job Roles');
    } catch (error) {
        console.error('Test failed:', error);
        throw error; 
    } finally {
        await driver.quit();
    }
    });


    it('Twitter link should work', async function () {
        const url: string = process.env.UI_TEST_URL || 'https://jptw3amsi2.eu-west-1.awsapprunner.com/jobRoles';
        await driver.get(url);

        const twitterLink = By.xpath("//a[@title='https://x.com/i/flow/login?redirect_after_login=%2FKainosSoftware']");
        const element = await driver.findElement(twitterLink);
        await element.click();

        await driver.sleep(2000); // Sleep for 2 seconds to ensure the click is processed
        const twitterUrl = await driver.getCurrentUrl();
        expect(twitterUrl).to.include('x.com');

        await driver.get(url);

        await driver.sleep(2000); // Sleep for 2 seconds to ensure the click is processed

        const title = By.xpath("//h2[normalize-space()='Available Job Roles']");
        const elementBack = await driver.findElement(title);
        const newTitleText = await elementBack.getText();
        expect(newTitleText).to.equal('Available Job Roles');
    });


    it('Instagram link should work', async function () {
        const url: string = process.env.UI_TEST_URL || 'https://jptw3amsi2.eu-west-1.awsapprunner.com/jobRoles';
        await driver.get(url);

        const instagramLink = By.xpath("//a[@title='https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fkainossoftware%2F&is_from_rle']");
        const element = await driver.findElement(instagramLink);
        await element.click();

        await driver.sleep(2000); // Sleep for 2 seconds to ensure the click is processed
        const instagramUrl = await driver.getCurrentUrl();
        expect(instagramUrl).to.include('instagram.com');

        await driver.get(url);

        await driver.sleep(2000); // Sleep for 2 seconds to ensure the click is processed
        
        const title = By.xpath("//h2[normalize-space()='Available Job Roles']");
        const elementBack = await driver.findElement(title);
        const newTitleText = await elementBack.getText();
        expect(newTitleText).to.equal('Available Job Roles');
    });



    // this code also needs to check that the job status' all say 'open'
    // and eventually will test that the home, jobs and login buttons work in the header
});




//li[1]//p[4]

//li[1]//p[4]//b[1]


