// controllers/menuItemController.js
import MenuItem from '../models/MenuItem.js';

export const getMenuItems = async (req, res) => {
  try {
    const { available } = req.query;
    const query = {};
    
    if (available === 'true') {
      query.available = true;
    }

    console.log('Query params:', { available });
    console.log('MongoDB query:', query);
    
    const menuItems = await MenuItem.find(query).sort({ category: 1, name: 1 });
    console.log('Found items:', menuItems.length);
    
    res.json(menuItems);
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    console.error('Get menu item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};