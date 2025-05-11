import { expect, it, describe, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useLocalStorage } from "../useLocalStorage";

// Mock localStorage
beforeEach(() => {
  vi.spyOn(global.Storage.prototype, "getItem").mockImplementation(() => null);
  vi.spyOn(global.Storage.prototype, "setItem").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useLocalStorage.tsx", () => {
  it("should initialize with a default value if localStorage is empty", () => {
    // Arrange: Set up the mock environment
    const key = "testKey";
    const defaultValue = "defaultValue";

    // Act: Render the hook
    const { result } = renderHook(() => useLocalStorage(key, defaultValue));

    // Assert: Check expected behavior
    expect(result.current.value).toBe(defaultValue);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(defaultValue)
    );
    expect(result.current.isLoading).toBe(false);
  });

  it("should retrieve the stored value from localStorage if it exists", () => {
    // Arrange: Mock localStorage with a stored value
    const key = "existingKey";
    const storedValue = "storedValue";
    vi.spyOn(global.Storage.prototype, "getItem").mockReturnValue(
      JSON.stringify(storedValue)
    );

    // Act
    const { result } = renderHook(() => useLocalStorage(key, "defaultValue"));

    // Assert
    expect(result.current.value).toBe(storedValue);
    expect(localStorage.getItem).toHaveBeenCalledWith(key);
  });

  it("should update localStorage and state when setStoredValue is called", () => {
    // Arrange
    const key = "testKey";
    const defaultValue = "initialValue";
    const newValue = "newValue";

    const { result } = renderHook(() => useLocalStorage(key, defaultValue));

    // Act
    act(() => {
      result.current.setStoredValue(newValue);
    });

    // Assert
    expect(result.current.value).toBe(newValue);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(newValue)
    );
  });

  it("should update isLoading to false after data has been retrieved", async () => {
    // Arrange: Set up mock localStorage with a stored value
    const key = "testKey";
    const storedValue = "storedValue";
    vi.spyOn(global.Storage.prototype, "getItem").mockReturnValue(
      JSON.stringify(storedValue)
    );

    // Act: Render the hook
    const { result } = renderHook(() => useLocalStorage(key, "defaultValue"));

    // Wait for the effect to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Assert: After loading, the isLoading state should be false
    expect(result.current.value).toBe(storedValue);
    expect(result.current.isLoading).toBe(false);
  });
});
