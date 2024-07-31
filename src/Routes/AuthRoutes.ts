import express from 'express';
import { getLoginForm, logout, postLoginForm } from '../controllers/AuthController';

const router = express.Router();

router.post('/api/auth/logout', logout);
router.get('/loginForm', getLoginForm);
router.post('/loginForm', postLoginForm);

export default router;
