import { expect } from 'chai';
import { WebDriver, Builder, WebElement, By, until } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

export class basepage {
    public static driver: WebDriver;

    // WebDriver Functions --------------------------------------------------------------------------------
    public static async startDriver(): Promise<void> {
        const options = new chrome.Options();
        options.addArguments('headless'); // Enable headless mode
        options.addArguments('disable-gpu');
        options.addArguments('no-sandbox');
      
        this.driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    }

    public static async quitDriver(): Promise<void> {
        if (this.driver) {
            await this.driver.quit();
        }
    }

    public static getDriver(): WebDriver {
        return this.driver;
    }

    // Load Page --------------------------------------------------------------------------------
    public static async loadPage(BASE_URL: string): Promise<void> {
        await this.driver.get(BASE_URL);
    }


    // Web Elements --------------------------------------------------------------------------------
    public static async getLink(id: string): Promise<WebElement> {
        return this.driver.findElement(By.id(id));
    }

    public static async getButton(id: string): Promise<WebElement> {
        return this.driver.findElement(By.id(id));
    }

    public static async LoginUserEmail(): Promise<WebElement> {
        return this.driver.findElement(By.id("username"));
    }

    public static async LoginUserPassword(): Promise<WebElement> {
        return this.driver.findElement(By.id("password"));
    }

    public static async getLoginButton(): Promise<WebElement> {
        return this.driver.findElement(By.id('submit'));
    }

     // Click links --------------------------------------------------------------------------------
     public static async clickLink(id: string): Promise<void> {
        try {
            const link: WebElement = await this.getLink(id);
            await this.driver.wait(until.elementIsVisible(link), 700000);
            await link.click();
        } catch (error) {
            console.error('Error clicking the link:', error);
            throw error;
        }
    }

    // Click Buttons --------------------------------------------------------------------------------
    public static async clickButton(id: string, buttonName: string): Promise<void> {
        try {
            const btn: WebElement = await this.getButton(id);
            await this.driver.wait(until.elementIsVisible(btn), 500000);
            await btn.click();
        } catch (error) {
            console.error('Error clicking the' + buttonName + 'button:', error);
            throw error;
        }
    }

    // Login method --------------------------------------------------------------------------------
    public static async login(username:string, password:string): Promise<void> {
        const user = await this.LoginUserEmail();
        await user.sendKeys(username);

        const pass = await this.LoginUserPassword();
        await pass.sendKeys(password);

        const button = await this.getLoginButton();
        await button.click();
    }


    // Assertions --------------------------------------------------------------------------------
    public static async assertAndGoBack(actualUrl: string, page: string): Promise<void> {
        await this.driver.wait(async () => {
            const currentUrl = await this.driver.getCurrentUrl();
            return currentUrl.includes(actualUrl);
        }, 500000);

        await this.loadPage(page);
    }

    public static async assertLoginShows(): Promise<void> {
        const loginButton = await this.driver.findElement(By.id('submit'));
        expect(await loginButton.isDisplayed()).to.be.true;
    }




    
}

