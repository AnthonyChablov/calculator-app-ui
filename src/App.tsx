import React from "react";
import Calculator from "./components/Calculator/Calculator";
import { useThemeStore } from "@/store/useThemeStore";
import { cn } from "@/utils/utils";
import { themeStyles } from "./store/themeVariables/themeVariables";

function App() {
  // Get the theme styles for the background
  const { getBgClassName } = useThemeStore();

  return (
    <div className={cn(`font-sans ${getBgClassName()} h-screen`)}>
      <Calculator />
    </div>
  );
}

export default App;
