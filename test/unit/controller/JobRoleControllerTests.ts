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
    capability: "High",
    band: "Microsoft",
    closingDate: testDate,
    status: "open"
}

describe('RoleContoller', function () {
    afterEach(() => {
        sinon.restore();
    });

    describe('getJobRoles', function () {
      it('should render view with job roles when job roles returned', async () => {
        const jobRolesList = [jobRolesResponse];

        const stub = sinon.stub(JobRoleService, 'getJobRoles').resolves(jobRolesList);

        const req = {};
        const res = { render: sinon.spy() };

        await RoleController.getAllJobRoles(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any


        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('jobRolesList.html', { baseURL: process.env.AWS_URL || 'http://localhost:3000', roles: jobRolesList })).to.be.true;

        stub.restore;
      });

      it('should render view with error message when error thrown', async () => {
        const errorMessage: string = 'Error message';
        sinon.stub(JobRoleService, 'getJobRoles').rejects(new Error(errorMessage));

        const req = { };
        const res = { render: sinon.spy(), locals: { errormessage: '' } };

        await RoleController.getAllJobRoles(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any

        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('jobRolesList.html')).to.be.true;
        expect(res.locals.errormessage).to.equal(errorMessage);
      });
    });
});