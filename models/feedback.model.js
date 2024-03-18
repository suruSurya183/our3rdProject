import mongoose from 'mongoose';

// Define the schema
const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comment: {
    type: String,
  }
},{ timestamps: true,});

// Define a model based on the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
