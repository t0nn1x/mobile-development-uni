import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useGame } from "../contexts/GameContext";
import Colors from "../constants/Colors";

interface CounterProps {
  navigateToTasks: () => void;
}

const Counter: React.FC<CounterProps> = ({ navigateToTasks }) => {
  const { score, resetGame } = useGame();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Рахунок:</Text>
      <Text style={styles.score}>{score}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>Скинути</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToTasks}>
          <Text style={styles.buttonText}>Завдання</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.card,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: Colors.text,
    marginBottom: 5,
  },
  score: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: Colors.button,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.buttonText,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Counter;
