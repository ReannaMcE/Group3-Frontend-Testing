import { WebDriver, WebElement, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

export class ViewJobRolesTestsPage {
    private static BASE_URL: string = process.env.UI_TEST_URL || 'https://jptw3amsi2.eu-west-1.awsapprunner.com/jobRoles';

    public static async loadPage(driver: WebDriver): Promise<void> {
        await driver.get(this.BASE_URL);
    }

    public static async FacebookLink(driver: WebDriver): Promise<WebElement> {
        return driver.findElement(By.xpath("//a[@title='https://www.facebook.com/KainosSoftware/?locale=en_GB']"));
    }

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

    public static async assertFacebook(driver: WebDriver): Promise<void> {
        await driver.wait(async () => {
            const currentUrl = await driver.getCurrentUrl();
            return currentUrl.includes('facebook.com/KainosSoftware');
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
