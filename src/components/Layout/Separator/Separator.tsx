import { cn } from "@/lib/utils";

interface SeparatorProps {
  size?: "extraSmall" | "small" | "medium" | "large" | "extraLarge"; // Optional size prop
  className?: string;
}

const Separator = ({ size = "small", className = "" }: SeparatorProps) => {
  // Map size to padding classes
  const sizeClasses = {
    extraSmall: "py-1",
    small: "py-3",
    medium: "py-6",
    large: "py-9",
    extraLarge: "py-20",
  };

  return (
    <div
      data-testid="separator"
      id={`${size}-separator`}
      className={cn(sizeClasses[size] + " " + className)}
    ></div>
  );
};

export default Separator;
