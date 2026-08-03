import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { matchJob } from "../controllers/jobMatchController.js";

const router = express.Router();

router.post("/", protect, matchJob);

export default router;