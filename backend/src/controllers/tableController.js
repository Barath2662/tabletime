import Table from '../models/Table.js';

export const createTable = async (req, res) => {
  console.log('=== CREATE TABLE REQUEST ===');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  
  try {
    const { tableNumber, capacity = 4, status = 'available' } = req.body;
    console.log('Parsed values:', { tableNumber, capacity, status });
    
    console.log('Checking if table exists...');
    let table = await Table.findOne({ tableNumber });
    if (table) {
      console.log('Table already exists:', table);
      return res.status(400).json({ message: 'Table already exists' });
    }

    console.log('Creating new table...');
    table = new Table({ tableNumber, capacity, status });
    console.log('Table instance created:', table);
    
    await table.save();
    console.log('Table saved successfully');
    res.status(201).json(table);
    
  } catch (error) {
    console.error('=== ERROR DETAILS ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error codeName:', error.codeName);
    console.error('Error errors:', error.errors);
    console.error('Full error:', error);
    
    res.status(500).json({ 
      message: 'Server error',
      error: error.message,
      name: error.name,
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        code: error.code,
        codeName: error.codeName,
        errors: error.errors
      })
    });
  }
};

export const getTable = async (req, res) => {
  try {
    const { tableNumber } = req.params;
    console.log('Looking for table:', tableNumber);
    
    const table = await Table.findOne({ tableNumber });
    if (!table) {
      console.log('Table not found');
      return res.status(404).json({ message: 'Table not found' });
    }
    
    console.log('Table found:', table);
    res.json(table);
  } catch (error) {
    console.error('Error in getTable:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message
    });
  }
};