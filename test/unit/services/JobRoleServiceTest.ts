import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { JobRolesResponse } from "../../../src/models/JobRolesResponse";
import { getJobRoleById, getJobRoles, URL } from "../../../src/services/JobRoleService";
import { JobRole } from "../../../src/models/JobRole";


const testDate = new Date(1721718000000);

const jobRolesResponse: JobRolesResponse = {
    id: 1,
    roleName: "TechLead",
    location: "Belfast",
    capability: "High",
    band: "Microsoft",
    closingDate: testDate,
    status: "open"
}


const jobRole: JobRole = {
  id:1,
  roleName: "TechLead",
  location: "Belfast",
  capability: "High",
  band: "Microsoft",
  closingDate: testDate,
  status: "open",
  description: "Description",
  responsibilities: "Responsibilities",
  jobSpec: "jobSpecLink"
}

const mock = new MockAdapter(axios);

describe('JobRoleService', function () {
    describe('getJobRoles', function () {
      it('should return jobRoles from response', async () => {
        const data = [jobRolesResponse];

        mock.onGet(URL).reply(200, data);

        const results = await getJobRoles();

        expect(results[0].id).to.deep.equal(jobRolesResponse.id);
        expect(results[0].band).to.deep.equal(jobRolesResponse.band);
        expect(results[0].capability).to.deep.equal(jobRolesResponse.capability);
        expect(results[0].closingDate).to.deep.equal(jobRolesResponse.closingDate.toISOString());
        expect(results[0].location).to.deep.equal(jobRolesResponse.location);
        expect(results[0].roleName).to.deep.equal(jobRolesResponse.roleName);
        expect(results[0].status).to.deep.equal(jobRolesResponse.status);
      })

      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet(URL).reply(500);

        try {
          await getJobRoles();
          throw new Error('Error not thrown');
        } catch (e) {
          expect(e.message).to.equal('Failed to get Job Roles');
          return;
        }
      })
    })

    describe('getJobRoleById', function () {

      it('should return a jobRole when axios returns a jobRole', async () => {

        const data = jobRole;

        mock.onGet(URL + "1").reply(200, data);

        const result = await getJobRoleById("1");

        expect(result.id).to.deep.equal(jobRole.id);
        expect(result.band).to.deep.equal(jobRole.band);
        expect(result.capability).to.deep.equal(jobRole.capability);
        expect(result.closingDate).to.deep.equal(jobRole.closingDate.toISOString());
        expect(result.location).to.deep.equal(jobRole.location);
        expect(result.roleName).to.deep.equal(jobRole.roleName);
        expect(result.status).to.deep.equal(jobRole.status);
        expect(result.description).to.deep.equal(jobRole.description);
        expect(result.responsibilities).to.deep.equal(jobRole.responsibilities);
        expect(result.jobSpec).to.deep.equal(jobRole.jobSpec);
      })

      it('should throw Job Role does not exist error when axios returns a jobRole with closed status', async () => {

        const data: JobRole = {
          id:1,
          roleName: "TechLead",
          location: "Belfast",
          capability: "High",
          band: "Microsoft",
          closingDate: testDate,
          status: "closed",
          description: "Description",
          responsibilities: "Responsibilities",
          jobSpec: "jobSpecLink"
        }

        mock.onGet(URL + "1").reply(200, data);

        try {
          await getJobRoleById("1");
        } catch (e) {
          expect(e.message).to.equal('Failed to get Job Role');
          return;
        }
        
      })

      it('should throw Failed to get Job Role error when 500 error returned from axios', async () => {
        mock.onGet(URL + "1").reply(500);

      try {
        await getJobRoleById("1");
      } catch (e) {
        expect(e.message).to.equal('Failed to get Job Role');
        return;
      }

      })

      it('should throw Job Role does not exist error when 404 error returned from axios', async () => {
        mock.onGet(URL + "1").reply(404);

      try {
        await getJobRoleById("1");
      } catch (e) {
        expect(e.message).to.equal('Job Role does not exist');
        return;
      }

      })

    })

})