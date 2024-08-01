import { WebElement, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { basepage } from '../ui/basepage';

export class ViewJobRolesTestsPage extends basepage {
    

    // Web Elements --------------------------------------------------------------------------------
    public static async JobStatusElement(): Promise<WebElement> {
        return this.driver.findElement(By.id("jobStatus"));
    }

    public static async HomePageImg(): Promise<WebElement> {
        return this.driver.findElement(By.xpath("//img[@id='homepageBackgroundImage']"));
    }

    public static async LoginUserTextBox(): Promise<WebElement> {
        return this.driver.findElement(By.id("username"));
    }

    

    // Assertions --------------------------------------------------------------------------------
  
    public static async assertJobRolesTitle(): Promise<void> {
        const title = By.xpath("//h2[normalize-space()='Available Job Roles']");
        await this.driver.wait(until.elementLocated(title), 60000);
        const elementBack = await this.driver.findElement(title);
        const newTitleText = await elementBack.getText();
        expect(newTitleText).to.equal('Available Job Roles');
    }

    public static async assertJobStatusOpen(): Promise<void> {
        const jobStatusElement = await this.JobStatusElement();
        const jobStatusText = await jobStatusElement.getText();
        expect(jobStatusText).to.equal('Status: open');
    }

    public static async assertHomePageImg(): Promise<void> {
        // Wait for the image to be located
        await ViewJobRolesTestsPage.driver.wait(until.elementLocated(this.HomePageImg), 10000);
        
        // Find the image element
        const imageElement = await ViewJobRolesTestsPage.driver.findElement(this.HomePageImg);
        
        // Ensure the image is displayed
        const isDisplayed = await imageElement.isDisplayed();
        
        // Log and assert the image is displayed
        console.log('Image is displayed:', isDisplayed);
        expect(isDisplayed).to.be.true;

    }

    public static async assertLoginPage(): Promise<void> {
        await this.driver.wait(async () => {
            this.LoginUserTextBox() != null;
        }, 15000);
    }

}
