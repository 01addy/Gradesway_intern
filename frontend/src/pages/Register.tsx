import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { theme } = useTheme();
  const [fadeIn, setFadeIn] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 🔄 Loading state
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Show "Registering..." on button click

    try {
      const response = await axios.post("https://gradesway-intern.onrender.com/api/auth/register", formData);
      if (response.status === 201) {
        navigate("/login"); // Redirect to login after successful registration
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false); // Hide "Registering..." when request completes
    }
  };

  return (
    <div
      className={`container mx-auto px-6 py-12 transition-opacity duration-[1200ms] ease-in-out ${
        fadeIn ? "opacity-100" : "opacity-0"
      } ${theme === "dark" ? "bg-[#1E1E2E] text-white" : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"}`}
    >
      <div className="flex justify-center items-center min-h-screen">
        <Card className="p-6 max-w-md w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Register;

