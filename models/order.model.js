import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: {
    type: [{
      productId: { type: String, required: true },
      quantity: { type: Number, required: true }
    }],
    required: true
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  shippingAddress: {
    type: String,
    maxlength: 150
  },
  billingAddress: {
    type: String,
    maxlength: 200
  },
  discount: {
    type: Number
  },
  deliveryFee: {
    type: Number
  },
  bookingStatus: {
    type: String,
    enum: ['confirmed', 'pending', 'cancelled'], default: 'Pending'
    
  },
  shippingStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered'],default: 'Pending'
  }
},
{ timestamps: true,}
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
