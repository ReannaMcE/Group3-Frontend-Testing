import { ViewJobRolesTestsPage } from '../ui/ViewJobRolesTestsPage';
import { basepage } from './basepage';
import { LoginTestsPage } from './LoginSystemTestsPage';
import { By, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Login System Test', function () {
    this.timeout(70000);
    const page: string = process.env.UI_TEST_LOGIN || 'https://jptw3amsi2.eu-west-1.awsapprunner.com/loginForm';

    before(async function () {
        await basepage.startDriver();
    });

    after(async function () {
        await LoginTestsPage.quitDriver();
    });

    it('Login page should load', async function () {
        await LoginTestsPage.loadPage(page);
        const loginForm = await LoginTestsPage.driver.findElement(By.id('submit'));
        expect(await loginForm.isDisplayed()).to.be.true;
    });

    it('Login page should not login with incorrect details', async function () {
        await LoginTestsPage.loadPage(page);
        const wrongUsername = 'wronguser';
        const wrongPassword = 'wrongpassword';

        await LoginTestsPage.enterUsername(wrongUsername);
        await LoginTestsPage.enterPassword(wrongPassword);
        await LoginTestsPage.clickLogin();

        const errorMessage = await LoginTestsPage.driver.findElement(By.id('errorMessage')).getText(); 
        expect(errorMessage).to.equal('Failed to Login');
    });

    it('Login page should login and logout successfully with correct details', async function () {
        await LoginTestsPage.loadPage(page);
        const correctUsername = 'admin';
        const correctPassword = 'admin';
    
        await LoginTestsPage.enterUsername(correctUsername);
        await LoginTestsPage.enterPassword(correctPassword);
        await LoginTestsPage.clickLogin();
    
        await LoginTestsPage.clickButton('navbarJobs', 'job roles');
        await LoginTestsPage.assertLogin();
    
        await LoginTestsPage.clickButton('navbarLogin', 'logout');
        
        const loginForm = await LoginTestsPage.driver.wait(until.elementLocated(By.id('submit')), 100000);
        expect(await loginForm.isDisplayed()).to.be.true;
    });
    
});
