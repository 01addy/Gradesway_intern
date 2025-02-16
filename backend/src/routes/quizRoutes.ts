import express from "express"; // Import Express to create a router
import {
  getQuizzes,   // Controller to get all quizzes
  getQuizById,  // Controller to get a specific quiz by ID
  createQuiz,   // Controller to create a new quiz
  updateQuiz,   // Controller to update an existing quiz
  deleteQuiz,   // Controller to delete a quiz
} from "../controllers/quizController";

const router = express.Router(); // Create an instance of Express Router

// Route to fetch all quizzes
router.get("/", getQuizzes);

// Route to fetch a single quiz by its ID
router.get("/:id", getQuizById);

// Route to create a new quiz
router.post("/", createQuiz);

// Route to update an existing quiz by ID
router.put("/:id", updateQuiz);

// Route to delete a quiz by ID
router.delete("/:id", deleteQuiz);

export default router; // Export the router for use in the main application
