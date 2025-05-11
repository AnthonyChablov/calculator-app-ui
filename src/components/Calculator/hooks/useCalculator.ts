import { useState } from "react";
import { Parser } from "expr-eval";

const useCalculator = () => {
  const [expression, setExpression] = useState("");

  const handleButtonClick = (value: string) => {
    if (value === "DEL") {
      setExpression((prevExpression) => prevExpression.slice(0, -1));
    } else if (["+", "-", "*", "/"].includes(value)) {
      // Prevent consecutive operators and operators at the beginning
      if (expression && !["+", "-", "*", "/"].includes(expression.slice(-1))) {
        setExpression(
          (prevExpression) => prevExpression + value.replace("x", "*")
        );
      }
    } else if (value === ".") {
      // Prevent multiple decimal points in the same number
      const lastNumber = expression.split(/[\+\-\*\/]/).pop();
      if (lastNumber && !lastNumber.includes(".")) {
        setExpression((prevExpression) => prevExpression + value);
      } else if (!expression) {
        setExpression("0."); // Allow starting with a decimal
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
