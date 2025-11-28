// routes/tables.js
import express from 'express';
import { getTableByNumber } from '../controllers/tableController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/:tableNumber', authMiddleware, getTableByNumber);

export default router;