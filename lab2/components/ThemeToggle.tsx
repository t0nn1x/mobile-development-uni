import React from "react";
import styled from "styled-components/native";
import { useTheme } from "../contexts/ThemeContext";

const ToggleButton = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  align-items: center;
  background-color: ${(props) => props.theme.primary};
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleButton onPress={toggleTheme}>
      <ButtonText>
        {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </ButtonText>
    </ToggleButton>
  );
};
