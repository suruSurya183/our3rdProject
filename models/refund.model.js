import mongoose from 'mongoose';

const refundSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  refundedAmount: {
    type: Number,
    required: true
  },
  refundReason: {
    type: String
  },
  refundStatus: {
    type: String,
    enum: ['Requested', 'Processing', 'Completed', 'Cancelled'],
    required: true
  }
});

const Refund = mongoose.model('Refund', refundSchema);

export default Refund;
