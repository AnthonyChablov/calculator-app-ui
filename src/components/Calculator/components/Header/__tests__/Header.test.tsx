import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "../Header";

describe("Header.tsx", () => {
  it("should render in the DOM", () => {
    // Act
    render(
      <Header headerTitle="calc" toggleTitle="THEME" onThemeChange={() => {}} />
    );
    const buttonGrid = screen.getByTestId("calculator-header");

    // Assert
    expect(buttonGrid).toBeInTheDocument();
  });
  it("should render with the correct className", () => {
    // Act
    render(
      <Header headerTitle="calc" toggleTitle="THEME" onThemeChange={() => {}} />
    );
    const buttonGrid = screen.getByTestId("calculator-header");

    // Assert
    expect(buttonGrid).toHaveClass(/flex/);
  });

  it("should render with the correct titles", () => {
    // Act
    render(
      <Header headerTitle="calc" toggleTitle="THEME" onThemeChange={() => {}} />
    );
    const headerText = screen.getByText(/calc/i);
    const toggleText = screen.getByText(/THEME/i);

    // Assert
    expect(headerText).toBeInTheDocument();
    expect(toggleText).toBeInTheDocument();
  });
});
