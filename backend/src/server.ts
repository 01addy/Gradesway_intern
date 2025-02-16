import app from "./app"; // Import the Express app instance
import dotenv from "dotenv"; // Import dotenv to manage environment variables

dotenv.config(); // Load environment variables from a .env file

const PORT = process.env.PORT || 5000; // Use the port from .env or default to 5000

// **Start the server and listen on the specified port**
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// **Graceful Shutdown Handling**
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  
  server.close(() => {
    console.log("Server closed.");
  });
});
