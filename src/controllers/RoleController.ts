import express from "express";
import { getJobRoles } from "../services/JobRoleService"
import axios from "axios";

const instance = axios.create({
    baseURL: process.env.AWS_URL || 'http://localhost:8080',
  });

export const getHomePage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('homepage.html', {instance});
}
 
export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRolesList.html', { instance, roles: await getJobRoles() });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobRolesList.html');
    }
};