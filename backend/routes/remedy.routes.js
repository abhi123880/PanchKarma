import express from "express";
import { getAllRemedies, getRemedyById } from "../controllers/remedy.controller.js"; // Corrected path

const router = express.Router();

router.get("/", getAllRemedies);
router.get("/:id", getRemedyById);

export default router;