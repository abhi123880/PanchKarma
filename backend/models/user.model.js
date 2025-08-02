import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?\d{10,15}$/, "Please use a valid phone number"],
    },
    password: {
      type: String,
      minlength: 8,
      validate: {
        validator: function (value) {
          if (this.googleId) return true;
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
          return typeof value === "string" && passwordRegex.test(value);
        },
        message: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
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
