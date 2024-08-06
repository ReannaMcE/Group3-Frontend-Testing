import express from "express";
import { getJobRoleById, getJobRoles } from "../services/JobRoleService"

const baseURL = process.env.AWS_URL || 'http://localhost:3000';

export const getHomePage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('homepage.html', {baseURL} );
}
 
export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRolesList.html', { baseURL, roles: await getJobRoles(req.session.token) });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobRolesList.html');
    }
}

export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRoleDetail.html', { baseURL, jobRole: await getJobRoleById(req.params.id) });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobRolesList.html');
    }
};