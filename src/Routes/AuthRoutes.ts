import express from 'express';
import { logout } from '../controllers/AuthController';

const router = express.Router();

router.post('/api/auth/logout', logout);

export default router;
