import { Builder, By, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import * as chrome from 'selenium-webdriver/chrome';

describe('View Job Roles Tests', function () {
    let driver: WebDriver;

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

    it('Facebook link should work', async function () {
        const url: string = process.env.UI_TEST_URL || 'https://jptw3amsi2.eu-west-1.awsapprunner.com/jobRoles';
        await driver.get(url);

        const facebookLink = By.xpath("//a[@title='https://www.facebook.com/KainosSoftware/?locale=en_GB']");
        const element = await driver.findElement(facebookLink);
        await element.click();

        await driver.sleep(2000); // Sleep for 2 seconds to ensure the click is processed
        const facebookUrl = await driver.getCurrentUrl();
        expect(facebookUrl).to.include('facebook.com/KainosSoftware');

        await driver.navigate().back();

        const title = By.xpath("//h2[normalize-space()='Available Job Roles']");
        const elementBack = await driver.findElement(title);
        const newTitleText = await elementBack.getText();
        expect(newTitleText).to.equal('Available Job Roles');
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


