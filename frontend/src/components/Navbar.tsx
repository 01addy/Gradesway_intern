import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { FiMenu } from "react-icons/fi";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  // State to manage the visibility of the mobile menu
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handles user logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Remove authentication token
    navigate("/login"); // Redirect to login page
    setMenuOpen(false); // Close the menu after logout
  };

  // Toggles the mobile menu open/close state
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  // Closes the menu after theme toggle
  const handleThemeToggle = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-gray-100 dark:bg-gray-900 shadow-md">
      {/* Left - Brand Logo */}
      <div className="text-2xl font-bold text-gray-900 dark:text-white">Quizo</div>

      {/* Right - Navigation Links (Visible on larger screens) */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          to="/dashboard"
          className="text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/create"
          className="text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
        >
          Create/Edit Quiz
        </Link>
        <Link
          to="/about"
          className="text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
        >
          About
        </Link>
      </div>

      {/* Hamburger Menu (Visible on all screen sizes for responsiveness) */}
      <div className="relative">
        {/* Hamburger Button */}
        <button
          className="text-gray-800 dark:text-gray-300 text-2xl focus:outline-none"
          onClick={handleMenuClick}
        >
          <FiMenu className="text-gray-800 dark:text-gray-300" /> {/* Ensure visibility in light mode */}
        </button>

        {/* Dropdown Menu (Visible on small screens when menu is open) */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden">
            {/* Navigation Links (for small screens) */}
            <div className="md:hidden">
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/create"
                className="block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Create/Edit Quiz
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </div>

            {/* Theme Toggle Option */}
            <div
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={handleThemeToggle}
            >
              <ModeToggle />
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-500 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <MdLogout className="text-lg" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
