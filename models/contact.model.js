import mongoose from 'mongoose';

// Define the schema
const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

// Define a model based on the schema
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
