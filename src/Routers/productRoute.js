import express from 'express';
import { getProducts } from '../Controllers/productController.js';
import { hasUser } from '../Middlewares/authMiddleware.js';
const router = express.Router();

router.get('/home',hasUser,getProducts)


export default router;