import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { JobRolesResponse } from "../../../src/models/JobRolesResponse";
import { getJobRoles, URL } from "../../../src/services/JobRoleService";


const testDate = new Date(1721718000000);

const jobRolesResponse: JobRolesResponse = {
    roleName: "TechLead",
    location: "Belfast",
    capability: "High",
    band: "Microsoft",
    closingDate: testDate,
    status: "open"
}

const mock = new MockAdapter(axios);

describe('JobRoleService', function () {
    describe('getJobRoles', function () {
      it('should return jobRoles from response', async () => {
        const data = [jobRolesResponse];

        mock.onGet(URL).reply(200, data);

        const results = await getJobRoles();

        expect(results[0].band).to.deep.equal(jobRolesResponse.band);
        expect(results[0].capability).to.deep.equal(jobRolesResponse.capability);
        expect(results[0].closingDate).to.deep.equal(jobRolesResponse.closingDate.toISOString());
        expect(results[0].location).to.deep.equal(jobRolesResponse.location);
        expect(results[0].roleName).to.deep.equal(jobRolesResponse.roleName);
        expect(results[0].status).to.deep.equal(jobRolesResponse.status);
      })

      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet("http://localhost:8080/api/job-roles").reply(500);

        try {
          await getJobRoles();
        } catch (e) {
          expect(e.message).to.equal('Failed to get Job Roles');
          return;
        }
      })
    })
})