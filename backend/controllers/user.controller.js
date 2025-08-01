import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Security check: only allow user to update their own profile
    if (req.user.id !== userId) {
      return next(errorHandler(403, "Forbidden: cannot update another user's profile"));
    }

    const user = await User.findById(userId);
    if (!user) return next(errorHandler(404, "User not found"));

    // Update allowed fields only
    if (updates.username) user.username = updates.username;
    if (updates.email) user.email = updates.email;
    if (updates.password) user.password = updates.password;
    if (updates.avatar) user.avatar = updates.avatar;

    await user.save();

    res.status(200).json({ success: true, message: "Profile updated", user });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Security check: only allow user to delete their own account
    if (req.user.id !== userId) {
      return next(errorHandler(403, "Forbidden: cannot delete another user's account"));
    }

    const user = await User.findById(userId);
    if (!user) return next(errorHandler(404, "User not found"));

    await User.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
