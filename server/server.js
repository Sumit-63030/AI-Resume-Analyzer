import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import prisma from "./lib/prisma.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", async(req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});