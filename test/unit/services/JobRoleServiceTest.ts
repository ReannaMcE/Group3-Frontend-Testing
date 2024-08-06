import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { JobRolesResponse } from "../../../src/models/JobRolesResponse";
import { getJobRoleById, getJobRoles, URL } from "../../../src/services/JobRoleService";


const testDate = new Date(1721718000000);

const jobRolesResponse: JobRolesResponse = {
    id: 1,
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

const mock = new MockAdapter(axios);
const token = "sample-token";

describe('JobRoleService', function () {
    describe('getJobRoles', function () {
      it('should return jobRoles from response', async () => {
        const data = [jobRolesResponse];
        

        mock.onGet(URL).reply(200, data);

        const results = await getJobRoles(token);

        expect(results[0].id).to.deep.equal(jobRolesResponse.id);
        expect(results[0].bandName).to.deep.equal(jobRolesResponse.bandName);
        expect(results[0].capabilityName).to.deep.equal(jobRolesResponse.capabilityName);
        expect(results[0].closingDate).to.deep.equal(jobRolesResponse.closingDate.toISOString());
        expect(results[0].location).to.deep.equal(jobRolesResponse.location);
        expect(results[0].roleName).to.deep.equal(jobRolesResponse.roleName);
        expect(results[0].status).to.deep.equal(jobRolesResponse.status);
      })

      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet(URL).reply(500);

        try {
          await getJobRoles(token);
          throw new Error('Error not thrown');
        } catch (e) {
          expect(e.message).to.equal('Failed to get Job Roles');
          return;
        }
      })
    })

    describe('getJobRoleById', function () {

      it('should return a jobRole when axios returns a jobRole', async () => {

        const data = jobRolesResponse;

        mock.onGet(URL + "1").reply(200, data);

        const result = await getJobRoleById("1");

        expect(result.id).to.deep.equal(jobRolesResponse.id);
        expect(result.bandName).to.deep.equal(jobRolesResponse.bandName);
        expect(result.capabilityName).to.deep.equal(jobRolesResponse.capabilityName);
        expect(result.closingDate).to.deep.equal(jobRolesResponse.closingDate.toISOString());
        expect(result.location).to.deep.equal(jobRolesResponse.location);
        expect(result.roleName).to.deep.equal(jobRolesResponse.roleName);
        expect(result.status).to.deep.equal(jobRolesResponse.status);
        expect(result.description).to.deep.equal(jobRolesResponse.description);
        expect(result.responsibilities).to.deep.equal(jobRolesResponse.responsibilities);
        expect(result.jobSpec).to.deep.equal(jobRolesResponse.jobSpec);
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