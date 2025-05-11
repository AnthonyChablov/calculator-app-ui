import ParagraphText from "@/components/Typography/ParagraphText/ParagraphText";
import { cn } from "@/lib/utils";

interface ScreenProps {
  className?: string;
  dataTestId?: string;
  value?: string | undefined;
  error?: string;
}

const Screen = ({
  className = "",
  dataTestId = "",
  value = "",
  error,
}: ScreenProps) => {
  return (
    <div className=" ">
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
    </div>
  );
};

export default Screen;
