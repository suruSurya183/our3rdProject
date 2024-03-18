import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: { type: String, required: true, maxlength: 200 },
    type: {
      type: String,
      enum: ["Admin", "Customer", "Staff"],
      required: true,
    },
    contactNumber: {
      type: Number,
      required: [true, "Contact is required"],
    },
    emailAddress: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Password is required"],
    },
    disabled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", userSchema);;
