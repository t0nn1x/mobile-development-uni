import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { ThemeToggle } from "../components/ThemeToggle";

export default function ProfileScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: "#e74c3c" }]}>
            <Text style={styles.avatarText}>⚠️</Text>
          </View>
          <View style={styles.onlineIndicator} />
        </View>
        <Text style={[styles.username, { color: colors.text }]}>
          Хробуст Антон
        </Text>
        <Text style={[styles.groupText, { color: colors.tabBarInactive }]}>
          ІПЗ-21-5
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { borderBottomColor: colors.border }]}
        >
          <Text style={[styles.actionButtonText, { color: colors.text }]}>
            Settings
          </Text>
          <Text style={{ color: colors.tabBarInactive }}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { borderBottomColor: colors.border }]}
        >
          <Text style={[styles.actionButtonText, { color: colors.text }]}>
            Logout
          </Text>
          <Text style={{ color: colors.tabBarInactive }}>›</Text>
        </TouchableOpacity>
      </View>

      <ThemeToggle />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 30,
    color: "white",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#2ecc71",
    borderWidth: 2,
    borderColor: "white",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  groupText: {
    fontSize: 16,
  },
  actionsContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  actionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  actionButtonText: {
    fontSize: 16,
  },
});
