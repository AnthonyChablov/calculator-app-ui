import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ParagraphText from "../../ParagraphText/ParagraphText";

describe("ParagraphText.tsx", () => {
  it("should render in the DOM with the correct paragraph text", () => {
    // Arrange
    const paragraphText = "text";

    // Act
    render(<ParagraphText text={paragraphText} />);
    const paragraphTextComponent = screen.getByText(paragraphText);

    // Assert
    expect(paragraphTextComponent);
  });

  describe("should render with the correct paragraph text sizes", () => {
    // Arrange
    const paragraphText = "text";
    const sizes: (
      | "sm"
      | "md"
      | "lg"
      | "xl"
      | "2xl"
      | "3xl"
      | "4xl"
      | "5xl"
      | "6xl"
    )[] = ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"];

    sizes.forEach((size) => {
      it(`should render paragraph with size ${size}`, () => {
        // Act
        render(<ParagraphText text={paragraphText} size={size} />);
        const paragraphTextComponent = screen.getByText(paragraphText);

        // Assert
        expect(paragraphTextComponent).toBeInTheDocument();
      });
    });
  });

  it("should apply additional class names", () => {
    // Arrange
    const paragraphText = "text";
    const paragraphTextClassName = "text-classname";

    // Act
    render(
      <ParagraphText className={paragraphTextClassName} text={paragraphText} />
    );
    const paragraphTextComponent = screen.getByText(paragraphText);

    // Assert
    expect(paragraphTextComponent).toHaveClass(paragraphTextClassName);
  });
});
