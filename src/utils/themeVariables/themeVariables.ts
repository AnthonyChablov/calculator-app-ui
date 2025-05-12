// utils/themeVariables.ts
export const themeVariables = {
  bg: (theme: number) => `--color-theme-${theme}-bg`,
  bgToggleKeypad: (theme: number) => `--color-theme-${theme}-bg-toggle-keypad`,
  bgScreen: (theme: number) => `--color-theme-${theme}-bg-screen`,
  keyBg: (theme: number) => `--color-theme-${theme}-key-bg`,
  keyShadow: (theme: number) => `--color-theme-${theme}-key-shadow`,
  keyBgAccent: (theme: number) => `--color-theme-${theme}-key-bg-accent`,
  keyShadowAccent: (theme: number) =>
    `--color-theme-${theme}-key-shadow-accent`,
  keyBgNeutral: (theme: number) => `--color-theme-${theme}-key-bg-neutral`,
  keyShadowNeutral: (theme: number) =>
    `--color-theme-${theme}-key-shadow-neutral`,
  textPrimary: (theme: number) => `--color-theme-${theme}-text-primary`,
  textSecondary: (theme: number) => `--color-theme-${theme}-text-secondary`,
};

export const themeStyles = (theme: number) => ({
  "--color-theme-bg": `var(${themeVariables.bg(theme)})`,
  "--color-theme-bg-toggle-keypad": `var(${themeVariables.bgToggleKeypad(theme)})`,
  "--color-theme-bg-screen": `var(${themeVariables.bgScreen(theme)})`,
  "--color-theme-key-bg": `var(${themeVariables.keyBg(theme)})`,
  "--color-theme-key-shadow": `var(${themeVariables.keyShadow(theme)})`,
  "--color-theme-key-bg-accent": `var(${themeVariables.keyBgAccent(theme)})`,
  "--color-theme-key-shadow-accent": `var(${themeVariables.keyShadowAccent(theme)})`,
  "--color-theme-key-bg-neutral": `var(${themeVariables.keyBgNeutral(theme)})`,
  "--color-theme-key-shadow-neutral": `var(${themeVariables.keyShadowNeutral(theme)})`,
  "--color-theme-text-primary": `var(${themeVariables.textPrimary(theme)})`,
  "--color-theme-text-secondary": `var(${themeVariables.textSecondary(theme)})`,
});
