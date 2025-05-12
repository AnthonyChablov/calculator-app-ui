import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Calculator from "../Calculator";

describe("Calculator.tsx", () => {
  it("should render in the DOM", () => {
    // Act
    render(<Calculator />);
    const calculator = screen.getByTestId("calculator");

    // Assert
    expect(calculator).toBeInTheDocument();
  });
});
