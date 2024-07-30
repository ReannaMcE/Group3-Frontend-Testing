import { WebDriver, WebElement, By, until, Builder } from 'selenium-webdriver';
import { expect } from 'chai';
import * as chrome from 'selenium-webdriver/chrome';

export class ViewJobRolesTestsPage {
    private static driver: WebDriver;



    // WebDriver Functions --------------------------------------------------------------------------------
    public static async startDriver(): Promise<void> {
        this.driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options())
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
    private static BASE_URL: string = process.env.UI_TEST_URL || 'https://jptw3amsi2.eu-west-1.awsapprunner.com/jobRoles';

    public static async loadPage(): Promise<void> {
        await this.driver.get(this.BASE_URL);
    }



    // Web Elements --------------------------------------------------------------------------------
    // delete these three when id has been merged !
    public static async FacebookLink(): Promise<WebElement> {
        return this.driver.findElement(By.xpath("//a[@title='https://www.facebook.com/KainosSoftware/?locale=en_GB']"));
    }

    public static async TwitterLink(): Promise<WebElement> {
        return this.driver.findElement(By.xpath("//a[@title='https://x.com/i/flow/login?redirect_after_login=%2FKainosSoftware']"));
    }

    public static async InstagramLink(): Promise<WebElement> {
        return this.driver.findElement(By.xpath("//a[@title='https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fkainossoftware%2F&is_from_rle']"));
    }

    // public static async FacebookLink(): Promise<WebElement> {
    //     return this.driver.findElement(By.id("facebook"));
    // }

    // public static async TwitterLink(): Promise<WebElement> {
    //     return this.driver.findElement(By.id("twitter"));
    // }

    // public static async InstagramLink(): Promise<WebElement> {
    //     return this.driver.findElement(By.id("instagram"));
    // }

    // public static async HomeButton(): Promise<WebElement> {
    //     return this.driver.findElement(By.id("navbarHome"));
    // }

    // public static async LoginButton(): Promise<WebElement> {
    //     return this.driver.findElement(By.id("navbarLogin"));
    // }

    // * this is for the job roles page
    // public static async JobRolesButton(): Promise<WebElement> {
    //     return this.driver.findElement(By.id("navbarJobs"));
    // }

    // public static async JobStatusElement(): Promise<WebElement> {
    //     return this.driver.findElement(By.id("jobStatus"));
    // }

    // public static async HomePageImg(): Promise<WebElement> {
    //     return this.driver.findElement(By.id("homepageBackgroundImage"));
    // }

    // public static async LoginUserTextBox(): Promise<WebElement> {
    //     return this.driver.findElement(By.id("username"));
    // }

    // Click Links --------------------------------------------------------------------------------
    public static async clickFacebook(): Promise<void> {
        try {
            const facebookLink: WebElement = await this.FacebookLink();
            await this.driver.wait(until.elementIsVisible(facebookLink), 10000);
            await facebookLink.click();
        } catch (error) {
            console.error('Error clicking the Facebook link:', error);
            throw error;
        }
    }

    public static async clickTwitter(): Promise<void> {
        try {
            const twitterLink: WebElement = await this.TwitterLink();
            await this.driver.wait(until.elementIsVisible(twitterLink), 10000);
            await twitterLink.click();
        } catch (error) {
            console.error('Error clicking the Twitter link:', error);
            throw error;
        }
    }

    public static async clickInstagram(): Promise<void> {
        try {
            const instagramLink: WebElement = await this.InstagramLink();
            await this.driver.wait(until.elementIsVisible(instagramLink), 10000);
            await instagramLink.click();
        } catch (error) {
            console.error('Error clicking the Instagram link:', error);
            throw error;
        }
    }


    // public static async clickHome(): Promise<void> {
    //     try {
    //         const homeButton: WebElement = await this.HomeButton();
    //         await this.driver.wait(until.elementIsVisible(homeButton), 10000);
    //         await homeButton.click();
    //     } catch (error) {
    //         console.error('Error clicking the home button:', error);
    //         throw error;
    //     }
    // }

    // public static async clickJobs(): Promise<void> {
    //     try {
    //         const jobRolesButton: WebElement = await this.JobRolesButton();
    //         await this.driver.wait(until.elementIsVisible(jobRolesButton), 10000);
    //         await jobRolesButton.click();
    //     } catch (error) {
    //         console.error('Error clicking the jobs button:', error);
    //         throw error;
    //     }
    // }

    // public static async clickLogin(): Promise<void> {
    //     try {
    //         const loginButton: WebElement = await this.LoginButton();
    //         await this.driver.wait(until.elementIsVisible(loginButton), 10000);
    //         await loginButton.click();
    //     } catch (error) {
    //         console.error('Error clicking the login button:', error);
    //         throw error;
    //     }
    // }

    

    // Assertions --------------------------------------------------------------------------------
    public static async assertFacebook(): Promise<void> {
        await this.driver.wait(async () => {
            const currentUrl = await this.driver.getCurrentUrl();
            return currentUrl.includes('facebook.com/KainosSoftware');
        }, 15000);
    }

    public static async assertTwitter(): Promise<void> {
        await this.driver.wait(async () => {
            const currentUrl = await this.driver.getCurrentUrl();
            return currentUrl.includes('x.com');
        }, 15000);
    }

    public static async assertInstagram(): Promise<void> {
        await this.driver.wait(async () => {
            const currentUrl = await this.driver.getCurrentUrl();
            return currentUrl.includes('instagram.com');
        }, 15000);
    }

    // delete this when the id is available and replace with the test below
    public static async assertJobRolesTitle(): Promise<void> {
        const title = By.xpath("//h2[normalize-space()='Available Job Roles']");
        await this.driver.wait(until.elementLocated(title), 10000);
        const elementBack = await this.driver.findElement(title);
        const newTitleText = await elementBack.getText();
        expect(newTitleText).to.equal('Available Job Roles');
    }

    // public static async assertJobRolesTitle(): Promise<void> {
    //     const title = By.id("availableJobRoles");
    //     await this.driver.wait(until.elementLocated(title), 10000);
    //     const elementBack = await this.driver.findElement(title);
    //     const newTitleText = await elementBack.getText();
    //     expect(newTitleText).to.equal('Available Job Roles');
    // }

    // public static async assertJobStatusOpen(): Promise<void> {
    //     const jobStatusElement = await this.JobStatusElement();
    //     const jobStatusText = await jobStatusElement.getText();
    //     expect(jobStatusText).to.equal('Status: open');
    // }

    // public static async assertHomePageImg(): Promise<void> {
    //     await this.driver.wait(async () => {
    //         this.HomePageImg() != null;
    //     }, 15000);
    // }

    // public static async assertLoginPage(): Promise<void> {
    //     await this.driver.wait(async () => {
    //         this.LoginUserTextBox() != null;
    //     }, 15000);
    // }

}
