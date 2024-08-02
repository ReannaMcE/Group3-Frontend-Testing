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


     // Click links --------------------------------------------------------------------------------
     public static async clickLink(id: string): Promise<void> {
        try {
            const link: WebElement = await this.getLink(id);
            await this.driver.wait(until.elementIsVisible(link), 10000);
            await link.click();
        } catch (error) {
            console.error('Error clicking the link:', error);
            throw error;
        }
    }


    // Assertions --------------------------------------------------------------------------------
    public static async assertAndGoBack(actualUrl: string, page: string): Promise<void> {
        await this.driver.wait(async () => {
            const currentUrl = await this.driver.getCurrentUrl();
            return currentUrl.includes(actualUrl);
        }, 15000);

        await this.loadPage(page);
    }
}
