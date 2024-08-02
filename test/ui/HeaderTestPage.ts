import { WebElement, By, until } from 'selenium-webdriver';
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

    






}

