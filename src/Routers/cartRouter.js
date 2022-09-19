import express from 'express';
import { purchases } from '../Controllers/cartController.js';


const router = express.Router();

router.post('/cart', purchases)

export default router;