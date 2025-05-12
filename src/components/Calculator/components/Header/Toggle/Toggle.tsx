import React, { useState } from "react";
import ParagraphText from "@/components/Typography/ParagraphText/ParagraphText";

interface ToggleProps {
  onThemeChange?: (themeNumber: number) => void;
  initialTheme?: number;
  title?: string;
}

const THEMES = [1, 2, 3];

const Toggle = ({ onThemeChange, initialTheme = 1, title }: ToggleProps) => {
  const [activeTheme, setActiveTheme] = useState<number>(initialTheme);

  const handleToggle = (themeNumber: number) => {
    setActiveTheme(themeNumber);
    onThemeChange && onThemeChange(themeNumber);
  };

  return (
    <div className="flex items-center justify-center space-x-6">
      {title && (
        <ParagraphText
          text={title}
          className="text-gray-600 dark:text-gray-300 px-2 uppercase text-sm font-semibold"
        />
      )}
      <div className="inline-flex rounded-full bg-gray-200 dark:bg-gray-700 relative">
        {THEMES.map((theme) => (
          <div
            key={theme}
            className="relative flex items-center justify-center w-8 h-8"
          >
            <ParagraphText
              text={`${theme}`}
              className="text-gray-600 dark:text-gray-300 px-2 uppercase text-sm
                  font-semibold absolute transform left-1 -translate-y-8"
            />
            <button
              onClick={() => handleToggle(theme)}
              className={`w-6 h-6 hover:cursor-pointer rounded-full
                  flex items-center justify-center text-gray-600 dark:text-gray-300 focus:outline-none
                  transition-all duration-300 ease-in-out ${
                    activeTheme === theme
                      ? "bg-indigo-500 text-white dark:bg-indigo-600 shadow-sm"
                      : ""
                  }`}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toggle;
