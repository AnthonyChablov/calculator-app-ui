import ParagraphText from "@/components/Typography/ParagraphText/ParagraphText";
import { cn } from "@/utils/utils";
import React, { useEffect, useRef } from "react";
import { useThemeStore } from "@/store/useThemeStore";

interface DisplayProps {
  className?: string;
  dataTestId?: string;
  value?: string | undefined;
  error?: string;
  currentTheme: number; // Receive the current theme value
}

const Display = ({
  className = "",
  dataTestId = "",
  value = "",
  error,
  currentTheme,
}: DisplayProps) => {
  /**
   * useThemeStore is a Zustand store hook that provides access to the theme state and setter function.
   * It allows components to read and update the theme value.
   *
   * @returns {Object} - An object containing the current theme and a function to set the theme.
   */
  /// Get the theme class from the store
  /// This is used to apply the theme styles to the header
  const { getThemeClass } = useThemeStore();

  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollLeft = displayRef.current.scrollWidth;
    }
  }, [value, error]); // Re-run effect when 'value' or 'error' changes

  return (
    <div
      data-testid={dataTestId}
      className={cn(
        `bg-gray-200 dark:bg-gray-700 rounded-xl shadow-md px-6 pt-6 pb-0 
          ${getThemeClass("bgScreen")}
          ${className}`
      )}
    >
      <div
        ref={displayRef}
        className="max-w-2xl overflow-x-auto w-full h-36 text-right"
      >
        <ParagraphText
          text={value || error}
          className={cn(
            `text-gray-800 dark:text-gray-200 text-5xl font-semibold whitespace-nowrap
               ${
                 currentTheme === 1
                   ? getThemeClass("textSecondary")
                   : getThemeClass("textPrimary")
               }
            `
          )}
        ></ParagraphText>
      </div>
    </div>
  );
};

export default Display;
