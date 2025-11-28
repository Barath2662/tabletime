// models/OrderItem.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  order_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true 
  },
  menu_item_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'MenuItem', 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    default: 1 
  },
  status: { 
    type: String, 
    enum: ['pending', 'preparing', 'prepared'], 
    default: 'pending' 
  },
  notes: String
}, {
  timestamps: true
});

export default mongoose.model('OrderItem', orderItemSchema);