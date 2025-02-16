import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useTheme } from "@/components/theme-provider";
import { getQuizById, createQuiz, updateQuiz } from "@/services/api";
import { Typewriter } from "react-simple-typewriter";

const quizSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(5, "Description must be at least 5 characters long"),
});

type QuizFormValues = z.infer<typeof quizSchema>;

const CreateEditQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { theme } = useTheme();
  const [fadeIn, setFadeIn] = useState(false);
  const [quizData, setQuizData] = useState(location.state?.quiz || null);
  const [loading, setLoading] = useState(false);
  
  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: quizData?.title || "",
      description: quizData?.description || "",
    },
  });

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 500);
  }, []);

  useEffect(() => {
    if (!quizData && id) {
      getQuizById(Number(id))
        .then((quiz) => {
          setQuizData(quiz);
          form.reset({
            title: quiz.title,
            description: quiz.description,
          });
        })
        .catch((error) => console.error("Failed to fetch quiz:", error));
    }
  }, [id, quizData, form.reset]);

  const onSubmit = async (data: QuizFormValues) => {
    try {
      setLoading(true);
      if (quizData) {
        await updateQuiz(quizData.id, data);
        console.log("Quiz updated successfully!");
      } else {
        await createQuiz({ ...data, userId: 1 });
        console.log("Quiz created successfully!");
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting quiz:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div
      className={`container mx-auto px-6 py-12 transition-opacity duration-[1200ms] ease-in-out ${
        fadeIn ? "opacity-100" : "opacity-0"
      } ${theme === "dark" ? "bg-[#1E1E2E] text-white" : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"}`}
    >
      {/* Page Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="text-center text-5xl font-extrabold mb-10 text-white tracking-wide"
      >
        {quizData ? "Edit Quiz" : "Create Quiz"}
      </motion.h1>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="max-w-xl mx-auto"
      >
        <Card className="bg-purple-700 text-white text-center shadow-lg">
          <CardHeader className="flex justify-center items-center">
            <span className="inline-flex items-center text-3xl font-bold">
              <Typewriter
                words={quizData ? ["Update Your Quiz"] : ["Create a New Quiz"]}
                loop={false}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Title Input */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg text-gray-200">Title</FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter quiz title"
                        className="text-white-900"
                      />
                      <FormMessage className="text-red-300">
                        {form.formState.errors.title?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* Description Input */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg text-gray-200">Description</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Enter quiz description"
                        className="text-white-900"
                      />
                      <FormMessage className="text-red-300">
                        {form.formState.errors.description?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                type="submit"
                disabled={loading} // Disable button when loading
                className={`w-full font-semibold ${
                  loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#5a6ab8] hover:bg-[#7a8ae5]"
                }`}
              >
                {loading ? (quizData ? "Updating..." : "Creating...") : quizData ? "Update Quiz" : "Create Quiz"}
              </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateEditQuiz;
