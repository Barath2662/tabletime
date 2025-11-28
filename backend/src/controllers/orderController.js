// controllers/orderController.js
import Order from '../models/Order.js';
import Table from '../models/Table.js';
import MenuItem from '../models/MenuItem.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { tableNumber, items, total, customer_name, customer_phone } = req.body;
    const userId = req.user?.id; // Make user ID optional

    // Check if table exists
    const table = await Table.findOne({ tableNumber });
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    // Validate required fields for customer orders
    if (!customer_name || !customer_phone) {
      return res.status(400).json({ message: 'Customer name and phone are required' });
    }

    // Validate menu items and get their prices
    const menuItems = await MenuItem.find({ _id: { $in: items.map(i => i.menuItem) } });
    if (menuItems.length !== items.length) {
      return res.status(400).json({ message: 'One or more menu items are invalid' });
    }

    // Add prices to order items
    const orderItems = items.map(item => ({
      menuItem: item.menuItem,
      quantity: item.quantity,
      price: menuItems.find(mi => mi._id.toString() === item.menuItem.toString())?.price || 0
    }));

    // Calculate total if not provided
    const orderTotal = total || orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create new order
    const order = new Order({
      tableNumber,
      items: orderItems,
      total: orderTotal,
      user: userId || null,
      customer_name,
      customer_phone,
      status: 'pending'
    });

    await order.save();
    
    // Update table status
    table.status = 'occupied';
    await table.save();

    // Populate the order details for the response
    const populatedOrder = await Order.findById(order._id)
      .populate('items.menuItem', 'name price')
      .populate('user', 'username');

    // Emit WebSocket event for real-time updates
    if (global.io) {
      global.io.emit('order_created', populatedOrder);
    }

    res.status(201).json(populatedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      message: 'Error creating order',
      error: error.message 
    });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    
    if (status) {
      // Handle comma-separated status values (e.g., 'pending,preparing')
      const statusArray = status.split(',').map(s => s.trim());
      if (statusArray.length > 1) {
        filter.status = { $in: statusArray };
      } else {
        filter.status = status;
      }
    }

    const orders = await Order.find(filter)
      .populate('items.menuItem', 'name price category')
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.menuItem', 'name price')
      .populate('user', 'username');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('items.menuItem', 'name price category');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // If order is completed, free up the table
    if (status === 'completed' || status === 'cancelled') {
      await Table.findOneAndUpdate(
        { tableNumber: order.tableNumber },
        { status: 'available' }
      );
    }

    // Emit WebSocket event for real-time updates
    if (global.io) {
      global.io.emit('order_update', { orderId: id, status, order });
    }

    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
};

// Get orders by table number
export const getOrdersByTable = async (req, res) => {
  try {
    const { tableNumber } = req.params;
    
    const orders = await Order.find({ tableNumber })
      .populate('items.menuItem', 'name price category')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching table orders:', error);
    res.status(500).json({ message: 'Error fetching table orders' });
  }
};

// Update order item status
export const updateOrderItemStatus = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const item = order.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Order item not found' });
    }

    item.status = status;
    await order.save();

    // Check if all items are prepared
    const allItemsPrepared = order.items.every(i => i.status === 'prepared');
    if (allItemsPrepared && order.status === 'preparing') {
      order.status = 'prepared';
      await order.save();
    }

    // Emit WebSocket event for real-time updates
    if (global.io) {
      global.io.emit('order_item_update', { orderId, itemId, status });
    }

    const populatedOrder = await Order.findById(orderId)
      .populate('items.menuItem', 'name price category');

    res.json(populatedOrder);
  } catch (error) {
    console.error('Error updating order item status:', error);
    res.status(500).json({ message: 'Error updating order item status' });
  }
};