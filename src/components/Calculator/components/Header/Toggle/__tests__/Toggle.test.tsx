import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Toggle from "../Toggle";

describe("Toggle.tsx", () => {
  it("should render in the DOM", () => {
    // Act
    render(<Toggle title="toggle" />);
    const toggle = screen.getByText("toggle");
    // Assert
    expect(toggle).toBeInTheDocument();
  });

  it("should render with the correct title", () => {
    // Act
    render(<Toggle title="toggle" />);
    const toggle = screen.getByText("toggle");
    // Assert
    expect(toggle).toBeInTheDocument();
  });

  /* it("should call onThemeChange when a theme is selected", () => {
    // Arrange
    const mockOnThemeChange = vi.fn();
    render(<Toggle onThemeChange={mockOnThemeChange} />);

    // Act
    const button = screen.getByRole("button", { name: "1" });
    button.click();

    // Assert
    expect(mockOnThemeChange).toHaveBeenCalledWith(1);
  }); */
});
