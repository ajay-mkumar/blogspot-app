import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js';
import { addOrderedItems, getMyOrders, getOrderById, getOrders, updateOrderToDelivered, updateOrderToPaid } from '../controller/orderController.js';

const router=express.Router();

router.route('/').post(protect,addOrderedItems).get(protect,admin,getOrders);
router.route('/myorders').get(protect,getMyOrders);
router.route('/:id').get(protect,getOrderById);
router.route('/:id/pay').put(protect,updateOrderToPaid);
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered);

export default router;