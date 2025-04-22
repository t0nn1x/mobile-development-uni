import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primary }]}
      onPress={toggleTheme}
    >
      <Text style={styles.text}>
        {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
