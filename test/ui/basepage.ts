import { WebDriver, Builder } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

export class basepage {
    public static driver: WebDriver;

    // WebDriver Functions --------------------------------------------------------------------------------
    public static async startDriver(): Promise<void> {
        const options = new chrome.Options();
        // options.addArguments('headless'); // Enable headless mode
        // options.addArguments('disable-gpu');
        // options.addArguments('no-sandbox');
      
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
}
