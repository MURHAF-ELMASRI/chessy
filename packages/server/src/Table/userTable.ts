import mongoose from "mongoose";

const userSchema = new mongoose.Schema<UserType>(
  {
    _id: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userType: {
      type: String,
      required: true,
      enum: ["player", "manger"],
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "active"],
    },
    confirmationCode: {
      type: String,
    },
    confirmationCodeDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
