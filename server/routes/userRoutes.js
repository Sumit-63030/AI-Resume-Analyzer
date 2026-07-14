import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", protect, getProfile);

export default router;