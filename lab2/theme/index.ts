import { Colors } from "../constants/Colors";

export const lightTheme = {
  ...Colors.light,
  text: Colors.light.text,
  background: Colors.light.background,
  card: Colors.light.card,
  primary: Colors.light.primary,
  secondary: Colors.light.secondary,
  accent: Colors.light.accent,
  tabBar: Colors.light.tabBar,
  tabBarActive: Colors.light.tabBarActive,
  tabBarInactive: Colors.light.tabBarInactive,
  border: Colors.light.border,
};

export const darkTheme = {
  ...Colors.dark,
  text: Colors.dark.text,
  background: Colors.dark.background,
  card: Colors.dark.card,
  primary: Colors.dark.primary,
  secondary: Colors.dark.secondary,
  accent: Colors.dark.accent,
  tabBar: Colors.dark.tabBar,
  tabBarActive: Colors.dark.tabBarActive,
  tabBarInactive: Colors.dark.tabBarInactive,
  border: Colors.dark.border,
};

export type ThemeType = typeof lightTheme;
