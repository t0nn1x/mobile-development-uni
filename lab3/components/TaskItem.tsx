import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Task } from "../contexts/GameContext";
import Colors from "../constants/Colors";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <View
      style={[styles.container, task.completed && styles.completedContainer]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, task.completed && styles.completedText]}>
          {task.title}
        </Text>
        <Text
          style={[styles.description, task.completed && styles.completedText]}
        >
          {task.description}
        </Text>
      </View>
      <View
        style={[
          styles.statusIndicator,
          task.completed ? styles.completedIndicator : styles.pendingIndicator,
        ]}
      >
        <Text style={styles.statusText}>{task.completed ? "✓" : "!"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  completedContainer: {
    backgroundColor: "#E8F5E9",
    opacity: 0.8,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: Colors.text,
  },
  description: {
    fontSize: 14,
    color: Colors.lightText,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: Colors.lightText,
  },
  statusIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  completedIndicator: {
    backgroundColor: Colors.success,
  },
  pendingIndicator: {
    backgroundColor: Colors.warning,
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TaskItem;
