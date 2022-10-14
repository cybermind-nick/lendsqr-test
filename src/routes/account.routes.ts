import { Router } from 'express';
import {
  // createAccount,
  fundUserAccount,
  transferToAnotherAccount,
  withdrawFromUserAccount
} from '../controllers/account.controller';
import { authenticate } from '../middleware/middleware';

const router = Router();

// router.post('/', authenticate, createAccount);
router.post('/fund', authenticate, fundUserAccount);
router.post('/withdraw', authenticate, withdrawFromUserAccount);
router.post('/transfer', authenticate, transferToAnotherAccount);

export default router;
