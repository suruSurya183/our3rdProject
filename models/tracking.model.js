import mongoose from "mongoose";

const { Schema } = mongoose;

const trackingSchema = Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    status: { type: String, enum: ['pending', 'in-transit', 'out-for-delivery', 'delivered'], default: 'pending' },
    location: { type: String, maxlength: 150 },
    estimatedDeliveryDate: { type: Date }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tracking", trackingSchema);
