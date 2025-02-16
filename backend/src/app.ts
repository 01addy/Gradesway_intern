import express from "express"; // Import Express framework
import session from "express-session"; // Import session middleware for user sessions
import cors from "cors"; // Import CORS middleware to allow cross-origin requests
import authRoutes from "./routes/authRoutes"; // Import authentication routes
import quizRoutes from "./routes/quizRoutes"; // Import quiz-related routes

const app = express(); // Create an Express application instance

// **Enable CORS (Cross-Origin Resource Sharing)**
app.use(
  cors({
    origin: "https://gradesway-intern.vercel.app", // Allow frontend to communicate with backend
    credentials: true, // Enable sending cookies and authentication headers
  })
);

// **Middleware to parse incoming JSON requests**
app.use(express.json());

// **Session Middleware** (Manages user sessions)
app.use(
  session({
    secret: "your-secret-key", // Secret key for encrypting session data
    resave: false, // Prevents session from being saved repeatedly when unchanged
    saveUninitialized: false, // Only save session if data is present
    cookie: { secure: false }, // Set to `true` in production when using HTTPS
  })
);

// **Route Handling**
app.use("/api/auth", authRoutes); // Mount authentication routes under `/api/auth`
app.use("/api/quizzes", quizRoutes); // Mount quiz routes under `/api/quizzes`

// **Global Error Handling Middleware**
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack); // Log the error stack trace for debugging
  res.status(500).json({ error: "Something went wrong!" }); // Send a generic error response
});

export default app; // Export the app instance for use in server.ts
