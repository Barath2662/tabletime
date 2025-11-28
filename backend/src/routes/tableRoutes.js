// routes/tableRoutes.js
import express from 'express';
import { createTable, getTable } from '../controllers/tableController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Create a new table (protected - admin only)
router.post('/', authMiddleware, createTable);

// Get table by number (public - needed for customer ordering)
router.get('/:tableNumber', getTable);

export default router;