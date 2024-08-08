import { ViewJobRolesTestsPage } from '../ui/ViewJobRolesTestsPage';
import { basepage } from './basepage';

describe('View Job Roles Tests', function () {
    this.timeout(1000000);
    const page: string = process.env.UI_TEST_URL || 'https://jptw3amsi2.eu-west-1.awsapprunner.com/jobRoles';

    before(async function () {
        await basepage.startDriver();
    });

    after(async function () {
        await ViewJobRolesTestsPage.quitDriver();
    });

    it('Job roles page should load', async function () {
        await ViewJobRolesTestsPage.loadPage(page);
        await ViewJobRolesTestsPage.assertLoginShows();
        await ViewJobRolesTestsPage.login('admin', 'admin');
        await ViewJobRolesTestsPage.loadPage(page);
        await ViewJobRolesTestsPage.assertJobRolesTitle();
    });

    it('Footer links should work', async function () {
        try {
            await ViewJobRolesTestsPage.loadPage(page);
            await ViewJobRolesTestsPage.assertLoginShows();
            await ViewJobRolesTestsPage.login('admin', 'admin');
            await ViewJobRolesTestsPage.loadPage(page);
            await ViewJobRolesTestsPage.clickFacebook();
            await ViewJobRolesTestsPage.assertFBAndGoBack(page);
            await ViewJobRolesTestsPage.clickTwitter();
            await ViewJobRolesTestsPage.assertTwitterAndGoBack(page);
            await ViewJobRolesTestsPage.clickInstagram();
            await ViewJobRolesTestsPage.assertIGAndGoBack(page);
            await ViewJobRolesTestsPage.assertJobRolesTitle();
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    it('Job status should always be open', async function () {
        await ViewJobRolesTestsPage.loadPage(page);
        await ViewJobRolesTestsPage.assertLoginShows();
        await ViewJobRolesTestsPage.login('admin', 'admin');
        await ViewJobRolesTestsPage.loadPage(page);
        await ViewJobRolesTestsPage.assertJobStatusOpen();
    });

    it('Header buttons should work', async function () {
        try {
            await ViewJobRolesTestsPage.loadPage(page);
            await ViewJobRolesTestsPage.assertLoginShows();
            await ViewJobRolesTestsPage.login('admin', 'admin');
            await ViewJobRolesTestsPage.loadPage(page);
            await ViewJobRolesTestsPage.clickButton('navbarHome', 'home');

            await ViewJobRolesTestsPage.clickButton('navbarJobs', 'job roles');
            await ViewJobRolesTestsPage.assertJobRolesTitle();
        
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    

});
