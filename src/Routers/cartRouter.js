import express from 'express';
import { purchases } from '../Controllers/cartController.js';


const router = express.Router();

router.post('/carrinho', purchases)

export default router;