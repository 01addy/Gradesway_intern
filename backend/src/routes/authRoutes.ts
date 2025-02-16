import express from "express"; // Import Express to create a router
import { login } from "../controllers/authController"; // Import login controller
import { register } from "../controllers/authController"; // Import register controller

const router = express.Router(); // Create an instance of Express Router

// Route for user registration
router.post("/register", register); 

// Route for user login
router.post("/login", login);

export default router; // Export the router for use in the main application
