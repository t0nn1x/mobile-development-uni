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
import { NewsCard } from "../components/NewsCard";
import { newsData, categories } from "../data/newsData";
import { ThemeToggle } from "../components/ThemeToggle";

export default function CommunityScreen() {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMoreNews = () => {
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
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_logo.png",
            }}
            style={styles.logo}
          />
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Community
          </Text>
        </View>
        <Text style={[styles.headerSubtitle, { color: colors.tabBarInactive }]}>
          Community and official content for all games and software
        </Text>
      </View>

      <View style={styles.categoriesRow}>
        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: colors.card }]}
        >
          <Text style={{ color: colors.tabBarInactive }}>🔍</Text>
        </TouchableOpacity>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item.id
                  ? { backgroundColor: colors.primary }
                  : { backgroundColor: colors.card },
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  {
                    color: selectedCategory === item.id ? "white" : colors.text,
                  },
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        />
      </View>

      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NewsCard news={item} />}
        contentContainerStyle={styles.newsContainer}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreNews}
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
  headerContainer: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  categoriesRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontWeight: "bold",
  },
  newsContainer: {
    paddingHorizontal: 16,
  },
  loaderContainer: {
    padding: 20,
    alignItems: "center",
  },
});
