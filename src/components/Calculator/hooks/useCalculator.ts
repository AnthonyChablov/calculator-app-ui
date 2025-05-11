import { useState } from "react";
import { Parser } from "expr-eval";

const OPERATORS = ["+", "-", "*", "/", "x"];

const useCalculator = () => {
  const [expression, setExpression] = useState("");

  const handleButtonClick = (value: string) => {
    if (value === "DEL") {
      setExpression((prevExpression) => prevExpression.slice(0, -1));
    } else if (OPERATORS.includes(value)) {
      // Allow minus sign at the beginning or after another operator
      if (
        value === "-" &&
        (!expression || OPERATORS.includes(expression.slice(-1)))
      ) {
        setExpression((prevExpression) => prevExpression + value);
      } else if (
        value !== "-" &&
        expression &&
        !OPERATORS.includes(expression.slice(-1))
      ) {
        setExpression(
          (prevExpression) => prevExpression + value.replace("x", "*")
        );
      }
    } else if (value === ".") {
      const lastNumber = expression.split(/[\+\-\*\/]/).pop();
      if (lastNumber && !lastNumber.includes(".")) {
        setExpression((prevExpression) => prevExpression + value);
      } else if (!expression) {
        setExpression("0.");
      }
    } else if (value === "Clear") {
      setExpression("");
    } else {
      setExpression((prevExpression) => prevExpression + value);
    }
  };

  const handleReset = () => {
    setExpression("");
  };

  const onEvaluate = () => {
    if (!expression) return;
    try {
      const parser = new Parser();
      const expr = parser.parse(expression.replace("x", "*"));
      setExpression(String(expr.evaluate()));
    } catch (error: any) {
      setExpression("Error");
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
