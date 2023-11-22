import { Router } from 'express';
import usersService from './users.service.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const router = Router();

router.post('/registration', usersService.registration);
router.post('/login', usersService.login);

router.get('/auth', authMiddleware, usersService.auth);

export default router;
