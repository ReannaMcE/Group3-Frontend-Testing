import { WebDriver, WebElement, By, until } from 'selenium-webdriver';
import { basepage } from './basepage';

export class HeaderTestPage extends basepage { 


    // Web Elements --------------------------------------------------------------------------------
    public static async HomeButton(): Promise<WebElement> {
        return this.driver.findElement(By.id("navbarHome"));
    }

    public static async LoginButton(): Promise<WebElement> {
        return this.driver.findElement(By.id("navbarLogin"));
    }

    public static async JobRolesButton(): Promise<WebElement> {
        return this.driver.findElement(By.id("navbarJobs"));
    }

    public static async getButton(id: string): Promise<WebElement> {
        return this.driver.findElement(By.id(id));
    }

    

    // Click Buttons --------------------------------------------------------------------------------
    public static async clickButton(id: string, buttonName: string): Promise<void> {
        try {
            const btn: WebElement = await this.getButton(id);
            await this.driver.wait(until.elementIsVisible(btn), 10000);
            await btn.click();
        } catch (error) {
            console.error('Error clicking the' + buttonName + 'button:', error);
            throw error;
        }
    }






}

