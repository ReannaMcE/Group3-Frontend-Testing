import { WebDriver, WebElement, By, until } from 'selenium-webdriver';
import { basepage } from './basepage';

export class FooterTestPage extends basepage {

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

        await FooterTestPage.loadPage(page);
    }
}
