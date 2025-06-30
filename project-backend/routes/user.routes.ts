import express from 'express';
import { createUser, getUser } from '../controllers/user.controller';

const router = express.Router();

router.post('/', createUser);      // POST /api/users/
router.get('/:uid', getUser);      // GET /api/users/uid123

export default router;
