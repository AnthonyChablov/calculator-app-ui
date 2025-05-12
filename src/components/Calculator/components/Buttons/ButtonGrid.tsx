import React from "react";
import Button from "./Button/Button";
import { buttonLayout } from "../../data/buttonLayout";
import { cn } from "@/utils/utils";

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
  function handleReset() {
    resetGrid();
  }

  function handleEquals() {
    handleReset();
    onEvaluate();
  }

  return (
    <div
      className="p-8 bg-slate-800 rounded-lg shadow-md"
      data-testid="calculator-button-grid"
    >
      {buttonLayout.map((row, rowIndex) => (
        <div key={rowIndex} className={cn(`grid gap-4 pb-4 grid-cols-4`)}>
          {row.map((key) => (
            <Button
              className=""
              key={key}
              label={key}
              onClick={() => {
                if (key === "DEL") {
                  onButtonClick(key);
                } else {
                  onButtonClick(key);
                }
              }}
              aria-label={`Calculator button ${key}`}
            />
          ))}
        </div>
      ))}
      <div className="flex space-x-4">
        {/* Reset */}
        <Button onClick={handleReset} label="Reset" className="w-full" />
        {/* Equals */}
        <Button onClick={handleEquals} label="=" className="w-full" />
      </div>
    </div>
  );
};

export default ButtonGrid;
