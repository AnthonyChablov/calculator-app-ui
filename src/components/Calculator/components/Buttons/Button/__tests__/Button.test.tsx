import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Button from "../Button";
import { describe, it, expect } from "vitest";

describe("Button.tsx", () => {
  it("should render in the DOM", () => {
    // Act
    render(<Button label="test" />);
    const button = screen.getByRole("button", { name: /test/ });

    // Assert
    expect(button).toBeInTheDocument();
  });

  it("should render in the DOM with correct classname", () => {
    // Act
    render(<Button label="test" className="bg-blue-200" />);
    const button = screen.getByRole("button", { name: /test/ });

    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-blue-200");
  });

  it("should render in the DOM with correct aria-label", () => {
    // Act
    render(<Button label="test" aria-label="test-aria" />);
    const button = screen.getByRole("button", { name: /test-aria/ });

    // Assert
    expect(button).toBeInTheDocument();
  });

  it("should render in the DOM with correct aria-describedby", () => {
    // Act
    render(<Button label="test" aria-describedby="test-describe" />);
    const button = screen.getByRole("button", { name: /test/ });
    const ariaDescribedBy = button.getAttribute("aria-describedby");

    // Assert
    expect(button).toBeInTheDocument();
  });

  it("should call onClick function when clicked", () => {
    // Arrange
    const handleClick = vi.fn();
    render(<Button label="test" onClick={handleClick} />);
    const button = screen.getByRole("button", { name: /test/ });

    // Act
    button.click();

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
