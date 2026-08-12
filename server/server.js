import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import prisma from "./lib/prisma.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import jobMatchRoutes from "./routes/jobMatchRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/job-match", jobMatchRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "AI Resume Analyzer API is running",
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});