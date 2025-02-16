import { Request, Response } from "express";
import prisma from "../config/db";

// Create a quiz
export const createQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, userId } = req.body;

    if (!title || !description || !userId) {
      res.status(400).json({ error: "Title, description, and userId required" });
      return;
    }

    console.log("Title, description, and userId received.");
    const userIdNumber = Number(userId);

    if (isNaN(userIdNumber)) {
      res.status(400).json({ error: "userId must be a number" });
      return;
    }

    // Check if the user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userIdNumber },
    });

    if (!userExists) {
      res.status(400).json({ error: "Invalid userId. User does not exist." });
      return;
    }

    // Create the quiz
    const quiz = await prisma.quiz.create({
      data: { title, description, userId: userIdNumber },
    });

    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    console.error("Error in createQuiz:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// Get all quizzes
export const getQuizzes = async (req: Request, res: Response): Promise<void> => {
  try {
    const quizzes = await prisma.quiz.findMany();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// Get a single quiz by ID
export const getQuizById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(id) },
    });

    if (!quiz) {
      res.status(404).json({ error: "Quiz not found" });
      return;
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// Update a quiz
export const updateQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const existingQuiz = await prisma.quiz.findUnique({ where: { id: Number(id) } });

    if (!existingQuiz) {
      res.status(404).json({ error: "Quiz not found" });
      return;
    }

    const updatedQuiz = await prisma.quiz.update({
      where: { id: Number(id) },
      data: { title, description },
    });

    res.json({ message: "Quiz updated successfully", updatedQuiz });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// Delete a quiz
export const deleteQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const existingQuiz = await prisma.quiz.findUnique({ where: { id: Number(id) } });

    if (!existingQuiz) {
      res.status(404).json({ error: "Quiz not found" });
      return;
    }

    await prisma.quiz.delete({ where: { id: Number(id) } });
    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};
