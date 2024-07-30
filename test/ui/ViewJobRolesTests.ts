import { Builder, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import * as chrome from 'selenium-webdriver/chrome';
import { ViewJobRolesTestsPage } from './ViewJobRolesTestsPage';

describe('View Job Roles Tests', function () {
    this.timeout(50000);
    let driver: WebDriver;

    // Before all tests
    before(async function () {
        driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options())
            .build();
    });

    // After all tests
    after(async function () {
        try {
            await driver.quit();
        } catch (error) {
            console.error('Error quitting the driver:', error);
        }
    });

    // Test for loading the job roles page
    it('Job roles page should load', async function () {
        await ViewJobRolesTestsPage.loadPage(driver);
        await ViewJobRolesTestsPage.assertJobRolesTitle(driver);
    });

    // Test for Facebook link
    it('Facebook link should work', async function () {
        try {
            await ViewJobRolesTestsPage.loadPage(driver);
            await ViewJobRolesTestsPage.clickFacebook(driver);
            await ViewJobRolesTestsPage.assertFacebook(driver);
            await driver.navigate().back();
            await ViewJobRolesTestsPage.assertJobRolesTitle(driver);
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    // Test for Twitter link
    it('Twitter link should work', async function () {
        try {
            await ViewJobRolesTestsPage.loadPage(driver);
            await ViewJobRolesTestsPage.clickTwitter(driver);
            await ViewJobRolesTestsPage.assertTwitter(driver);
            await ViewJobRolesTestsPage.loadPage(driver);
            await ViewJobRolesTestsPage.assertJobRolesTitle(driver);
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    // Test for Instagram link
    it('Instagram link should work', async function () {
        try {
            await ViewJobRolesTestsPage.loadPage(driver);
            await ViewJobRolesTestsPage.clickInstagram(driver);
            await ViewJobRolesTestsPage.assertInstagram(driver);
            await ViewJobRolesTestsPage.loadPage(driver);
            await ViewJobRolesTestsPage.assertJobRolesTitle(driver);
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    // This code also needs to check that the job statuses all say 'open'
    // and eventually will test that the home, jobs, and login buttons work in the header
});
