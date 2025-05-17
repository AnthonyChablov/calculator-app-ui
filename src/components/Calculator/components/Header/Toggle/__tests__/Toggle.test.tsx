import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Toggle from "../Toggle";
import { useThemeStore } from "@/store/useThemeStore";

// Mock the useThemeStore hook
vi.mock("@/store/useThemeStore", () => ({
  useThemeStore: vi.fn(() => ({
    getThemeClass: vi.fn((key) => {
      // Return different class names based on key for testing
      switch (key) {
        case "textSecondary":
          return "text-secondary";
        case "textPrimary":
          return "text-primary";
        case "bgToggleKeypad":
          return "bg-toggle";
        case "keyShadow":
          return "shadow-test";
        case "keyBgAccent":
          return "bg-accent";
        case "keyBg":
          return "#e5e5e5";
        default:
          return "";
      }
    }),
  })),
}));

describe("Toggle.tsx", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render in the DOM", () => {
    // Act
    render(<Toggle title="toggle" />);
    const toggle = screen.getByText("toggle");
    // Assert
    expect(toggle).toBeInTheDocument();
  });

  it("should render with the correct title", () => {
    // Act
    render(<Toggle title="Custom Toggle" />);
    const toggle = screen.getByText("Custom Toggle");
    // Assert
    expect(toggle).toBeInTheDocument();
  });

  it("should render without title when not provided", () => {
    // Act
    render(<Toggle />);
    // Assert
    // Make sure we can find the main toggle container, but no title text
    expect(screen.getByText("1")).toBeInTheDocument(); // Find by text since buttons don't have accessible names
    expect(screen.queryByText("toggle")).not.toBeInTheDocument(); // No title should be present
  });

  it("should render all three theme buttons", () => {
    // Act
    render(<Toggle />);
    // Assert
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    // Also check that we have 3 button elements
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("should call onThemeChange when a theme is selected", () => {
    // Arrange
    const mockOnThemeChange = vi.fn();
    render(<Toggle onThemeChange={mockOnThemeChange} />);

    // Act
    // Get the button elements directly since they don't have accessible names
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]); // First button (theme 1)

    // Assert
    expect(mockOnThemeChange).toHaveBeenCalledWith(1);
  });

  it("should call onThemeChange with the correct theme number", () => {
    // Arrange
    const mockOnThemeChange = vi.fn();
    render(<Toggle onThemeChange={mockOnThemeChange} />);

    // Act - test each theme button
    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]); // First button (theme 1)
    expect(mockOnThemeChange).toHaveBeenCalledWith(1);

    fireEvent.click(buttons[1]); // Second button (theme 2)
    expect(mockOnThemeChange).toHaveBeenCalledWith(2);

    fireEvent.click(buttons[2]); // Third button (theme 3)
    expect(mockOnThemeChange).toHaveBeenCalledWith(3);
  });

  it("should apply the correct classes when initialTheme is 1", () => {
    // Act
    render(<Toggle title="Theme Toggle" initialTheme={1} />);

    // Assert - Use a test-id approach to verify class assignment
    const titleElement = screen.getByText("Theme Toggle");
    expect(titleElement.className).toContain("text-secondary");
  });

  it("should apply the correct classes when initialTheme is not 1", () => {
    // Act
    render(<Toggle title="Theme Toggle" initialTheme={2} />);

    // Assert
    const titleElement = screen.getByText("Theme Toggle");
    expect(titleElement.className).toContain("text-primary");
  });

  it("should apply active class to the selected theme button", () => {
    // Act
    const { rerender } = render(<Toggle initialTheme={2} />);

    // Get all theme buttons
    const buttons = screen.getAllByRole("button");

    // Theme 2 should have the active class (bg-accent)
    expect(buttons[1].className).toContain("bg-accent");

    // Other buttons should not have the active class
    expect(buttons[0].className).not.toContain("bg-accent");
    expect(buttons[2].className).not.toContain("bg-accent");

    // Rerender with a different initialTheme
    rerender(<Toggle initialTheme={3} />);

    // Now theme 3 should have the active class
    const updatedButtons = screen.getAllByRole("button");
    expect(updatedButtons[2].className).toContain("bg-accent");
  });

  it("should handle no onThemeChange prop gracefully", () => {
    // Act
    render(<Toggle />);
    const buttons = screen.getAllByRole("button");

    // Assert - no error should be thrown
    expect(() => {
      fireEvent.click(buttons[0]);
    }).not.toThrow();
  });
});
