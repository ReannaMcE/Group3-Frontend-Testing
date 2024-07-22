import axios, { AxiosResponse } from "axios";
import { JobRoles } from "../models/JobRoles"

export const getJobRoles = async (): Promise<JobRoles> => {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/job-roles");

        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get Job Roles');
    }
}