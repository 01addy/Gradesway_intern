import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useTheme } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  const { theme } = useTheme();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 500);
  }, []);

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
        About the Developer
      </motion.h1>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="max-w-xl mx-auto"
      >
        <Card className="bg-purple-700 text-white text-center shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              <Typewriter
                words={["Aditya Pratap Singh", "A Passionate Developer"]}
                loop={false}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              A highly skilled developer specializing in modern web applications. Passionate about crafting seamless user experiences with creativity & innovation.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Info Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1.2, ease: "easeInOut" }}
        className="grid md:grid-cols-2 gap-8 mt-10"
      >
        {/* Bio Card */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-[#7a8ae5]">Who Am I?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              I combine technical proficiency with creativity to build scalable web applications. Proficient in React.js, Node.js, and MongoDB, always seeking innovative solutions.
            </p>
            <Button variant="outline" className="mt-4">
              <a href="/resume.pdf" download="Aditya_Pratap_Singh_Resume.pdf" target="_blank" rel="noopener noreferrer">
                Download Resume 📄
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Contact Card */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-[#7a8ae5]">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 dark:text-gray-300">
            <p>
              <b>Phone:</b> <a href="tel:+918858066219" className="underline">+91-8858066219</a>
            </p>
            <p>
              <b>Email:</b>{" "}
              <a href="mailto:adityapratap.job@gmail.com" className="underline text-[#7a8ae5] hover:text-[#5a6ab8]">
                adityapratap.job@gmail.com
              </a>
            </p>
            <p>
              <b>GitHub:</b>{" "}
              <a href="https://github.com/01addy" target="_blank" className="underline text-[#7a8ae5] hover:text-[#5a6ab8]">
                01addy
              </a>
            </p>
            <p>
              <b>LinkedIn:</b>{" "}
              <a href="https://www.linkedin.com/in/adityapratap2712" target="_blank" className="underline text-[#7a8ae5] hover:text-[#5a6ab8]">
                Aditya Pratap Singh
              </a>
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tech Stack Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
        className="mt-12"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">Tech Stack Used</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Frontend Card */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-[#7a8ae5]">Frontend</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <b>React.js:</b> Built the application
              </li>
              <li>
                <b>ShadCN UI:</b> Modern, clean, and responsive UI components
              </li>
              <li>
                <b>Axios / Fetch API:</b> Handling API interactions
              </li>
              <li>
                <b>Framer Motion:</b> Smooth animations
              </li>
              <li>
                <b>Tailwind CSS:</b> Utility-first styling
              </li>
            </ul>
          </CardContent>
        </Card>
      
        {/* Backend Card */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-[#7a8ae5]">Backend</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <b>Node.js & Express:</b> API development
              </li>
              <li>
                <b>TypeScript:</b> Strongly typed backend
              </li>
              <li>
                <b>Prisma ORM:</b> Database interactions
              </li>
              <li>
                <b>CRUD Operations:</b> Quiz management features
              </li>
              <li>
                <b>Basic Authentication:</b> User management (No JWT required)
              </li>
            </ul>
          </CardContent>
        </Card>
      
        {/* Database Card */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-[#7a8ae5]">Database</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <b>MySQL / PostgreSQL:</b> Database for storing quizzes
              </li>
              <li>
                <b>Prisma ORM:</b> Query builder for database interactions
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      </motion.div>
    </div>
  );
};

export default About;
