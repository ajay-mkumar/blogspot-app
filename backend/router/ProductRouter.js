import express from 'express'
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, updateProduct } from '../controller/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router=express.Router();

router.route('/').get(getProducts).post(protect,admin,createProduct);
router.route('/:id',).get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct);
router.route('/:id/review').post(protect,createProductReview)


export default router