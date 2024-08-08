import { WebElement, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { FooterTestPage } from './FooterTestPage';

export class JobInfoTestPage extends FooterTestPage {
    

    // Web Elements --------------------------------------------------------------------------------
    public static async JobExample(): Promise<WebElement> {
        return this.driver.findElement(By.id("jobRoleNameLink_3"));
    }

    public static async JobTitleBeforeClick(id:string): Promise<string> {
        const jobRole:string = await this.driver.findElement(By.id(id)).getText();
        return jobRole;
    }
    

    public static async JobTitleAfterClick(id:string): Promise<string> {
        const openedJobRole:string = await this.driver.findElement(By.id(id)).getText();
        return openedJobRole;
    }

    

    // Assertions --------------------------------------------------------------------------------
  
    public static async assertJobRolesTitle(): Promise<void> {
        const title = By.id("availableJobRoles");
        await this.driver.wait(until.elementLocated(title), 700000);
        const elementBack = await this.driver.findElement(title);
        const newTitleText = await elementBack.getText();
        expect(newTitleText).to.equal('Available Job Roles');
    }

    public static async assertJobTitleMatches(jobTitleAfterClick:string, jobTitleBeforeClick:string): Promise<void> {
        expect(jobTitleAfterClick).to.equal(jobTitleBeforeClick);
    }

    public static async assertJobHasClosingDate(): Promise<void> {
        const closingDate = By.id("closingDate");
        await this.driver.wait(until.elementLocated(closingDate), 500000);
        const element = await this.driver.findElement(closingDate);
        const text = await element.getText();
        expect(text).to.contain('Closing Date:');
    }

 


    // Click methods --------------------------------------------------------------------------------

    public static async clickJob(id:string): Promise<void> {
            await this.clickButton(id, "job button");
    }


}
