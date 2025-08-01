import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      validate: {
        validator: function (value) {
          if (this.googleId) return true;
          return typeof value === "string" && value.length >= 3 && value.length <= 30;
        },
        message: "Username is required and must be between 3 and 30 characters",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      minlength: 6,
      validate: {
        validator: function (value) {

          if (this.googleId) return true;
          return typeof value === "string" && value.length >= 6;
        },
        message: "Password is required and must be at least 6 characters",
      },
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
