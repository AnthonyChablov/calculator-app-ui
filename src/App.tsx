import React from "react";
import Calculator from "./components/Calculator/Calculator";
import { useThemeStore } from "@/store/useThemeStore";
import { cn } from "@/utils/utils";
import { themeStyles } from "./store/themeVariables/themeVariables";

function App() {
  // Get the theme styles from the store
  const { getThemeClass } = useThemeStore();

  return (
    <div className={cn(`font-sans h-screen ${getThemeClass("bg")}`)}>
      <Calculator />
    </div>
  );
}

export default App;
