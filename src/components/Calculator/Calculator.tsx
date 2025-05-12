import Container from "../Layout/Container/Container";
import Header from "./components/Header/Header";
import Display from "./components/Display/Display";
import Separator from "../Layout/Separator/Separator";
import ButtonGrid from "./components/Buttons/ButtonGrid";
import useCalculator from "./hooks/useCalculator";
import { useThemeStore } from "@/store/useThemeStore";

const Calculator = () => {
  /**
   * useCalculator is a custom hook that manages the state and behavior of a calculator application.
   * It provides the current expression, functions to handle button clicks, reset the calculator,
   * and evaluate the expression.
   *
   * @returns {Object} - An object containing the current expression, button click handler,
   *                     reset function, and evaluate function.
   */
  const { expression, handleButtonClick, handleReset, onEvaluate } =
    useCalculator();

  /* Zustand Theme State */
  const { theme, setTheme } = useThemeStore();

  const handleThemeChange = (newTheme: number) => {
    setTheme(newTheme); // Call the setter function to update the theme
    console.log("Theme changed to:", newTheme); // Optional: Log the change
  };

  return (
    <>
      <Container className="pt-10" dataTestId="calculator">
        <Header
          headerTitle="calc"
          toggleTitle="THEME"
          currentTheme={theme}
          onThemeChange={handleThemeChange}
        />
        <Separator size="small" />
        <Display value={expression} currentTheme={theme} />
        <Separator size="small" />
        <ButtonGrid
          onButtonClick={handleButtonClick}
          resetGrid={handleReset}
          onEvaluate={onEvaluate}
          currentTheme={theme}
        />
      </Container>
    </>
  );
};

export default Calculator;
