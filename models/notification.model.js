import mongoose from 'mongoose';

// Define the schema
const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  }
});

// Define a model based on the schema
const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
