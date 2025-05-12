import React from "react";
import Calculator from "./components/Calculator/Calculator";
import { useThemeStore } from "@/store/useThemeStore";
import { cn } from "@/utils/utils";

function App() {
  /// useThemeStore is a Zustand store hook that provides access to the theme state and setter function.
  const { theme, setTheme } = useThemeStore();
  return (
    <div
      className={cn(
        `font-sans ${theme === 1 ? "bg-light" : theme === 2 ? "bg-dark" : "bg-blue-500"}`
      )}
    >
      <Calculator />
    </div>
  );
}

export default App;
