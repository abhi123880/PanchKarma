import express from "express";
import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
