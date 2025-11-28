import express from 'express';
import { getMenuItems, createMenuItem } from '../controllers/menuItemController.js';
import auth from '../middleware/auth.js';
import { authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMenuItems);
router.post('/', auth, authorize(['admin']), createMenuItem);

export default router;