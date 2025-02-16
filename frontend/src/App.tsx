import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateEditQuiz from "./pages/CreateEditQuiz";
import About from "./pages/About";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <MainContent />
      </Router>
    </ThemeProvider>
  );
}

const MainContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/register" || location.pathname === "/login";

  return (
    <div className="w-full min-h-screen">
      {!hideNavbar && <Navbar />} 
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateEditQuiz />} />
        <Route path="/edit/:id" element={<CreateEditQuiz />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
