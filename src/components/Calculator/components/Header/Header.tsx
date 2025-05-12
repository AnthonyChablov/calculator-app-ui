import Toggle from "./Toggle/Toggle";
import HeaderText from "@/components/Typography/HeaderText/HeaderText";
import { cn } from "@/utils/utils";
import { useThemeStore } from "@/store/useThemeStore";

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
  /// Get the theme class from the store
  /// This is used to apply the theme styles to the header
  const { getThemeClass } = useThemeStore();

  return (
    <div
      className={cn(`flex items-center justify-between w-full  `, className)}
      data-testid="calculator-header"
    >
      <HeaderText
        header={headerTitle}
        className={`text-2xl font-semibold ${getThemeClass("textPrimary")}`}
      />
      <Toggle
        title={toggleTitle}
        initialTheme={currentTheme} // Pass the current theme to Toggle
        onThemeChange={onThemeChange} // Pass the setter function to Toggle
      />
    </div>
  );
};

export default Header;
