import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizzes, deleteQuiz } from "@/services/api";
import { Quiz } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useTheme } from "@/components/theme-provider";

const Dashboard = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const { theme } = useTheme();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [deleteQuizId, setDeleteQuizId] = useState<number | null>(null);
  const [deletingQuizId, setDeletingQuizId] = useState<number | null>(null);
  

  // Fetch quizzes from API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };

    fetchQuizzes();
    setTimeout(() => setIsPageLoaded(true), 500);
  }, []);

  // Handle delete confirmation
  const confirmDeleteQuiz = async () => {
    if (deleteQuizId === null) return;
  
    try {
      setDeletingQuizId(deleteQuizId); // Start loading
  
      await deleteQuiz(deleteQuizId);
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== deleteQuizId));
  
      console.log("Quiz deleted successfully!");
    } catch (error) {
      console.error("Error deleting quiz:", error);
    } finally {
      setDeletingQuizId(null); // Stop loading
      setDeleteQuizId(null); // Close modal
    }
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen w-full transition-opacity duration-[1200ms] ease-in-out ${
        isPageLoaded ? "opacity-100" : "opacity-0"
      } ${
        theme === "dark"
          ? "bg-[#1E1E2E] text-white"
          : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
      }`}
    >
      {/* Page Title */}
      <h1 className="text-center text-5xl font-extrabold mb-10 tracking-wide">
        🎯 Your Quizzes
      </h1>

      {/* Animated Subheading */}
      <motion.p
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="text-center text-2xl mb-10 tracking-wide"
      >
        <Typewriter
          words={["Create, Manage, and Ace Your Quizzes!", "Build Your Knowledge with Engaging Quizzes!"]}
          loop={false}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </motion.p>

      {/* Add New Quiz Button */}
      <div className="flex justify-center mb-8 w-full">
        <Button className="px-6 py-3 text-lg font-medium bg-[#7a8ae5] hover:bg-[#5a6ab8]" onClick={() => navigate("/create")}>
          ➕ Add New Quiz
        </Button>
      </div>

      {/* Quiz Cards Grid */}
      <div className="w-full max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300 ease-in-out">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: quiz.id * 0.2 }}
              >
                <Card
                  className="w-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2 rounded-xl overflow-hidden cursor-pointer"
                >
                  <CardHeader className="bg-[#7a8ae5] text-white font-bold text-lg text-center py-3">
                    {quiz.title}
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-700 dark:text-gray-300">{quiz.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4 bg-gray-100 dark:bg-gray-900 rounded-b-xl">
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                      onClick={() => navigate(`/edit/${quiz.id}`, { state: { quiz } })}
                    >
                      ✏️ Edit
                    </Button>
                  <Button
                  variant="destructive"
                  className={`border-red-500 text-black-500 ${
                    deletingQuizId === quiz.id ? "bg-gray-500 cursor-not-allowed" : "hover:bg-red-500 hover:text-white"
                  }`}
                  onClick={() => setDeleteQuizId(quiz.id)}
                  disabled={deletingQuizId === quiz.id} // Disable only the button being deleted
                >
                  {deletingQuizId === quiz.id ? "Deleting..." : "🗑 Delete"}
                </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-lg font-semibold text-gray-600 dark:text-gray-300 col-span-full">
              No quizzes available. Create one now! 😊
            </p>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteQuizId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4">⚠️ Are you sure?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Do you really want to delete this quiz? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                className="bg-gray-300 text-black dark:bg-gray-600 dark:text-white"
                onClick={() => setDeleteQuizId(null)}
              >
                ❌ No
              </Button>
              <Button
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={confirmDeleteQuiz}
              >
                🗑 Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

