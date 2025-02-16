import express from "express";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/authRoutes"; // Ensure correct path
import quizRoutes from "./routes/quizRoutes"; // Ensure correct path

const app = express();

app.use(cors({ origin: "http://localhost:5174", credentials: true }));
app.use(express.json());

// **Session Middleware**
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to `true` in production with HTTPS
  })
);

// **Use the routes correctly**
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);

// Error-handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;
