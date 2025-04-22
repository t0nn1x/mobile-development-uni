import React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ClickableObject from "../components/ClickableObject";
import Counter from "../components/Counter";
import Colors from "../constants/Colors";

type RootStackParamList = {
  Game: undefined;
  Tasks: undefined;
};

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, "Game">;

interface GameScreenProps {
  navigation: GameScreenNavigationProp;
}

const GameScreen: React.FC<GameScreenProps> = ({ navigation }) => {
  const navigateToTasks = () => {
    navigation.navigate("Tasks");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Clicker Game</Text>
      </View>

      <View style={styles.counterContainer}>
        <Counter navigateToTasks={navigateToTasks} />
      </View>

      <View style={styles.objectContainer}>
        <Text style={styles.instructionText}>
          Використовуйте різні жести для отримання очок!
        </Text>
        <ClickableObject />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Виконуйте завдання для гри!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  counterContainer: {
    padding: 20,
  },
  objectContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  instructionText: {
    fontSize: 16,
    color: Colors.text,
    textAlign: "center",
    marginBottom: 20,
  },
  footer: {
    padding: 15,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 14,
  },
});

export default GameScreen;
