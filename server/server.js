import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import prisma from "./lib/prisma.js";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(cors());



app.get("/", async(req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/register", async(req,res) => {
  const {name,email,password} = req.body;

  const hashedPassword = await bcrypt.hash(password , 10);

  const user = await prisma.user.create({
    data : {
      name ,
      email ,
      password : hashedPassword,
    },
  });

  res.status(201).json(user);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});