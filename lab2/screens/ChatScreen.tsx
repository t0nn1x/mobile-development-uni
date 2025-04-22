import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { ChatItem } from "../components/ChatItem";
import { chatsData } from "../data/chatsData";
import { ThemeToggle } from "../components/ThemeToggle";

export default function ChatScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState("open");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMoreChats = () => {
    if (loading) return;

    setLoading(true);

    // Simulate loading more data
    setTimeout(() => {
      setPage(page + 1);
      setLoading(false);
    }, 1000);
  };

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_logo.png",
          }}
          style={styles.logo}
        />
        <Text style={[styles.headerTitle, { color: colors.text }]}>Chat</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={{ color: colors.tabBarInactive }}>🔍</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "open"
              ? {
                  backgroundColor: colors.card,
                  borderBottomWidth: 2,
                  borderBottomColor: colors.primary,
                }
              : { backgroundColor: "transparent" },
          ]}
          onPress={() => setActiveTab("open")}
        >
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === "open" ? colors.text : colors.tabBarInactive,
              },
            ]}
          >
            Open chats
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "friends"
              ? {
                  backgroundColor: colors.card,
                  borderBottomWidth: 2,
                  borderBottomColor: colors.primary,
                }
              : { backgroundColor: "transparent" },
          ]}
          onPress={() => setActiveTab("friends")}
        >
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === "friends" ? colors.text : colors.tabBarInactive,
              },
            ]}
          >
            My friends
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={chatsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem chat={item} />}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreChats}
        onEndReachedThreshold={0.5}
      />

      <ThemeToggle />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontWeight: "bold",
  },
  loaderContainer: {
    padding: 20,
    alignItems: "center",
  },
});
