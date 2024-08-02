import { ViewJobRolesTestsPage } from '../ui/ViewJobRolesTestsPage';
import { HeaderTestPage } from '../ui/HeaderTestPage';
import { FooterTestPage } from '../ui/FooterTestPage';
import { basepage } from './basepage';

describe('View Job Roles Tests', function () {
    this.timeout(70000);
    const page:string = 'https://jptw3amsi2.eu-west-1.awsapprunner.com/jobRoles';

    before(async function () {
        await basepage.startDriver();
        //FooterTestPage.driver = ViewJobRolesTestsPage.getDriver(); // the footer test uses the same driver
        //HeaderTestPage.driver = ViewJobRolesTestsPage.getDriver(); // the header test uses the same driver
    });

    after(async function () {
        await ViewJobRolesTestsPage.quitDriver();
    });

    it('Job roles page should load', async function () {
        await ViewJobRolesTestsPage.loadPage(page);
        await ViewJobRolesTestsPage.assertJobRolesTitle();
    });

    it('Footer links should work', async function () {
        try {
            await ViewJobRolesTestsPage.loadPage(page);
            await FooterTestPage.clickFacebook();
            await FooterTestPage.assertFBAndGoBack(page);
            await FooterTestPage.clickTwitter();
            await FooterTestPage.assertTwitterAndGoBack(page);
            await FooterTestPage.clickInstagram();
            await FooterTestPage.assertIGAndGoBack(page);
            await ViewJobRolesTestsPage.assertJobRolesTitle();
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    it('Job status should always be open', async function () {
        await ViewJobRolesTestsPage.loadPage(page);
        await ViewJobRolesTestsPage.assertJobStatusOpen();
    });

    it('Header buttons should work', async function () {
        try {
            await ViewJobRolesTestsPage.loadPage(page);
            await HeaderTestPage.clickButton('navbarHome', 'home');

            await HeaderTestPage.clickButton('navbarJobs', 'job roles');
            await ViewJobRolesTestsPage.assertJobRolesTitle();
        
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    

});
