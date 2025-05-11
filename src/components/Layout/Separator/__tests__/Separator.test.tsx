import { render, screen } from "@testing-library/react";
import Separator from "../Separator";
import { describe, it, expect } from "vitest";

describe("Separator.tsx", () => {
  it("should render in the DOM", () => {
    // Arrange & Act
    render(<Separator />);
    const separatorComponent = screen.getByTestId("separator");

    // Assert
    expect(separatorComponent).toBeInTheDocument();
  });

  it("should render with custom classnames", () => {
    // Arrange
    const customClassName = "custom-classname";

    // Act
    render(<Separator className={customClassName} />);
    const separatorComponent = screen.getByTestId("separator");

    // Assert
    expect(separatorComponent).toBeInTheDocument();
  });

  it("should render with correct size", () => {
    // Arrange
    const size = "small";

    // Act
    render(<Separator className={size} />);
    const separatorComponent = document.getElementById(`${size}-separator`);

    // Assert
    expect(separatorComponent).toBeInTheDocument();
  });
});
