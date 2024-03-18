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
      type: String,
      required: [true, "Contact is required"],
      minLength: [10, "Contact should be atleast 10 character long"],
      maxLength: [10, "Contact should not exceed 10 character"],
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
      maxLength: [15, "Password should not exceed more than 15 characters"],
      minLength: [6, "Password should have atleast 6 characters"],
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,
        "Please fill a valid Password",
      ],
    },
    confirmPassword: {
      type: String,
      required: [true, "Password is required"],
      maxLength: [15, "Password should not exceed more than 15 characters"],
      minLength: [6, "Password should have atleast 6 characters"],
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,
        "Please fill a valid Password",
      ],
    },
    disabled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", userSchema);;
