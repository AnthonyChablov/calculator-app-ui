import React from "react";
import ParagraphText from "@/components/Typography/ParagraphText/ParagraphText";
import { useThemeStore } from "@/store/useThemeStore";
import { cn } from "@/utils/utils";

interface ToggleProps {
  onThemeChange?: (newTheme: number) => void;
  initialTheme?: number;
  title?: string;
}

const THEMES = [1, 2, 3];

const Toggle = ({ onThemeChange, initialTheme, title }: ToggleProps) => {
  /**
   * useThemeStore is a custom hook that provides access to the theme store.
   * It allows you to get the current theme and set a new theme.
   */
  /// Get the theme class from the store
  /// This is used to apply the theme styles to the header
  /**
   * getThemeClass is a function that returns the theme class based on the current theme.
   * It is used to apply the appropriate styles to the toggle button.
   *
   * @param {string} key - The key for the theme variable.
   * @returns {string} - The class name for the theme variable.
   */
  const { getThemeClass } = useThemeStore();

  /**
   * handleToggle is a function that handles the theme toggle action.
   * It calls the onThemeChange function passed as a prop with the new theme value.
   *
   * @param {number} newTheme - The new theme value to set.
   */
  const handleToggle = (newTheme: number) => {
    onThemeChange && onThemeChange(newTheme); // Call the Zustand setter passed down
  };

  return (
    <div
      className="flex items-center justify-center space-x-6 transition-all duration-300 ease-in-out
                  hover:scale-105"
    >
      {title && (
        <ParagraphText
          text={title}
          className={cn(` text-gray-600 dark:text-gray-300
              px-2 uppercase text-sm font-semibold
              ${
                initialTheme === 1
                  ? getThemeClass("textSecondary")
                  : getThemeClass("textPrimary")
              }
            `)}
        />
      )}
      <div
        className={cn(
          `inline-flex rounded-full shadow-sm bg-gray-200 dark:bg-gray-700 relative 
              ${getThemeClass("bgToggleKeypad")}
              ${getThemeClass("keyShadow")}
            `
        )}
      >
        {THEMES.map((theme) => (
          <div
            key={theme}
            className="relative flex items-center justify-center w-8 h-8 "
          >
            <ParagraphText
              text={`${theme}`}
              className={cn(`
                  px-2 uppercase text-sm
                  font-semibold absolute transform left-1 -translate-y-8
                  ${
                    initialTheme === 1
                      ? getThemeClass("textSecondary")
                      : getThemeClass("textPrimary")
                  }
                `)}
            />
            <button
              onClick={() => handleToggle(theme)}
              className={`w-6 h-6 rounded-full
                  flex items-center justify-center focus:outline-none 
                  ${
                    initialTheme === theme
                      ? `${getThemeClass("keyBgAccent")} hover:shadow-lg`
                      : ``
                  }
                  hover:cursor-pointer
                `}
              style={{
                backgroundColor:
                  initialTheme === theme ? undefined : getThemeClass("keyBg"),
              }}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toggle;
