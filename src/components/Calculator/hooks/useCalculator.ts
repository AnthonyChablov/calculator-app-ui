import { useState } from "react";
import { Parser } from "expr-eval";

/**
 * Supported operators in the calculator
 */
const OPERATORS: string[] = ["+", "-", "*", "/"];

/**
 * Custom hook for calculator functionality
 * @returns {Object} Calculator state and functions
 */
const useCalculator = () => {
  // State for the current mathematical expression
  const [expression, setExpression] = useState("");

  /**
   * Handles button clicks from the calculator
   * @param {string} value - The button value that was clicked
   */
  const handleButtonClick = (value: string) => {
    // Handle delete (backspace) button
    if (value === "DEL") {
      setExpression((prevExpression) => prevExpression.slice(0, -1));
      return;
    }

    // Handle Clear button
    if (value === "Clear") {
      setExpression("");
      return;
    }

    // Handle multiplication (x) button
    if (value === "x") {
      if (expression && !OPERATORS.includes(expression.slice(-1))) {
        setExpression((prevExpression) => prevExpression + "*");
      }
      return;
    }

    // Handle decimal point
    if (value === ".") {
      // Get the last number in the expression
      const lastNumber = expression.split(/[\+\-\*\/]/).pop();

      // Only add a decimal if the last number doesn't already have one
      if (lastNumber && !lastNumber.includes(".")) {
        setExpression((prevExpression) => prevExpression + value);
      } else if (!expression) {
        // Start with a decimal if expression is empty
        setExpression("0.");
      }
      return;
    }

    // Handle operators
    if (OPERATORS.includes(value)) {
      // If expression is empty, only allow minus sign
      if (!expression) {
        if (value === "-") {
          setExpression("-");
        }
        return;
      }

      const lastChar = expression.slice(-1);
      const secondLastChar =
        expression.length > 1 ? expression.slice(-2, -1) : "";

      // Special case: Handle sequences like "9++" or "9+-"
      if (OPERATORS.includes(lastChar)) {
        // Case 1: If we already have two operators (like "9+-"), replace the last one
        if (
          OPERATORS.includes(secondLastChar) &&
          OPERATORS.includes(lastChar)
        ) {
          setExpression((prev) => prev.slice(0, -1) + value);
          return;
        }

        // Case 2: Handle transitions like "9+" → "9++" or "9+" → "9+-"
        if (lastChar === "+" || lastChar === "-") {
          if (value === "+" || value === "-") {
            // Replace the last operator with the new one
            setExpression((prev) => prev.slice(0, -1) + value);
            return;
          }
        }

        // Case 3: Allow minus after other operators for negative numbers
        if (value === "-" && lastChar !== "-") {
          setExpression((prev) => prev + value);
          return;
        }

        // Default: Replace the previous operator with the new one
        setExpression((prev) => prev.slice(0, -1) + value);
        return;
      }

      // Add the operator to the expression
      setExpression((prev) => prev + value);
      return;
    }

    // Handle numbers
    // Prevent leading zeros unless it's a decimal number
    if (value === "0" && !expression) {
      setExpression("0");
      return;
    }

    // Handle numbers following a single zero
    if (expression === "0" && value !== ".") {
      setExpression(value);
      return;
    }

    // Default: add the value to the expression
    setExpression((prev) => prev + value);
  };

  /**
   * Resets the calculator to an empty state
   */
  const handleReset = () => {
    setExpression("");
  };

  /**
   * Evaluates the current expression and updates the state
   */
  const onEvaluate = () => {
    if (!expression) return;

    try {
      // Clean up the expression before evaluation
      let expressionToEvaluate = expression;

      // Handle special cases with consecutive operators
      // Convert patterns like "9++" to "9+" and "9+-" to "9-"
      for (let i = 0; i < expressionToEvaluate.length - 1; i++) {
        if (
          OPERATORS.includes(expressionToEvaluate[i]) &&
          OPERATORS.includes(expressionToEvaluate[i + 1])
        ) {
          // If we have "+ +" or "- -", reduce to a single "+"
          if (
            (expressionToEvaluate[i] === "+" &&
              expressionToEvaluate[i + 1] === "+") ||
            (expressionToEvaluate[i] === "-" &&
              expressionToEvaluate[i + 1] === "-")
          ) {
            expressionToEvaluate =
              expressionToEvaluate.slice(0, i) +
              "+" +
              expressionToEvaluate.slice(i + 2);
            i--; // Re-check this position
          }
          // If we have "+ -" or "- +", reduce to a single "-"
          else if (
            (expressionToEvaluate[i] === "+" &&
              expressionToEvaluate[i + 1] === "-") ||
            (expressionToEvaluate[i] === "-" &&
              expressionToEvaluate[i + 1] === "+")
          ) {
            expressionToEvaluate =
              expressionToEvaluate.slice(0, i) +
              "-" +
              expressionToEvaluate.slice(i + 2);
            i--; // Re-check this position
          }
        }
      }

      // If expression ends with an operator, remove it
      if (OPERATORS.includes(expressionToEvaluate.slice(-1))) {
        expressionToEvaluate = expressionToEvaluate.slice(0, -1);
      }

      // Return empty string if nothing to evaluate
      if (!expressionToEvaluate) return;

      // Check for division by zero before evaluation
      if (expressionToEvaluate.includes("/0")) {
        throw new Error("Division by zero");
      }

      const parser = new Parser();
      const expr = parser.parse(expressionToEvaluate);
      const result = expr.evaluate();

      // Check for Infinity or NaN results
      if (!isFinite(result) || isNaN(result)) {
        throw new Error("Invalid result");
      }

      // Format the result to avoid excessive decimal places
      // but preserve necessary precision
      const formattedResult = Number.isInteger(result)
        ? String(result)
        : parseFloat(result.toFixed(10)).toString();

      setExpression(formattedResult);
    } catch (error) {
      console.error("Calculation error:", error);
      setExpression("Error");

      // Reset after showing error
      setTimeout(() => {
        setExpression("");
      }, 1500);
    }
  };

  return {
    expression,
    handleButtonClick,
    handleReset,
    onEvaluate,
  };
};

export default useCalculator;
