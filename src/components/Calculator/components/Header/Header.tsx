import Toggle from "./Toggle/Toggle";
import HeaderText from "@/components/Typography/HeaderText/HeaderText";
import { cn } from "@/utils/utils";

interface HeaderProps {
  className?: string;
  headerTitle: string;
  toggleTitle?: string | undefined;
}

const Header = ({ className, headerTitle, toggleTitle }: HeaderProps) => {
  return (
    <div
      className={cn(`flex items-center justify-between w-full p-4 `, className)}
      data-testid="calculator-header"
    >
      <HeaderText header={headerTitle} className=" text-xl" />
      <Toggle title={toggleTitle} />
    </div>
  );
};

export default Header;
