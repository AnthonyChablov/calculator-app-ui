import React from "react";
import { cn } from "@/lib/utils";

interface HeaderTextProps {
  className?: string;
  header: string;
  id?: string;
  headerLevel?: "h1" | "h2" | "h3" | "h4" | "h5";
}

const HeaderText = ({
  className = "",
  header = "",
  headerLevel = "h1",
  id,
}: HeaderTextProps) => {
  const headerSizes = {
    h1: "text-3xl",
    h2: "text-3xl",
    h3: "text-2xl",
    h4: "text-xl",
    h5: "text-lg",
  };

  const HeaderTag = headerLevel;
  const sizeClass = headerSizes[headerLevel];

  return (
    <div id={id || header} className={cn(` ${className}`)}>
      <HeaderTag className={sizeClass}>{header}</HeaderTag>
    </div>
  );
};

export default HeaderText;
