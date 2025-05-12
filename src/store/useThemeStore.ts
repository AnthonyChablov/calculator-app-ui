import { create } from "zustand";
import { cn } from "@/utils/utils";
import { themeStyles, themeVariables } from "./themeVariables/themeVariables";

const MIN_THEME_VALUE = 1;
const MAX_THEME_VALUE = 3;

// Define a type for all possible theme variable keys
type ThemeVariableKey = keyof typeof themeVariables;
type ThemeStyleKey = keyof ReturnType<typeof themeStyles>;

interface ThemeStore {
  theme: number;
  setTheme: (newTheme: number) => void;
  getThemeClass: (key: ThemeVariableKey) => string;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: MIN_THEME_VALUE,
  setTheme: (newTheme) => {
    if (newTheme >= MIN_THEME_VALUE && newTheme <= MAX_THEME_VALUE) {
      set({ theme: newTheme });
    } else {
      console.warn(
        `Invalid theme value: ${newTheme}. Theme must be between ${MIN_THEME_VALUE} and ${MAX_THEME_VALUE}.`
      );
    }
  },
  // Flexible method to get theme class with optional prefix
  getThemeClass: (key: ThemeVariableKey) => {
    const { theme } = get();
    const fullKey =
      `${"color-theme"}-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}` as ThemeStyleKey;
    return themeStyles(theme)[fullKey];
  },
}));
