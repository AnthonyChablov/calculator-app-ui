import React from "react";
import Button from "./Button/Button";
import { buttonLayout } from "../../data/buttonLayout";
import { cn } from "@/utils/utils";
import { useThemeStore } from "@/store/useThemeStore";

interface ButtonGridProps {
  onButtonClick: (value: string) => void; // Now the button click passes the button's value
  resetGrid: () => void;
  onEvaluate: () => void; // Optional: If you want to handle equals separately
  currentTheme: number; // Receive the current theme value
}

const ButtonGrid = ({
  onButtonClick,
  resetGrid,
  onEvaluate,
  currentTheme,
}: ButtonGridProps) => {
  /**
   * useThemeStore is a Zustand store hook that provides access to the theme state and setter function.
   * It allows components to read and update the theme value.
   *
   * @returns {Object} - An object containing the current theme and a function to set the theme.
   */
  /// Get the theme class from the store
  /// This is used to apply the theme styles
  const { getThemeClass } = useThemeStore();

  /**
   * handleButtonClick is a function that handles the button click event.
   * It checks if the clicked button is "DEL" and calls the onButtonClick function with the button's value.
   *
   * @param {string} key - The value of the clicked button.
   */
  function handleButtonClick(key: string) {
    if (key === "DEL") {
      onButtonClick(key);
    } else {
      onButtonClick(key);
    }
  }

  /**
   * handleReset is a function that handles the reset button click event.
   * It calls the resetGrid function to reset the calculator grid.
   */
  function handleReset() {
    resetGrid();
  }

  /**
   * handleEquals is a function that handles the equals button click event.
   * It calls the resetGrid function to reset the calculator grid and then calls the onEvaluate function.
   */
  function handleEquals() {
    handleReset();
    onEvaluate();
  }

  return (
    <div
      className={cn(
        `p-8 bg-slate-800 rounded-xl shadow-md ${getThemeClass("bgToggleKeypad")}`
      )}
      data-testid="calculator-button-grid"
    >
      {buttonLayout.map((row, rowIndex) => (
        <div key={rowIndex} className={cn(`grid gap-4 pb-4 grid-cols-4`)}>
          {row.map((key) => (
            <Button
              className={cn(
                `${getThemeClass("textPrimary")} 
                ${getThemeClass("keyBgNeutral")} 
                ${getThemeClass("keyShadow")} 
                ${key === "DEL" && `${getThemeClass("keyBg")} ${getThemeClass("textPrimary")}`}`
              )}
              key={key}
              label={key}
              onClick={() => handleButtonClick(key)}
              aria-label={`Calculator button ${key}`}
            />
          ))}
        </div>
      ))}
      <div className="flex space-x-4">
        {/* Reset */}
        <Button
          className={`w-full 
            ${getThemeClass("keyBg")} 
            ${getThemeClass("textPrimary")}
          `}
          onClick={handleReset}
          label="Reset"
        />
        {/* Equals */}
        <Button
          className={` w-full ${getThemeClass("keyBgAccent")} ${getThemeClass("textPrimary")}`}
          onClick={handleEquals}
          label="="
        />
      </div>
    </div>
  );
};

export default ButtonGrid;
