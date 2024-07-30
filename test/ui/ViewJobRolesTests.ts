import { ViewJobRolesTestsPage } from './ViewJobRolesTestsPage';

describe('View Job Roles Tests', function () {
    this.timeout(50000);

    before(async function () {
        await ViewJobRolesTestsPage.startDriver();
    });

    after(async function () {
        await ViewJobRolesTestsPage.quitDriver();
    });

    it('Job roles page should load', async function () {
        await ViewJobRolesTestsPage.loadPage();
        await ViewJobRolesTestsPage.assertJobRolesTitle();
    });

    it('Facebook link should work', async function () {
        try {
            await ViewJobRolesTestsPage.loadPage();
            await ViewJobRolesTestsPage.clickFacebook();
            await ViewJobRolesTestsPage.assertFacebook();
            await ViewJobRolesTestsPage.getDriver().navigate().back();
            await ViewJobRolesTestsPage.assertJobRolesTitle();
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    it('Twitter link should work', async function () {
        try {
            await ViewJobRolesTestsPage.loadPage();
            await ViewJobRolesTestsPage.clickTwitter();
            await ViewJobRolesTestsPage.assertTwitter();
            await ViewJobRolesTestsPage.loadPage();
            await ViewJobRolesTestsPage.assertJobRolesTitle();
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    it('Instagram link should work', async function () {
        try {
            await ViewJobRolesTestsPage.loadPage();
            await ViewJobRolesTestsPage.clickInstagram();
            await ViewJobRolesTestsPage.assertInstagram();
            await ViewJobRolesTestsPage.loadPage();
            await ViewJobRolesTestsPage.assertJobRolesTitle();
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    // it('Job status should always be open', async function () {
    //     await ViewJobRolesTestsPage.loadPage();
    //     await ViewJobRolesTestsPage.assertJobStatusOpen();
    // });

    // it('Home button should work', async function () {
    //     try {
    //         await ViewJobRolesTestsPage.loadPage();
    //         await ViewJobRolesTestsPage.clickHome();
    //         await ViewJobRolesTestsPage.assertHomePageImg();
    //         await ViewJobRolesTestsPage.loadPage();
    //         await ViewJobRolesTestsPage.assertJobRolesTitle();
    //     } catch (error) {
    //         console.error('Test failed:', error);
    //         throw error;
    //     }
    // });

    // it('Jobs button should work', async function () {
    //     try {
    //         await ViewJobRolesTestsPage.loadPage();
    //         await ViewJobRolesTestsPage.clickJobs();
    //         await ViewJobRolesTestsPage.assertJobRolesTitle();
    //     } catch (error) {
    //         console.error('Test failed:', error);
    //         throw error;
    //     }
    // });

    // it('Login button should work', async function () {
    //     try {
    //         await ViewJobRolesTestsPage.loadPage();
    //         await ViewJobRolesTestsPage.clickLogin();
    //         await ViewJobRolesTestsPage.assertLoginPage();
    //         await ViewJobRolesTestsPage.loadPage();
    //         await ViewJobRolesTestsPage.assertJobRolesTitle();
    //     } catch (error) {
    //         console.error('Test failed:', error);
    //         throw error;
    //     }
    // });

});
