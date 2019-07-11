import { Router } from 'express';
import User from '../controllers/user.controller';
import isAuthenticated from '../utils/isAuthenticated';

const router = new Router();

router.post('/auth/signup', User.createUser);
router.post('/auth/signin', isAuthenticated, User.loginUser);

export default router;
