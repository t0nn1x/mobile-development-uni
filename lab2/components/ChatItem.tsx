import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { ChatItem as ChatItemType } from "../data/chatsData";

interface ChatItemProps {
  chat: ChatItemType;
}

export const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
  const { colors } = useTheme();

  const getAvatarPlaceholder = () => {
    if (chat.userName === "Player123") {
      return (
        <View
          style={[styles.avatarPlaceholder, { backgroundColor: "#e74c3c" }]}
        >
          <Text style={styles.avatarPlaceholderText}>⚠️</Text>
        </View>
      );
    }
    return (
      <View style={[styles.avatarPlaceholder, { backgroundColor: "#34495e" }]}>
        <Text style={styles.avatarPlaceholderText}>?</Text>
      </View>
    );
  };

  const renderAvatar = () => {
    if (chat.avatarUri && chat.userName === "Σxprεssσ #=_-#") {
      return (
        <View style={styles.avatarContainer}>
          <Image source={{ uri: chat.avatarUri }} style={styles.avatar} />
          <Text style={styles.diamondBadge}>💎</Text>
        </View>
      );
    } else if (chat.avatarUri && chat.userName === "Mark Dyson") {
      return (
        <View style={styles.avatarContainer}>
          <View style={styles.avatarOrange}>
            <Text style={styles.avatarText}>😎</Text>
          </View>
          {chat.isOnline && <View style={styles.onlineIndicator} />}
        </View>
      );
    } else if (chat.userName === "Player123") {
      return (
        <View style={styles.avatarContainer}>
          <View style={styles.avatarRed}>
            <Text style={styles.avatarText}>⚠️</Text>
          </View>
          {chat.isOnline && <View style={styles.onlineIndicator} />}
          {!chat.isOnline && <View style={styles.offlineIndicator} />}
        </View>
      );
    } else {
      return (
        <View style={styles.avatarContainer}>
          <View style={styles.avatarDefault}>
            <Text style={styles.avatarText}>?</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.background }]}
      activeOpacity={0.7}
    >
      {renderAvatar()}
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={[styles.username, { color: colors.text }]}>
            {chat.userName}
          </Text>
        </View>
        <View style={styles.messageContainer}>
          {chat.isUser && (
            <Text style={{ color: colors.tabBarInactive }}>You: </Text>
          )}
          <Text
            style={[styles.message, { color: colors.tabBarInactive }]}
            numberOfLines={1}
          >
            {chat.lastMessage}
          </Text>
          <Text style={[styles.date, { color: colors.tabBarInactive }]}>
            {" "}
            • {chat.date}
          </Text>
        </View>
      </View>
      {chat.unreadCount && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{chat.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarOrange: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e67e22",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarRed: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarDefault: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#34495e",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2ecc71",
    borderWidth: 1,
    borderColor: "white",
  },
  offlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3498db",
    borderWidth: 1,
    borderColor: "white",
  },
  diamondBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    fontSize: 12,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  messageContainer: {
    flexDirection: "row",
    marginTop: 2,
  },
  message: {
    fontSize: 14,
    flex: 1,
  },
  date: {
    fontSize: 14,
    marginLeft: 4,
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  unreadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarPlaceholderText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
