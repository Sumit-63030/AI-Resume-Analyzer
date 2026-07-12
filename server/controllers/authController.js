import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if(!user)
  {
    return res.status(401).json({
      message : "Invalid email or password",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if(!isPasswordCorrect)
  {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id : user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn : "7d",
    }
  );

  return res.status(200).json({
    message: "Login successful",
    token,
    user : {
      id : user.id,
      name : user.name,
      email : user.email,
    },
  });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message : "Something went wrong",
    });
  }
  
};