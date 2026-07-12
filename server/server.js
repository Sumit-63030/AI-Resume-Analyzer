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
  try{
    const {name , email , password} = req.body;

    const existingUser = await prisma.user.findUnique({
      where : {
        email ,
      },
    });
    if(existingUser){
      return res.status(409).json({
        message : "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password : hashedPassword,
      },
    });

    res.status(201).json({
      id : user.id,
      name : user.name,
      email : user.email,
      createdAt : user.createdAt,
    });    
  } catch(error){
    console.log(error);

    res.status(500).json({
      message : "Something went wrong",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});