import React, { createContext, useState, useContext, ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { lightTheme, darkTheme, ThemeType } from "../theme";

type ThemeContextProps = {
  theme: "light" | "dark";
  colors: typeof lightTheme | typeof darkTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("dark"); // Default theme is dark to match Steam

  const toggleTheme = () => {
    setThemeMode((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const themeColors = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider
      value={{
        theme: themeMode,
        colors: themeColors,
        toggleTheme,
      }}
    >
      <StyledThemeProvider theme={themeColors}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
