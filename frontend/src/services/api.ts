import axios from "axios";
import { Quiz } from "@/types/quiz";

const API_BASE_URL = "http://localhost:5000/api";

// Fetch all quizzes
export const getQuizzes = async (): Promise<Quiz[]> => {
  const response = await axios.get(`${API_BASE_URL}/quizzes`);
  return response.data;
};

// Fetch a single quiz by ID
export const getQuizById = async (id: number): Promise<Quiz> => {
  const response = await axios.get(`${API_BASE_URL}/quizzes/${id}`);
  return response.data;
};

// Create a new quiz
export const createQuiz = async (quiz: Omit<Quiz, "id">) => {
  const response = await axios.post(`${API_BASE_URL}/quizzes`, quiz);
  return response.data;
};

// Update an existing quiz
export const updateQuiz = async (id: number, quiz: Partial<Quiz>) => {
  const response = await axios.put(`${API_BASE_URL}/quizzes/${id}`, quiz);
  return response.data;
};

// Delete a quiz
export const deleteQuiz = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/quizzes/${id}`);
  return response.data;
};

