import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ButtonGrid from "../ButtonGrid";
import { buttonLayout } from "@/components/Calculator/data/buttonLayout";

// Set up mock functions - Stubs - these will be passed as props.
const mockOnButtonClick = vi.fn();
const mockResetGrid = vi.fn();
const mockOnEvaluate = vi.fn();

describe("ButtonGrid.tsx", () => {
  it("should render in the DOM", () => {
    // Act
    render(
      <ButtonGrid
        onButtonClick={mockOnButtonClick}
        resetGrid={mockResetGrid}
        onEvaluate={mockOnEvaluate}
      />
    );
    const buttonGrid = screen.getByTestId("calculator-button-grid");

    // Assert
    expect(buttonGrid).toBeInTheDocument();
  });

  it("should render with the correct className", () => {
    // Act
    render(
      <ButtonGrid
        onButtonClick={mockOnButtonClick}
        resetGrid={mockResetGrid}
        onEvaluate={mockOnEvaluate}
      />
    );
    const buttonGrid = screen.getByTestId("calculator-button-grid");

    // Assert
    expect(buttonGrid).toHaveClass(/p-8/);
  });

  it("should render with the correct data-testid", () => {
    // Act
    render(
      <ButtonGrid
        onButtonClick={mockOnButtonClick}
        resetGrid={mockResetGrid}
        onEvaluate={mockOnEvaluate}
      />
    );
    const buttonGrid = screen.getByTestId("calculator-button-grid");

    // Assert
    expect(buttonGrid).toBeInTheDocument();
  });

  it("should render the correct number of buttons", () => {
    // Act
    render(
      <ButtonGrid
        onButtonClick={mockOnButtonClick}
        resetGrid={mockResetGrid}
        onEvaluate={mockOnEvaluate}
      />
    );
    const buttons = screen.getAllByRole("button");

    // Assert
    expect(buttons.length).toBe(buttonLayout.flat().length + 2); // +2 for Reset and Equals
  });

  it("should call onButtonClick when a button is clicked", () => {
    // Act
    render(
      <ButtonGrid
        onButtonClick={mockOnButtonClick}
        resetGrid={mockResetGrid}
        onEvaluate={mockOnEvaluate}
      />
    );
    const button = screen.getByText("1");
    button.click();

    // Assert
    expect(mockOnButtonClick).toHaveBeenCalledWith("1");
    expect(mockOnButtonClick).toHaveBeenCalledOnce();
    expect(mockResetGrid).not.toHaveBeenCalled();
    expect(mockOnEvaluate).not.toHaveBeenCalled();
  });

  it("should call resetGrid when Reset button is clicked", () => {
    // Act
    render(
      <ButtonGrid
        onButtonClick={mockOnButtonClick}
        resetGrid={mockResetGrid}
        onEvaluate={mockOnEvaluate}
      />
    );
    const resetButton = screen.getByText("Reset");
    resetButton.click();

    // Assert
    expect(mockResetGrid).toHaveBeenCalledOnce();
    expect(mockOnButtonClick).not.toHaveBeenCalled();
    expect(mockOnEvaluate).not.toHaveBeenCalled();
  });

  it("should call onEvaluate when Equals button is clicked", () => {
    // Act
    render(
      <ButtonGrid
        onButtonClick={mockOnButtonClick}
        resetGrid={mockResetGrid}
        onEvaluate={mockOnEvaluate}
      />
    );
    const equalsButton = screen.getByText("=");
    equalsButton.click();

    // Assert
    expect(mockOnEvaluate).toHaveBeenCalledOnce();
    expect(mockOnButtonClick).not.toHaveBeenCalled();
    expect(mockResetGrid).toHaveBeenCalledOnce();
  });

  it("should call resetGrid and onEvaluate when Equals button is clicked", () => {
    // Act
    render(
      <ButtonGrid
        onButtonClick={mockOnButtonClick}
        resetGrid={mockResetGrid}
        onEvaluate={mockOnEvaluate}
      />
    );
    const equalsButton = screen.getByText("=");
    equalsButton.click();

    // Assert
    expect(mockResetGrid).toHaveBeenCalledOnce();
    expect(mockOnEvaluate).toHaveBeenCalledOnce();
  });

  it("should delete the last character when DEL button is clicked", () => {
    // Act
    render(
      <ButtonGrid
        onButtonClick={mockOnButtonClick}
        resetGrid={mockResetGrid}
        onEvaluate={mockOnEvaluate}
      />
    );
    const delButton = screen.getByText("DEL");
    delButton.click();

    // Assert
    expect(mockOnButtonClick).toHaveBeenCalledWith("DEL");
  });
  it("should call onButtonClick with the correct value when a button is clicked", () => {
    // Act
    render(
      <ButtonGrid
        onButtonClick={mockOnButtonClick}
        resetGrid={mockResetGrid}
        onEvaluate={mockOnEvaluate}
      />
    );
    const button = screen.getByText("4");
    button.click();

    // Assert
    expect(mockOnButtonClick).toHaveBeenCalledWith("4");
  });
});
