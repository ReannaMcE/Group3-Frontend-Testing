import { JobInfoTestPage } from './JobInfoTestPage';
import { basepage } from './basepage';

describe('View Job Info Tests', function () {
    this.timeout(70000);
    const page: string = process.env.UI_TEST_URL || 'https://jptw3amsi2.eu-west-1.awsapprunner.com/jobRoles';

    before(async function () {
        await basepage.startDriver();
    });

    after(async function () {
        await JobInfoTestPage.quitDriver();
    });

    it('Job roles page should load', async function () {
        await JobInfoTestPage.loadPage(page);
        await JobInfoTestPage.assertJobRolesTitle();
    });

    it('Job should load information when clicked', async function name() {
        try {
            await JobInfoTestPage.loadPage(page);
            await JobInfoTestPage.clickJob("jobRoleNameLink_3");
            await JobInfoTestPage.assertJobHasClosingDate();
        } catch (error) {
            console.error('Test failed: ', error);
            throw error;
        }
    })

    it('Job title matches when job is clicked', async function () { 
        try {
            await JobInfoTestPage.loadPage(page);
            const jobTitleBeforeClick:string = await JobInfoTestPage.JobTitleBeforeClick("jobRoleNameLink_3");
            await JobInfoTestPage.clickJob("jobRoleNameLink_3");
            const jobAfterClick:string = await JobInfoTestPage.JobTitleAfterClick("jobRoleName");
            await JobInfoTestPage.assertJobTitleMatches(jobAfterClick, jobTitleBeforeClick);
        
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

});
