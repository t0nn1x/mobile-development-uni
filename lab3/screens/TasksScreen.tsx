import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import TaskItem from "../components/TaskItem";
import { useGame } from "../contexts/GameContext";
import Colors from "../constants/Colors";

type RootStackParamList = {
  Game: undefined;
  Tasks: undefined;
};

type TasksScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Tasks"
>;

interface TasksScreenProps {
  navigation: TasksScreenNavigationProp;
}

const TasksScreen: React.FC<TasksScreenProps> = ({ navigation }) => {
  const { tasks, score } = useGame();
  const [completedCount, setCompletedCount] = useState(0);
  const progressAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const count = tasks.filter((task) => task.completed).length;
    setCompletedCount(count);

    Animated.timing(progressAnim, {
      toValue: count / tasks.length,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [tasks]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Завдання</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Game")}
        >
          <Text style={styles.backButtonText}>Повернутися до гри</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Виконано: {completedCount} з {tasks.length}
        </Text>
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Поточний рахунок:</Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem task={item} />}
        contentContainerStyle={styles.listContainer}
      />
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
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  progressContainer: {
    padding: 20,
    backgroundColor: Colors.card,
    margin: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  progressText: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 10,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: Colors.success,
  },
  scoreContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreLabel: {
    color: "white",
    fontSize: 16,
  },
  scoreValue: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  listContainer: {
    padding: 15,
  },
});

export default TasksScreen;
