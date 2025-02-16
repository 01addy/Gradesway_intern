import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("https://gradesway-intern.onrender.com/api/auth/login", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch (error) {
      setError("Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex items-center justify-center h-screen ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <div className={`w-full max-w-md p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center">Login</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/register" className="text-blue-500 hover:underline">
            New User?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
