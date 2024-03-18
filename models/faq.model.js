import mongoose from "mongoose";

const { Schema } = mongoose;

const faqSchema = Schema(
  {
    title: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
  }
);

export default mongoose.model("FAQ", faqSchema);