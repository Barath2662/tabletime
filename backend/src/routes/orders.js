// routes/orders.js
import express from 'express';
import { 
  createOrder, 
  getOrders, 
  updateOrderStatus,
  updateOrderItemStatus
} from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getOrders);
router.patch('/:orderId/status', authMiddleware, updateOrderStatus);
router.patch('/order-items/:itemId/status', authMiddleware, updateOrderItemStatus);

export default router;