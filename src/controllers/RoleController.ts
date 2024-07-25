import express from "express";
import { getJobRoles } from "../services/JobRoleService"

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRolesList.html', { roles: await getJobRoles() });
        console.log(await getJobRoles())
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobRolesList.html');
    }
};