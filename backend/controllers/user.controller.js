import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Check if the user making the request is the same as the user being updated
    if (req.user.id !== userId) {
      return next(errorHandler(403, "Forbidden: You can only update your own profile"));
    }

    // Directly set the password if it's being updated (no hashing)
    if (updates.password) {
      updates.password = updates.password; // No bcrypt hashing
    }
    
    // Find the user and update the fields, using `findByIdAndUpdate` for a single, atomic operation
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { // Use $set to update only the fields provided
        username: updates.username,
        email: updates.email,
        password: updates.password,
        avatar: updates.avatar,
        phone: updates.phone
      }},
      { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators: true` ensures validation runs
    );
    
    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Remove password from the response for security
    const { password, ...restOfUser } = updatedUser._doc;

    res.status(200).json({ success: true, message: "Profile updated", user: restOfUser });
  } catch (error) {
    console.error("Error in updateUser:", error);
    next(errorHandler(500, error.message));
  }
};

// Keep the deleteUser function as is
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (req.user.id !== userId) {
      return next(errorHandler(403, "Forbidden: You can only delete your own account"));
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
        return next(errorHandler(404, "User not found"));
    }

    // Clear the token cookie on successful deletion
    res.clearCookie('access_token');
    
    res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    next(errorHandler(500, error.message));
  }
};

// import User from "../models/user.model.js";
// import { errorHandler } from "../utils/error.js";

// export const updateUser = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     const updates = req.body;
//     if (req.user.id !== userId) {
//       return next(errorHandler(403, "Forbidden: cannot update another user's profile"));
//     }
//     const user = await User.findById(userId);
//     if (!user) return next(errorHandler(404, "User not found"));
//     if (updates.username) user.username = updates.username;
//     if (updates.email) user.email = updates.email;
//     if (updates.password) user.password = updates.password;
//     if (updates.avatar) user.avatar = updates.avatar;
//     if (updates.phone) user.phone = updates.phone;

//     await user.save();

//     res.status(200).json({ success: true, message: "Profile updated", user });
//   } catch (error) {
//     next(errorHandler(500, error.message));
//   }
// };

// export const deleteUser = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     if (req.user.id !== userId) {
//       return next(errorHandler(403, "Forbidden: cannot delete another user's account"));
//     }

//     const user = await User.findById(userId);
//     if (!user) return next(errorHandler(404, "User not found"));

//     await User.findByIdAndDelete(userId);

//     res.status(200).json({ success: true, message: "Account deleted successfully" });
//   } catch (error) {
//     next(errorHandler(500, error.message));
//   }
// };
