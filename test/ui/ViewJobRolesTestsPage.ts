import { WebElement, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { basepage } from './basepage';

export class ViewJobRolesTestsPage extends basepage {
    

    // Web Elements --------------------------------------------------------------------------------
    public static async JobStatusElement(): Promise<WebElement> {
        //return this.driver.findElement(By.id("jobStatus"));
        const value:string = "jobStatus";
        return this.driver.findElement(By.css(`[id*='${value}']`));
    }

    public static async LoginUserTextBox(): Promise<WebElement> {
        return this.driver.findElement(By.id("username"));
    }

    

    // Assertions --------------------------------------------------------------------------------
  
    public static async assertJobRolesTitle(): Promise<void> {
        const title = By.id("availableJobRoles");
        await this.driver.wait(until.elementLocated(title), 30000);
        const elementBack = await this.driver.findElement(title);
        const newTitleText = await elementBack.getText();
        expect(newTitleText).to.equal('Available Job Roles');
    }

    public static async assertJobStatusOpen(): Promise<void> {
        const jobStatusElement = await this.JobStatusElement();
        const jobStatusText = await jobStatusElement.getText();
        expect(jobStatusText).to.equal('Status: open');
    }

    public static async assertLoginPage(): Promise<void> {
        await this.driver.wait(async () => {
            this.LoginUserTextBox() != null;
        }, 15000);
    }

}
