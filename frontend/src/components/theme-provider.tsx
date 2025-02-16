import { createContext, useContext, useEffect, useState } from "react";

// Define theme types: "dark", "light", or "system" (follows OS settings)
type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode; // The app components that will use this theme provider
  defaultTheme?: Theme; // Optional: Default theme if none is set
  storageKey?: string; // Optional: Key used for storing theme preference in localStorage
};

type ThemeProviderState = {
  theme: Theme; // Current theme state
  setTheme: (theme: Theme) => void; // Function to update the theme
};

// Default state for the context (theme defaults to "system")
const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null, // Placeholder function (overwritten in provider)
};

// Create a context to store the theme state
const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  // Load theme from localStorage or use the default
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement; // Get the root HTML element

    // Remove any existing theme classes
    root.classList.remove("light", "dark");

    if (theme === "system") {
      // If "system" is selected, detect OS theme and apply it
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    // Otherwise, apply the selected theme directly
    root.classList.add(theme);
  }, [theme]);

  // Context value that will be provided to consuming components
  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme); // Save new theme in localStorage
      setTheme(newTheme); // Update state with the new theme
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children} {/* Render the app inside the provider */}
    </ThemeProviderContext.Provider>
  );
}

// Custom hook to access the theme context
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider"); // Ensure it's used correctly

  return context; // Return the theme state and setter function
};
