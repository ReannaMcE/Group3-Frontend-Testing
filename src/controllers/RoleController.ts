import express from "express";
import { getJobRoles } from "../services/JobRoleService"

export const getHomePage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('homepage.html');
}
 
export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('jobRolesList.html', {roles: await getJobRoles() });
}

