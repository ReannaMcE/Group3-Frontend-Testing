import { Builder, By, WebDriver, WebElement, until } from 'selenium-webdriver';
import { expect } from 'chai';
import * as chrome from 'selenium-webdriver/chrome';

export class ViewJobRolesTestsPage {


    // WebElements ----------------------------------------------------------------------------------------------------------
    public static async Title(driver: WebDriver): Promise<WebElement> {
        const element: WebElement = await driver.findElement(By.xpath("//h2[normalize-space()='Available Job Roles']"));
        return element;
    }

    public static async FacebookLink(driver: WebDriver): Promise<WebElement> {
        const element: WebElement = await driver.findElement(By.xpath("//a[@title='https://www.facebook.com/KainosSoftware/?locale=en_GB']"));
        return element;
    }

    public static async TwitterLink(driver: WebDriver): Promise<WebElement> {
        const element: WebElement = await driver.findElement(By.xpath("//a[@title='https://x.com/i/flow/login?redirect_after_login=%2FKainosSoftware']"));
        return element;
    }


    public static async InstagramLink(driver: WebDriver): Promise<WebElement> {
        const element: WebElement = await driver.findElement(By.xpath("//a[@title='https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fkainossoftware%2F&is_from_rle']"));
        return element;
    }


    // public static async HomeButton(driver: WebDriver): Promise<WebElement> {
    //     const element: WebElement = await driver.findElement(By.id("id of home button goes here ******"));
    //     return element;
    // }

    // public static async LoginButton(driver: WebDriver): Promise<WebElement> {
    //     const element: WebElement = await driver.findElement(By.id("**** id of the login button goes here *****"));
    //     return element;
    // }


    // public static async JobRolesButton(driver: WebDriver): Promise<WebElement> {
    //     const element: WebElement = await driver.findElement(By.id("*** id of the job roles button goes here ****"));
    //     return element;
    // }



    // Click Methods --------------------------------------------------------------------------------------------------------

    public static async clickFacebook(driver: WebDriver): Promise<void> {
        try {
            // Wait for the Facebook link to be clickable before clicking
            const facebookLink: WebElement = await this.FacebookLink(driver);
            await driver.wait(until.elementIsVisible(facebookLink), 10000); // Wait up to 10 seconds
            await facebookLink.click();
        } catch (error) {
            console.error('Error clicking the Facebook link:', error);
            throw error; // Rethrow error to ensure test fails properly
        }
    
    }
}

