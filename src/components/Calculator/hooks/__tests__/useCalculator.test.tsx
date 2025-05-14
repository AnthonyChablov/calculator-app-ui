import { render, screen, fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useCalculator from "../useCalculator";

// Test wrapper component to expose hook functionality in the DOM
const TestComponent = () => {
  const { expression, handleButtonClick, handleReset, onEvaluate } =
    useCalculator();

  return (
    <div>
      <div data-testid="expression">{expression}</div>
      <button data-testid="btn-1" onClick={() => handleButtonClick("1")}>
        1
      </button>
      <button data-testid="btn-2" onClick={() => handleButtonClick("2")}>
        2
      </button>
      <button data-testid="btn-3" onClick={() => handleButtonClick("3")}>
        3
      </button>
      <button data-testid="btn-4" onClick={() => handleButtonClick("4")}>
        4
      </button>
      <button data-testid="btn-5" onClick={() => handleButtonClick("5")}>
        5
      </button>
      <button data-testid="btn-6" onClick={() => handleButtonClick("6")}>
        6
      </button>
      <button data-testid="btn-0" onClick={() => handleButtonClick("0")}>
        0
      </button>
      <button data-testid="btn-plus" onClick={() => handleButtonClick("+")}>
        +
      </button>
      <button data-testid="btn-minus" onClick={() => handleButtonClick("-")}>
        -
      </button>
      <button data-testid="btn-multiply" onClick={() => handleButtonClick("x")}>
        x
      </button>
      <button data-testid="btn-divide" onClick={() => handleButtonClick("/")}>
        /
      </button>
      <button data-testid="btn-equals" onClick={onEvaluate}>
        =
      </button>
      <button
        data-testid="btn-clear"
        onClick={() => handleButtonClick("Clear")}
      >
        Clear
      </button>
      <button data-testid="btn-del" onClick={() => handleButtonClick("DEL")}>
        DEL
      </button>
      <button data-testid="btn-decimal" onClick={() => handleButtonClick(".")}>
        .
      </button>
      <button data-testid="btn-reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

describe("useCalculator", () => {
  beforeEach(() => {
    // Reset the jsdom environment before each test
    document.body.innerHTML = "";
  });

  describe("Initial state", () => {
    it("should initialize with an empty expression", () => {
      const { result } = renderHook(() => useCalculator());
      expect(result.current.expression).toBe("");
    });
  });

  describe("Number input handling", () => {
    it("should update expression when number buttons are clicked", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-1"));
      fireEvent.click(screen.getByTestId("btn-2"));
      fireEvent.click(screen.getByTestId("btn-3"));

      expect(screen.getByTestId("expression").textContent).toBe("123");
    });

    it("should handle leading zero correctly", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-0"));
      expect(screen.getByTestId("expression").textContent).toBe("0");

      fireEvent.click(screen.getByTestId("btn-1"));
      expect(screen.getByTestId("expression").textContent).toBe("1");
    });

    it("should allow decimal numbers", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-1"));
      fireEvent.click(screen.getByTestId("btn-decimal"));
      fireEvent.click(screen.getByTestId("btn-5"));

      expect(screen.getByTestId("expression").textContent).toBe("1.5");
    });

    it("should add 0 before decimal if expression is empty", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-decimal"));
      fireEvent.click(screen.getByTestId("btn-5"));

      expect(screen.getByTestId("expression").textContent).toBe("0.5");
    });

    it("should not allow multiple decimal points in the same number", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-1"));
      fireEvent.click(screen.getByTestId("btn-decimal"));
      fireEvent.click(screen.getByTestId("btn-5"));
      fireEvent.click(screen.getByTestId("btn-decimal"));

      expect(screen.getByTestId("expression").textContent).toBe("1.5");
    });
  });

  describe("Operator handling", () => {
    it("should add operators to the expression", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-1"));
      fireEvent.click(screen.getByTestId("btn-plus"));
      fireEvent.click(screen.getByTestId("btn-2"));

      expect(screen.getByTestId("expression").textContent).toBe("1+2");
    });

    it("should not allow operators (except minus) at the beginning of expression", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-plus"));
      expect(screen.getByTestId("expression").textContent).toBe("");

      fireEvent.click(screen.getByTestId("btn-minus"));
      expect(screen.getByTestId("expression").textContent).toBe("-");
    });

    it("should handle consecutive operators correctly", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-1"));
      fireEvent.click(screen.getByTestId("btn-plus"));
      fireEvent.click(screen.getByTestId("btn-minus"));

      expect(screen.getByTestId("expression").textContent).toBe("1-");
    });

    it("should allow minus after other operators for negative numbers", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-1"));
      fireEvent.click(screen.getByTestId("btn-plus"));
      fireEvent.click(screen.getByTestId("btn-minus"));
      fireEvent.click(screen.getByTestId("btn-2"));

      expect(screen.getByTestId("expression").textContent).toBe("1-2");
    });

    it("should convert 'x' button clicks to multiplication operator '*'", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-2"));
      fireEvent.click(screen.getByTestId("btn-multiply"));
      fireEvent.click(screen.getByTestId("btn-3"));

      expect(screen.getByTestId("expression").textContent).toBe("2*3");
    });

    it("should not add multiplication operator if previous character is an operator", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-2"));
      fireEvent.click(screen.getByTestId("btn-plus"));
      fireEvent.click(screen.getByTestId("btn-multiply"));

      expect(screen.getByTestId("expression").textContent).toBe("2+");
    });
  });

  describe("Editing and clearing functionality", () => {
    it("should delete the last character when DEL is clicked", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-1"));
      fireEvent.click(screen.getByTestId("btn-2"));
      fireEvent.click(screen.getByTestId("btn-3"));
      fireEvent.click(screen.getByTestId("btn-del"));

      expect(screen.getByTestId("expression").textContent).toBe("12");
    });

    it("should clear the expression when Clear is clicked", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-1"));
      fireEvent.click(screen.getByTestId("btn-2"));
      fireEvent.click(screen.getByTestId("btn-clear"));

      expect(screen.getByTestId("expression").textContent).toBe("");
    });

    it("should reset the expression when reset is called", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-1"));
      fireEvent.click(screen.getByTestId("btn-2"));
      fireEvent.click(screen.getByTestId("btn-reset"));

      expect(screen.getByTestId("expression").textContent).toBe("");
    });
  });

  describe("Expression evaluation", () => {
    it("should evaluate basic addition correctly", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-2"));
      fireEvent.click(screen.getByTestId("btn-plus"));
      fireEvent.click(screen.getByTestId("btn-3"));
      fireEvent.click(screen.getByTestId("btn-equals"));

      expect(screen.getByTestId("expression").textContent).toBe("5");
    });

    it("should evaluate basic subtraction correctly", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-5"));
      fireEvent.click(screen.getByTestId("btn-minus"));
      fireEvent.click(screen.getByTestId("btn-3"));
      fireEvent.click(screen.getByTestId("btn-equals"));

      expect(screen.getByTestId("expression").textContent).toBe("2");
    });

    it("should evaluate basic multiplication correctly", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-2"));
      fireEvent.click(screen.getByTestId("btn-multiply"));
      fireEvent.click(screen.getByTestId("btn-3"));
      fireEvent.click(screen.getByTestId("btn-equals"));

      expect(screen.getByTestId("expression").textContent).toBe("6");
    });

    it("should evaluate basic division correctly", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-6"));
      fireEvent.click(screen.getByTestId("btn-divide"));
      fireEvent.click(screen.getByTestId("btn-2"));
      fireEvent.click(screen.getByTestId("btn-equals"));

      expect(screen.getByTestId("expression").textContent).toBe("3");
    });

    it("should handle decimal results correctly", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-1"));
      fireEvent.click(screen.getByTestId("btn-divide"));
      fireEvent.click(screen.getByTestId("btn-4"));
      fireEvent.click(screen.getByTestId("btn-equals"));

      expect(screen.getByTestId("expression").textContent).toBe("0.25");
    });

    it("should handle expressions ending with operators", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-5"));
      fireEvent.click(screen.getByTestId("btn-plus"));
      fireEvent.click(screen.getByTestId("btn-equals"));

      expect(screen.getByTestId("expression").textContent).toBe("5");
    });

    it("should handle complex expressions with multiple operations", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-2"));
      fireEvent.click(screen.getByTestId("btn-plus"));
      fireEvent.click(screen.getByTestId("btn-3"));
      fireEvent.click(screen.getByTestId("btn-multiply"));
      fireEvent.click(screen.getByTestId("btn-4"));
      fireEvent.click(screen.getByTestId("btn-minus"));
      fireEvent.click(screen.getByTestId("btn-1"));
      fireEvent.click(screen.getByTestId("btn-equals"));

      expect(screen.getByTestId("expression").textContent).toBe("13");
    });

    it("should handle negative numbers correctly", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-minus"));
      fireEvent.click(screen.getByTestId("btn-5"));
      fireEvent.click(screen.getByTestId("btn-plus"));
      fireEvent.click(screen.getByTestId("btn-2"));
      fireEvent.click(screen.getByTestId("btn-equals"));

      expect(screen.getByTestId("expression").textContent).toBe("-3");
    });

    it("should display 'Error' for invalid expressions", () => {
      // Mock console.error to prevent error messages during test
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});

      render(<TestComponent />);

      // Create an invalid expression by division by zero
      fireEvent.click(screen.getByTestId("btn-5"));
      fireEvent.click(screen.getByTestId("btn-divide"));
      fireEvent.click(screen.getByTestId("btn-0"));
      fireEvent.click(screen.getByTestId("btn-equals"));

      expect(screen.getByTestId("expression").textContent).toBe("Error");

      // Wait for the timeout to clear the error message
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(screen.getByTestId("expression").textContent).toBe("");
          spy.mockRestore();
          resolve(null);
        }, 1600);
      });
    });
  });

  describe("Edge cases", () => {
    it("should not evaluate an empty expression", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-equals"));

      expect(screen.getByTestId("expression").textContent).toBe("");
    });

    it("should handle consecutive operator replacements correctly", () => {
      render(<TestComponent />);

      fireEvent.click(screen.getByTestId("btn-1"));
      fireEvent.click(screen.getByTestId("btn-plus"));
      fireEvent.click(screen.getByTestId("btn-plus")); // Should replace the first +

      expect(screen.getByTestId("expression").textContent).toBe("1+");

      fireEvent.click(screen.getByTestId("btn-minus")); // Should replace + with -
      expect(screen.getByTestId("expression").textContent).toBe("1-");
    });
  });
});
