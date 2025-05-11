import "@testing-library/jest-dom";
import { vi, beforeEach, afterEach } from "vitest";
// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});
