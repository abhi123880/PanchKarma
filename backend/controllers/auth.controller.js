import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
const createSendToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000, 
  };

  console.log("Setting cookie with options:", cookieOptions);

  res.cookie("access_token", token, cookieOptions);
};
export const signup = async (req, res, next) => {
  const { username, email, password, confirmPassword, phone, rememberMe } = req.body;

  if (!username || !email || !password || !confirmPassword || !phone) {
    return next(errorHandler(400, "All fields are required"));
  }

  if (password !== confirmPassword) {
    return next(errorHandler(400, "Passwords do not match"));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "Email already registered"));
    }

    const newUser = new User({ username, email, password, phone });
    await newUser.save();

    // Set token expiration based on rememberMe
    const tokenExpiry = rememberMe ? "7d" : "1d";

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: tokenExpiry,
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // 7 days or 1 day
    };

    res.cookie("access_token", token, cookieOptions);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
export const signin = async (req, res, next) => {
  const { email, password, confirmPassword, rememberMe } = req.body;

  if (!email || !password || !confirmPassword) {
    return next(errorHandler(400, "Email, password and confirm password are required"));
  }

  if (password !== confirmPassword) {
    return next(errorHandler(400, "Passwords do not match"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));

    if (user.password !== password) {
      return next(errorHandler(401, "Invalid password"));
    }

    const tokenExpiry = rememberMe ? "7d" : "1d";

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: tokenExpiry,
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
    };

    res.cookie("access_token", token, cookieOptions);

    res.status(200).json({
      success: true,
      token,
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
