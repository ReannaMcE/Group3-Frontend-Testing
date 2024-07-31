import express from "express";
import { getJobRoles } from "../services/JobRoleService"
import axios from "axios";

axios.defaults.baseURL = process.env.AWS_URL || 'http://localhost:3000';

const baseURL = axios.defaults.baseURL

export const getHomePage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('homepage.html', {baseURL} );
}
 
export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRolesList.html', { baseURL, roles: await getJobRoles() });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobRolesList.html');
    }
};