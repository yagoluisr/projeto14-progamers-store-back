import express from 'express';
import { getProducts,getCategorie } from '../Controllers/productController.js';
import { hasUser } from '../Middlewares/authMiddleware.js';
const router = express.Router();

router.get('/home',hasUser,getCategorie)
router.get('/products',hasUser,getProducts)

export default router;