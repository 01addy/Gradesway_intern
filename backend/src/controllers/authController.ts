import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    res.status(201).json({ message: "User registered successfully", user: { id: newUser.id, username: newUser.username } });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }
    const user = await prisma.user.findUnique({ where: { username } });
    
    if (!user) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }
    res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
