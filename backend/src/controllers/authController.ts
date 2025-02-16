import { Request, Response } from "express"; // Import Request and Response types from Express
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import { PrismaClient } from "@prisma/client"; // Import PrismaClient to interact with the database

const prisma = new PrismaClient(); // Initialize Prisma Client instance

// User registration function
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body; // Extract username and password from request body

    // Validate input fields
    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    // Check if the username already exists in the database
    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    // Respond with success message and user details (excluding password)
    res.status(201).json({ 
      message: "User registered successfully", 
      user: { id: newUser.id, username: newUser.username } 
    });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Server error" }); // Handle server errors
  }
};

// User login function
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body; // Extract username and password from request body

    // Validate input fields
    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    // Find user by username
    const user = await prisma.user.findUnique({ where: { username } });

    // If user does not exist, return an error
    if (!user) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    // Compare provided password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If password is incorrect, return an error
    if (!isMatch) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    // Respond with success message and user details (excluding password)
    res.json({ 
      message: "Login successful", 
      user: { id: user.id, username: user.username } 
    });

  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Server error" }); // Handle server errors
  }
};
