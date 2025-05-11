import { render, screen } from "@testing-library/react";
import HeaderText from "../HeaderText";
import { describe, it, expect } from "vitest";

describe("HeaderText.tsx", () => {
  it("should render in the DOM with the correct header text", () => {
    // Arrange
    const testHeader = "Header";

    // Act
    render(<HeaderText header={testHeader} />);
    const headerTextComponent = screen.getByText(testHeader);

    // Assert
    expect(headerTextComponent).toBeInTheDocument();
  });

  it("should render with the correct header level", () => {
    // Arrange
    const testHeader = "Header level 2";
    const headerLevel = "h2";

    // Act
    const { container } = render(
      <HeaderText header={testHeader} headerLevel={headerLevel} />
    );
    const headerTag = container.querySelector(headerLevel);

    // Assert
    expect(headerTag).toBeInTheDocument();
  });

  it("should apply additional class names", () => {
    // Arrange
    const testHeader = "Header";
    const customClass = "custom-class";

    // Act
    const { container } = render(
      <HeaderText header={testHeader} className={customClass} />
    );
    const firstChild = container.firstChild;

    // Assert
    expect(firstChild).toHaveClass(customClass);
  });

  it("should use the correct id when provided", () => {
    // Arrange
    const testHeader = "Header";
    const testId = "custom-header-id";

    // Act
    render(<HeaderText header={testHeader} id={testId} />);
    const headerDiv = screen.getByText(testHeader).parentElement;

    // Assert
    expect(headerDiv).toHaveAttribute("id", testId);
  });

  it("should default the id to header text if id is not provided", () => {
    // Arrange
    const testHeader = "Header";

    // Act
    render(<HeaderText header={testHeader} />);
    const headerDiv = screen.getByText(testHeader).parentElement;

    // Assert
    expect(headerDiv).toHaveAttribute("id", testHeader);
  });

  it("should default the header level to h1 if header level is not provided", () => {
    // Arrange
    const testHeader = "Header";

    // Act
    const { container } = render(<HeaderText header={testHeader} />);
    const headerTag = container.querySelector("h1");

    // Assert
    expect(headerTag).toBeInTheDocument();
  });
});
