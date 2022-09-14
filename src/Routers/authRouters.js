import express from 'express';
import { signIn } from '../Controllers/authController.js';


const router = express.Router();

router.get('/sign-up', signIn);

export default router;