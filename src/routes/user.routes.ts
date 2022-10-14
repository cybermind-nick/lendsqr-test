import { Router } from 'express';
import { createNewUser, getLoginToken } from '../controllers/user.controller';

const router = Router();

router.post('/register', createNewUser);
router.post('/login', getLoginToken);

export default router;
