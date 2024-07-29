//this 'page' file is made to take all the values from webpage to use for the automated tests

import { By, WebDriver } from 'selenium-webdriver';

export class ViewJobRolesPage {
    private driver: WebDriver;

  // this just needs to load the view job roles page + assert that all the job roles are 'open' + check social links
    // - there aren't any buttons to press as yet

    // Locators
    // ***** change these to match the view job roles page items NOT THE HOME PAGE
    private facebookLink: By = By.xpath("//a[@title='https://www.facebook.com/KainosSoftware/?locale=en_GB']");
    private twitterLink: By = By.xpath("//a[@title='https://x.com/i/flow/login?redirect_after_login=%2FKainosSoftware']");
    private instagramLink: By = By.xpath("//a[@title='https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fkainossoftware%2F&is_from_rle']");
    private title: By = By.xpath("//h2[normalize-space()='Available Job Roles']");

    // create the webdriver instance
    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    // Actions

    // ****** change these to match the view job roles page NOT THE HOME PAGE

    async open(url: string): Promise<void> {
        await this.driver.get(url);
    }

    // click the facebook button to check
    async clickFacebook(): Promise<void> {
        const element = await this.driver.findElement(this.facebookLink);
        await element.click();
    }

    // click the facebook button to check
    async clickTwitter(): Promise<void> {
        const element = await this.driver.findElement(this.twitterLink);
        await element.click();
    }

    // click the facebook button to check
    async clickInstagram(): Promise<void> {
        const element = await this.driver.findElement(this.instagramLink);
        await element.click();
    }

    async getTitleText(): Promise<string> {
        const element = await this.driver.findElement(this.title);
        return await element.getText();
    }

//     async getSuccessMessageText(): Promise<string> {
//         const element = await this.driver.findElement(this.successMessage);
//         return await element.getText();
//     }
}
