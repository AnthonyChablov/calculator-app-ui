import { render, screen } from "@testing-library/react";
import Display from "../Display";
import { describe, it, expect } from "vitest";

describe("Display.tsx", () => {
  const defaultTheme = 1; // Define a default theme value

  it("should render in the DOM", () => {
    // Act
    render(<Display value="123" currentTheme={defaultTheme} />);
    const display = screen.getByText(/123/);

    // Assert
    expect(display).toBeInTheDocument();
  });

  it("should render with the correct className", () => {
    // Act
    render(
      <Display value="123" className="test-class" currentTheme={defaultTheme} />
    );
    const display = screen.getByText(/123/).parentElement;

    // Assert
    expect(display).toHaveClass(/test-class/);
  });

  it("should render with the correct data-testid", () => {
    // Act
    render(
      <Display value="123" dataTestId="test-id" currentTheme={defaultTheme} />
    );
    const display = screen.getByTestId("test-id");

    // Assert
    expect(display).toBeInTheDocument();
  });

  it("should render with the correct error message", () => {
    // Act
    render(<Display error="Error" currentTheme={defaultTheme} />);
    const display = screen.getByText(/Error/);

    // Assert
    expect(display).toBeInTheDocument();
  });

  it("should render with the correct value", () => {
    // Act
    render(<Display value="123" currentTheme={defaultTheme} />);
    const display = screen.getByText(/123/);

    // Assert
    expect(display).toBeInTheDocument();
  });

  it("should render the value first instead of the error message", () => {
    // Act
    render(<Display value="123" error="Error" currentTheme={defaultTheme} />);
    const display = screen.getByText(/123/);

    // Assert
    expect(display).toBeInTheDocument();
  });

  it("should render the error message if value is not provided", () => {
    // Act
    render(<Display error="Error" currentTheme={defaultTheme} />);
    const display = screen.getByText(/Error/);

    // Assert
    expect(display).toBeInTheDocument();
  });
});
