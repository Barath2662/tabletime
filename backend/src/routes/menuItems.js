// routes/menuItems.js
import express from 'express';
import { getMenuItems, getMenuItem } from '../controllers/menuItemController.js';

const router = express.Router();

router.get('/', getMenuItems);
router.get('/:id', getMenuItem);

export default router;