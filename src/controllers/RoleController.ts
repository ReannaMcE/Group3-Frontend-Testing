import express from "express";
import { getJobRoles } from "../services/JobRoleService"
import axios from "axios";

axios.defaults.baseURL = process.env.AWS_URL || 'http://localhost:8080'

export const URL: string = "/";

export const base = URL;

export const getHomePage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('homepage.html', {base} );
}
 
export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRolesList.html', { base, roles: await getJobRoles() });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobRolesList.html');
    }
};