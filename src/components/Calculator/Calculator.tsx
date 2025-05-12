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

  /**
   * useThemeStore is a Zustand store hook that provides access to the theme state and setter function.
   * It allows components to read and update the theme value.
   *
   * @returns {Object} - An object containing the current theme and a function to set the theme.
   * */
  const { theme, setTheme } = useThemeStore();

  /**
   * handleThemeChange is a function that handles the theme change action.
   * It updates the theme state in the Zustand store.
   *
   * @param {number} newTheme - The new theme value to set.
   */
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
