import React from "react";
import Button from "./Button/Button";
import { buttonLayout } from "../../data/buttonLayout";

interface ButtonGridProps {
  onButtonClick: (value: string) => void; // Now the button click passes the button's value
  resetGrid: () => void;
}

const ButtonGrid: React.FC<ButtonGridProps> = ({
  onButtonClick,
  resetGrid,
}) => {
  return (
    <div className="p-8 bg-slate-800 rounded-lg shadow-md">
      {buttonLayout.map((row, rowIndex) => (
        <div key={rowIndex} className={`grid gap-4 grid-cols-${row.length}`}>
          {row.map((key) => (
            <Button
              className="w-24"
              key={key}
              label={key}
              onClick={() => {
                if (key === "Clear") {
                  resetGrid();
                } else if (key === "=") {
                  // You'll handle the equals logic in the parent component
                  onButtonClick(key);
                } else if (key === "DEL") {
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
    </div>
  );
};

export default ButtonGrid;
