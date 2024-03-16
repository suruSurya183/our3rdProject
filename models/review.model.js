import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: false },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    rating: { type: Number, required: true },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
