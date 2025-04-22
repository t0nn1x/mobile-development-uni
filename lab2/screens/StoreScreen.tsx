import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { ThemeToggle } from "../components/ThemeToggle";
import { GameCard } from "../components/GameCard";
import { gamesData, categories, Game } from "../data/gamesData";

export default function StoreScreen() {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [games, setGames] = useState<Game[]>(gamesData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const featuredGame = games.find((game) => game.featured);

  const loadMoreGames = () => {
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
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_logo.png",
            }}
            style={styles.logo}
          />
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Store
          </Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={{ color: colors.tabBarInactive }}>🔍</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GameCard game={item} featured={item.id === featuredGame?.id} />
        )}
        ListHeaderComponent={() => (
          <View>
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
                        color:
                          selectedCategory === item.id ? "white" : colors.text,
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
        )}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreGames}
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
  logoContainer: {
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
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesContainer: {
    paddingHorizontal: 16,
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
  loaderContainer: {
    padding: 20,
    alignItems: "center",
  },
});
