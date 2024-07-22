import axios, { AxiosResponse } from "axios";
import { JobRoles } from "../models/JobRoles"
import { JobRolesResponse } from "../models/JobRolesResponse";

export const getJobRoles = async (): Promise<JobRolesResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/job-roles");

        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get Job Roles');
    }
}