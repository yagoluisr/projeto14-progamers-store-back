import express from 'express';
import { signUp, signIn } from '../Controllers/authController.js';


const router = express.Router();

router.post('/sign-up', signUp);
router.post('/', signIn);

export default router;