import React from "react";
import { cn } from "@/lib/utils";

interface ParagraphTextProps {
  className?: string;
  text?: string;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
  children?: React.ReactNode;
}

const ParagraphText = ({
  className = "",
  text = "",
  size = "lg",
  children = <></>,
}: ParagraphTextProps) => {
  const paragraphSizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
  };

  const sizeClass = paragraphSizes[size];

  return (
    <p
      className={cn(
        `text-zinc-400 dark:text-zinc-500 font-medium ${sizeClass} ${className}`
      )}
    >
      {text || children}
    </p>
  );
};

export default ParagraphText;
