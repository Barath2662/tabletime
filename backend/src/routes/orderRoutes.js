// routes/orderRoutes.js
import express from 'express';
import { 
  createOrder, 
  getOrders, 
  getOrderById, 
  updateOrderStatus,
  getOrdersByTable,
  updateOrderItemStatus
} from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/', createOrder); // Allow customers to place orders without authentication
router.get('/table/:tableNumber', getOrdersByTable); // Allow customers to view their table orders

// Protected routes (require authentication)
router.get('/', authMiddleware, getOrders);
router.get('/:id', authMiddleware, getOrderById);
router.patch('/:id/status', authMiddleware, updateOrderStatus);
router.patch('/:orderId/items/:itemId/status', authMiddleware, updateOrderItemStatus);

export default router;