import ParagraphText from "@/components/Typography/ParagraphText/ParagraphText";
import { cn } from "@/utils/utils";
import React, { useEffect, useRef } from "react";

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
        `bg-gray-200 dark:bg-gray-700  rounded-lg shadow-md  px-6 pt-6 pb-0
          ${className}`
      )}
    >
      <div
        ref={displayRef}
        className="max-w-2xl overflow-x-auto w-full h-36 text-right"
      >
        <ParagraphText
          text={value || error}
          className="text-gray-800 dark:text-gray-200 text-5xl font-semibold whitespace-nowrap"
        ></ParagraphText>
      </div>
    </div>
  );
};

export default Display;
