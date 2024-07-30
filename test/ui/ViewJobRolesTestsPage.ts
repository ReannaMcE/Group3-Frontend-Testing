import { WebDriver, WebElement, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

export class ViewJobRolesTestsPage {


    // Load Page --------------------------------------------------------------------------------
    private static BASE_URL: string = process.env.UI_TEST_URL || 'https://jptw3amsi2.eu-west-1.awsapprunner.com/jobRoles';

    public static async loadPage(driver: WebDriver): Promise<void> {
        await driver.get(this.BASE_URL);
    }

    // Web Elements --------------------------------------------------------------------------------
    public static async FacebookLink(driver: WebDriver): Promise<WebElement> {
        return driver.findElement(By.xpath("//a[@title='https://www.facebook.com/KainosSoftware/?locale=en_GB']"));
    }

    public static async TwitterLink(driver: WebDriver): Promise<WebElement> {
        return driver.findElement(By.xpath("//a[@title='https://x.com/i/flow/login?redirect_after_login=%2FKainosSoftware']"));
    }

    public static async InstagramLink(driver: WebDriver): Promise<WebElement> {
        return driver.findElement(By.xpath("//a[@title='https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fkainossoftware%2F&is_from_rle']"));
    }

    // public static async HomeButton(driver: WebDriver): Promise<WebElement> {
    //     return driver.findElement(By.id("id of home button goes here ******"));
    // }

    // public static async LoginButton(driver: WebDriver): Promise<WebElement> {
    //     return driver.findElement(By.id("**** id of the login button goes here *****"));
    // }

    // public static async JobRolesButton(driver: WebDriver): Promise<WebElement> {
    //     return driver.findElement(By.id("*** id of the job roles button goes here ****"));
    // }


    // Click Links --------------------------------------------------------------------------------
    public static async clickFacebook(driver: WebDriver): Promise<void> {
        try {
            const facebookLink: WebElement = await this.FacebookLink(driver);
            await driver.wait(until.elementIsVisible(facebookLink), 10000);
            await facebookLink.click();
        } catch (error) {
            console.error('Error clicking the Facebook link:', error);
            throw error;
        }
    }

    public static async clickTwitter(driver: WebDriver): Promise<void> {
        try {
            const twitterLink: WebElement = await this.TwitterLink(driver);
            await driver.wait(until.elementIsVisible(twitterLink), 10000);
            await twitterLink.click();
        } catch (error) {
            console.error('Error clicking the Twitter link:', error);
            throw error;
        }
    }

    public static async clickInstagram(driver: WebDriver): Promise<void> {
        try {
            const instagramLink: WebElement = await this.InstagramLink(driver);
            await driver.wait(until.elementIsVisible(instagramLink), 10000);
            await instagramLink.click();
        } catch (error) {
            console.error('Error clicking the Instagram link:', error);
            throw error;
        }
    }

    
    // Assertions --------------------------------------------------------------------------------
    public static async assertFacebook(driver: WebDriver): Promise<void> {
        await driver.wait(async () => {
            const currentUrl = await driver.getCurrentUrl();
            return currentUrl.includes('facebook.com/KainosSoftware');
        }, 15000);
    }

    public static async assertTwitter(driver: WebDriver): Promise<void> {
        await driver.wait(async () => {
            const currentUrl = await driver.getCurrentUrl();
            return currentUrl.includes('x.com');
        }, 15000);
    }

    public static async assertInstagram(driver: WebDriver): Promise<void> {
        await driver.wait(async () => {
            const currentUrl = await driver.getCurrentUrl();
            return currentUrl.includes('instagram.com');
        }, 15000);
    }

    public static async assertJobRolesTitle(driver: WebDriver): Promise<void> {
        const title = By.xpath("//h2[normalize-space()='Available Job Roles']");
        await driver.wait(until.elementLocated(title), 10000);
        const elementBack = await driver.findElement(title);
        const newTitleText = await elementBack.getText();
        expect(newTitleText).to.equal('Available Job Roles');
    }
}
