import { cn } from "../utils";
import { describe, it, expect } from "vitest";

describe("cn()", () => {
  it("should return the single className", () => {
    // Act
    const result = cn("text-red-500");

    // Assert
    expect(result).toBe("text-red-500");
  });

  it("should merge multiple class names", () => {
    // Act
    const result = cn("text-red-500", "bg-blue-500");

    // Assert
    expect(result).toBe("text-red-500 bg-blue-500");
  });

  it("should merge conflicting class names using twMerge", () => {
    // Act
    const result = cn("text-red-500", "text-blue-500");

    // Assert
    expect(result).toBe("text-blue-500"); // twMerge should resolve the conflict to "text-blue-500"
  });

  it("should ignore falsy values like undefined or null", () => {
    // Act
    const result = cn("text-red-500", undefined, "bg-blue-500", null);

    // Assert
    expect(result).toBe("text-red-500 bg-blue-500"); // should not include undefined or null
  });
});
