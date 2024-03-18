import mongoose from "mongoose";

const { Schema } = mongoose;

const vendorSchema = Schema(
  {
    vendorName: { type: String, required: true },
    contactNumber: { type: Number },
    address: {
      streetName: { type: String, required: false },
      landMark: { type: String, required: false },
      city: { type: String, required: false },
      pinCode: { type: String, required: false },
      state: { type: String, required: false },
      country: { type: String, required: false },
    },
    emailAddress: { type: String, required: true },
    password: { type: String, required: true },
    disabled: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Vendor", vendorSchema);
