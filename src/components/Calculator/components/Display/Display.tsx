import ParagraphText from "@/components/Typography/ParagraphText/ParagraphText";
import { cn } from "@/utils/utils";

interface DisplayProps {
  className?: string;
  dataTestId?: string;
  value?: string | undefined;
  error?: string;
}

const Display = ({
  className = "",
  dataTestId = "",
  value = "",
  error,
}: DisplayProps) => {
  return (
    <div
      data-testid={dataTestId}
      className={cn(
        `
            flex items-center justify-end w-full h-36 p-6
          bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md 
            ${className}`
      )}
    >
      <ParagraphText
        text={value || error}
        className="text-gray-800 dark:text-gray-200 text-5xl font-semibold"
      ></ParagraphText>
    </div>
  );
};

export default Display;
