import { WebElement, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { basepage } from '../ui/basepage';

export class LoginTestsPage extends basepage { 

    // Web Elements --------------------------------------------------------------------------------

    public static async HomePageImg(): Promise<WebElement> {
        return this.driver.findElement(By.id("homepageBackgroundImage"));
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

    public static async getLogoutButton(): Promise<WebElement> {
        return this.driver.findElement(By.id('navbarLogin'));
    }

    // Assertions --------------------------------------------------------------------------------
  
    public static async assertLogin(): Promise<void> {
        const title = By.id("availableJobRoles");
        await this.driver.wait(until.elementLocated(title), 700000);
        const elementBack = await this.driver.findElement(title);
        const newTitleText = await elementBack.getText();
        expect(newTitleText).to.equal('Available Job Roles');
    }

    public static async enterUsername(username: string): Promise<void> {
        const element = await this.LoginUserEmail();
        await element.sendKeys(username);
    }

    public static async enterPassword(password: string): Promise<void> {
        const element = await this.LoginUserPassword();
        await element.sendKeys(password);
    }

    public static async clickLogin(): Promise<void> {
        const element = await this.getLoginButton();
        await element.click();
    }

   
}