import { cn } from "../../utils/utils";

export const themeVariables = {
  bg: ["bg-theme-1-bg", "bg-theme-2-bg", "bg-theme-3-bg"],
  bgToggleKeypad: [
    "theme-1-bg-toggle-keypad",
    "theme-2-bg-toggle-keypad",
    "theme-3-bg-toggle-keypad",
  ],
  bgScreen: [
    "bg-theme-1-bg-screen",
    "bg-theme-2-bg-screen",
    "bg-theme-3-bg-screen",
  ],
  keyBg: ["theme-1-key-bg", "theme-2-key-bg", "theme-3-key-bg"],
  keyShadow: ["theme-1-key-shadow", "theme-2-key-shadow", "theme-3-key-shadow"],
  keyBgAccent: [
    "theme-1-key-bg-accent",
    "theme-2-key-bg-accent",
    "theme-3-key-bg-accent",
  ],
  keyShadowAccent: [
    "theme-1-key-shadow-accent",
    "theme-2-key-shadow-accent",
    "theme-3-key-shadow-accent",
  ],
  keyBgNeutral: [
    "theme-1-key-bg-neutral",
    "theme-2-key-bg-neutral",
    "theme-3-key-bg-neutral",
  ],
  keyShadowNeutral: [
    "theme-1-key-shadow-neutral",
    "theme-2-key-shadow-neutral",
    "theme-3-key-shadow-neutral",
  ],
  textPrimary: [
    "theme-1-text-primary",
    "theme-2-text-primary",
    "theme-3-text-primary",
  ],
  textSecondary: [
    "theme-1-text-secondary",
    "theme-2-text-secondary",
    "theme-3-text-secondary",
  ],
};

export const themeStyles = (theme: number) => {
  // Subtract 1 to use 0-based indexing for array access
  const themeIndex = theme - 1;

  return {
    "color-theme-bg": themeVariables.bg[themeIndex],
    "color-theme-bg-toggle-keypad": themeVariables.bgToggleKeypad[themeIndex],
    "color-theme-bg-screen": themeVariables.bgScreen[themeIndex],
    "color-theme-key-bg": themeVariables.keyBg[themeIndex],
    "color-theme-key-shadow": themeVariables.keyShadow[themeIndex],
    "color-theme-key-bg-accent": themeVariables.keyBgAccent[themeIndex],
    "color-theme-key-shadow-accent": themeVariables.keyShadowAccent[themeIndex],
    "color-theme-key-bg-neutral": themeVariables.keyBgNeutral[themeIndex],
    "color-theme-key-shadow-neutral":
      themeVariables.keyShadowNeutral[themeIndex],
    "color-theme-text-primary": themeVariables.textPrimary[themeIndex],
    "color-theme-text-secondary": themeVariables.textSecondary[themeIndex],
  };
};

// Utility function to get a specific theme class
export const getThemeClass = (
  key: keyof typeof themeVariables,
  theme: number
) => {
  // Subtract 1 to use 0-based indexing for array access
  const themeIndex = theme - 1;
  return themeVariables[key][themeIndex];
};
