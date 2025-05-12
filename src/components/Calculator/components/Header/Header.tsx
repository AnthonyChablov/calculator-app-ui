import Toggle from "./Toggle/Toggle";
import HeaderText from "@/components/Typography/HeaderText/HeaderText";
import { cn } from "@/utils/utils";

interface HeaderProps {
  className?: string;
  headerTitle: string;
  toggleTitle?: string | undefined;
  currentTheme: number; // Receive the current theme value
  onThemeChange: (newTheme: number) => void; // Receive the setter function
}

const Header = ({
  className,
  headerTitle,
  toggleTitle,
  currentTheme,
  onThemeChange,
}: HeaderProps) => {
  return (
    <div
      className={cn(`flex items-center justify-between w-full `, className)}
      data-testid="calculator-header"
    >
      <HeaderText header={headerTitle} className=" text-2xl font-semibold" />
      <Toggle
        title={toggleTitle}
        initialTheme={currentTheme} // Pass the current theme to Toggle
        onThemeChange={onThemeChange} // Pass the setter function to Toggle
      />
    </div>
  );
};

export default Header;
