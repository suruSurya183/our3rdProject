import mongoose from "mongoose";

const { Schema } = mongoose;

const faqSchema = Schema(
  {
    
    question: { type: String, required: true },
    answer: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
  },{
    timestamps: true,
  }
);

export default mongoose.model("FAQ", faqSchema);
