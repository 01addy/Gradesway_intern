import { Request, Response } from "express"; // Import Request and Response types from Express
import prisma from "../config/db"; // Import Prisma instance for database interactions

// Create a new quiz
export const createQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, userId } = req.body; // Extract quiz details from request body

    // Validate input fields
    if (!title || !description || !userId) {
      res.status(400).json({ error: "Title, description, and userId required" });
      return;
    }

    console.log("Title, description, and userId received.");
    const userIdNumber = Number(userId); // Convert userId to a number

    // Check if userId is a valid number
    if (isNaN(userIdNumber)) {
      res.status(400).json({ error: "userId must be a number" });
      return;
    }

    // Verify if the user exists in the database
    const userExists = await prisma.user.findUnique({
      where: { id: userIdNumber },
    });

    if (!userExists) {
      res.status(400).json({ error: "Invalid userId. User does not exist." });
      return;
    }

    // Create and store the quiz in the database
    const quiz = await prisma.quiz.create({
      data: { title, description, userId: userIdNumber },
    });

    res.status(201).json({ message: "Quiz created successfully", quiz });

  } catch (error) {
    console.error("Error in createQuiz:", error);
    res.status(500).json({ error: "Database error" }); // Handle server errors
  }
};

// Retrieve all quizzes
export const getQuizzes = async (req: Request, res: Response): Promise<void> => {
  try {
    const quizzes = await prisma.quiz.findMany(); // Fetch all quizzes from the database
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Database error" }); // Handle database errors
  }
};

// Retrieve a specific quiz by its ID
export const getQuizById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Extract quiz ID from request parameters

    // Find the quiz by its ID
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(id) },
    });

    // If quiz is not found, return an error
    if (!quiz) {
      res.status(404).json({ error: "Quiz not found" });
      return;
    }

    res.json(quiz); // Return the found quiz
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// Update an existing quiz
export const updateQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Extract quiz ID from request parameters
    const { title, description } = req.body; // Extract updated fields from request body

    // Check if the quiz exists in the database
    const existingQuiz = await prisma.quiz.findUnique({ where: { id: Number(id) } });

    if (!existingQuiz) {
      res.status(404).json({ error: "Quiz not found" });
      return;
    }

    // Update quiz details in the database
    const updatedQuiz = await prisma.quiz.update({
      where: { id: Number(id) },
      data: { title, description },
    });

    res.json({ message: "Quiz updated successfully", updatedQuiz });

  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// Delete a quiz by ID
export const deleteQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Extract quiz ID from request parameters

    // Check if the quiz exists before deleting
    const existingQuiz = await prisma.quiz.findUnique({ where: { id: Number(id) } });

    if (!existingQuiz) {
      res.status(404).json({ error: "Quiz not found" });
      return;
    }

    // Delete the quiz from the database
    await prisma.quiz.delete({ where: { id: Number(id) } });

    res.json({ message: "Quiz deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};
