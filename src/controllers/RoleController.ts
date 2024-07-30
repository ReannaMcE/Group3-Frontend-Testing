import express from "express";
import { getJobRoleById, getJobRoles } from "../services/JobRoleService"

export const getHomePage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('homepage.html');
}
 
export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRolesList.html', { roles: await getJobRoles() });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobRolesList.html');
    }
}

export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRoleDetail.html', { jobRole: await getJobRoleById(req.params.id) });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobRolesList.html');
    }
};