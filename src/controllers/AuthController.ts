import express from "express";
import { getToken } from "../services/AuthService";

export const getLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('loginForm.html');
}

export const postLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        req.session.token = await getToken(req.body);
        res.redirect('/homepage');
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('loginForm.html', { ...req.body, errormessage: res.locals.errormessage });
    }
}

export const logout = async (req: express.Request, res: express.Response): Promise<void> => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send('Failed to log out');
        } else {
            res.redirect(200,'/loginForm');    
        }
    });
};