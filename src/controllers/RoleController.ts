import express from "express";
import { getJobRoles } from "../services/JobRoleService"
import axios from "axios";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:3000';

export const URL: string = "/";

export const getHomePage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('homepage.html', {URL});
}
 
export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRolesList.html', { URL, roles: await getJobRoles() });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobRolesList.html');
    }
};