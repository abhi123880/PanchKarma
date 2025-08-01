import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
  
// Helper to create token and set cookie
const createSendToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  };

  console.log("Setting cookie with options:", cookieOptions);

  res.cookie("access_token", token, cookieOptions);
};

// Signup with email and password (no bcrypt for demo)
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "Email already registered"));
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    createSendToken(newUser, res);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

// Signin with email and password (no bcrypt for demo)
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "Email and password are required"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));

    if (user.password !== password) {
      return next(errorHandler(401, "Invalid password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    createSendToken(user, res);

    res.status(200).json({
      success: true,
      token,
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

function generateRandomPassword(length = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export const googleAuth = async (req, res, next) => {
  const { token } = req.body;

  if (!token) return res.status(400).json({ message: "Token missing" });

  // Since Firebase is not needed, reject or handle differently
  return res.status(400).json({ message: "Firebase authentication is disabled" });
};
