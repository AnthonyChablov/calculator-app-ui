import { type ClassValue } from "clsx";
import { cn } from "@/utils/utils";
import ParagraphText from "@/components/Typography/ParagraphText/ParagraphText";

interface ButtonProps {
  className?: ClassValue;
  onClick?: () => void;
  label: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  // Add other attributes as needed
}

const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  label,
  "aria-label": ariaLabelProp,
  "aria-describedby": ariaDescribedByProp,
  ...rest
}) => {
  const buttonClassName = cn(
    ` hover:cursor-pointer outline-none 
      inline-flex items-center justify-center 
      rounded-md  px-3 py-3 text-sm font-medium text-black shadow-sm 
      focus:outline-none focus:ring-2 
      focus:ring-indigo-500 focus:ring-offset-2
      transition-all duration-300 ease-in-out
      hover:scale-105 hover:brightness-125
    `,
    className
  );

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      aria-label={ariaLabelProp || label}
      aria-describedby={ariaDescribedByProp}
      {...rest}
    >
      <ParagraphText
        className="font-semibold"
        size="3xl"
        text={label}
      ></ParagraphText>
    </button>
  );
};

export default Button;
