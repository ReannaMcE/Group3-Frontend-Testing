import * as JobRoleService from "../../../src/services/JobRoleService";
import { expect } from 'chai';
import { JobRolesResponse } from "../../../src/models/JobRolesResponse";
import sinon from 'sinon';
import * as RoleController from "../../../src/controllers/RoleController";


const testDate = new Date(1721718000000);

const jobRolesResponse: JobRolesResponse = {
    id:1,
    roleName: "TechLead",
    location: "Belfast",
    capabilityName: "engineering",
    bandName: "placement",
    closingDate: testDate,
    status: "open",
    description: "Description",
    responsibilities: "Responsibilities",
    jobSpec: "jobSpecLink"
}

describe('RoleContoller', function () {
    afterEach(() => {
        sinon.restore();
    });

    describe('getAllJobRoles', function () {
      it('should render view with job roles when job roles returned', async () => {
        const jobRolesList = [jobRolesResponse];

        const stub = sinon.stub(JobRoleService, 'getJobRoles').resolves(jobRolesList);

        const req = { headers: { authorization: 
          'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjI5Mzc0NjAsImV4cCI6MTcyMjk2NjI2MCwiUm9sZSI6MSwic3ViIjoiYWRtaW4iLCJpc3MiOiJBZ2lsZSBhbmQgRnJhZ2lsZSJ9.1a48y8-1s1aHlbe79m3loZdt1iOBJxLLymNcq4FM198' } };
        const res = { render: sinon.spy(), locals: {} };

        await RoleController.getAllJobRoles(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any

        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('jobRolesList.html', { baseURL: process.env.AWS_URL || 'http://localhost:3000', roles: jobRolesList })).to.be.true;

        stub.restore;
      });

      it('should render view with error message when error thrown', async () => {
        const errorMessage: string = 'Error message';
        sinon.stub(JobRoleService, 'getJobRoles').rejects(new Error(errorMessage));

        const req = { headers: { authorization: 
          'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjI5Mzc0NjAsImV4cCI6MTcyMjk2NjI2MCwiUm9sZSI6MSwic3ViIjoiYWRtaW4iLCJpc3MiOiJBZ2lsZSBhbmQgRnJhZ2lsZSJ9.1a48y8-1s1aHlbe79m3loZdt1iOBJxLLymNcq4FM198' } };
        const res = { render: sinon.spy(), locals: { errormessage: '' } };

        await RoleController.getAllJobRoles(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any

        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('jobRolesList.html')).to.be.true;
        expect(res.locals.errormessage).to.equal(errorMessage);
      });
    });

    describe('getSingleJobRole', function () {

      it('should render view with a single job role when job role is returned', async () => {

        const returnJobRole = jobRolesResponse;

        const stub = sinon.stub(JobRoleService, 'getJobRoleById').resolves(returnJobRole);

        const req = { params: 1 };
        const res = { render: sinon.spy() };

        await RoleController.getSingleJobRole(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any


        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('jobRoleDetail.html', { baseURL: process.env.AWS_URL || 'http://localhost:3000', jobRole: returnJobRole })).to.be.true;

        stub.restore;
      });

      it('should render view with error message when error thrown', async () => {

        const errorMessage: string = 'Error message';

        sinon.stub(JobRoleService, 'getJobRoleById').rejects(new Error(errorMessage));

        const req = { params: 1 };
        const res = { render: sinon.spy(), locals: { errormessage: '' } };

        await RoleController.getSingleJobRole(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any

        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('jobRolesList.html')).to.be.true;
        expect(res.locals.errormessage).to.equal(errorMessage);
      });


    });
});