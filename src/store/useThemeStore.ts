import { create } from "zustand";

const MIN_THEME_VALUE = 1;
const MAX_THEME_VALUE = 3;

interface ThemeStore {
  theme: number; // Theme represents the current toggle step
  setTheme: (newTheme: number) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: MIN_THEME_VALUE, // Initialize with the minimum theme value
  setTheme: (newTheme) => {
    if (newTheme >= MIN_THEME_VALUE && newTheme <= MAX_THEME_VALUE) {
      set({ theme: newTheme });
    } else {
      console.warn(
        `Invalid theme value: ${newTheme}. Theme must be between ${MIN_THEME_VALUE} and ${MAX_THEME_VALUE}.`
      );
    }
  },
}));
