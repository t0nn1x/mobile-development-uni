import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { Game } from "../data/gamesData";

interface GameCardProps {
  game: Game;
  featured?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  featured = false,
}) => {
  const { colors } = useTheme();

  const renderPlatformIcons = () => {
    return (
      <View style={styles.platformContainer}>
        {game.platforms.includes("Windows") && (
          <Text style={{ color: colors.text }}>🖥️ Windows</Text>
        )}
        {game.platforms.includes("Mac") && (
          <Text style={{ color: colors.text }}>🍎 Mac</Text>
        )}
        {game.platforms.includes("Linux") && (
          <Text style={{ color: colors.text }}>🐧 Linux</Text>
        )}
      </View>
    );
  };

  if (featured) {
    return (
      <TouchableOpacity
        style={[styles.featuredCard, { backgroundColor: colors.card }]}
        activeOpacity={0.7}
      >
        <Image source={{ uri: game.imageUri }} style={styles.featuredImage} />
        <View style={styles.featuredContent}>
          <Text style={[styles.title, { color: colors.text }]}>
            {game.title}
          </Text>
          <Text style={[styles.recommendedBy, { color: colors.text }]}>
            Recommended by your friend, Player
          </Text>
          <View style={styles.priceContainer}>
            {game.discountPercentage && (
              <View
                style={[styles.discountBadge, { backgroundColor: "#4c6b22" }]}
              >
                <Text style={styles.discountText}>
                  -{game.discountPercentage}%
                </Text>
              </View>
            )}
            <View style={styles.pricesWrapper}>
              {game.discountedPrice !== undefined && (
                <>
                  <Text style={[styles.originalPrice, { color: colors.text }]}>
                    ${game.originalPrice}
                  </Text>
                  <Text
                    style={[styles.discountedPrice, { color: colors.text }]}
                  >
                    ${game.discountedPrice}
                  </Text>
                </>
              )}
              {game.discountedPrice === undefined && (
                <Text style={[styles.price, { color: colors.text }]}>
                  ${game.originalPrice}
                </Text>
              )}
            </View>
          </View>
          {renderPlatformIcons()}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      activeOpacity={0.7}
    >
      <Image source={{ uri: game.imageUri }} style={styles.image} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{game.title}</Text>
        {renderPlatformIcons()}
        <View style={styles.priceContainer}>
          {game.discountPercentage && (
            <View
              style={[styles.discountBadge, { backgroundColor: "#4c6b22" }]}
            >
              <Text style={styles.discountText}>
                -{game.discountPercentage}%
              </Text>
            </View>
          )}
          <View style={styles.pricesWrapper}>
            {game.discountedPrice !== undefined && (
              <>
                <Text style={[styles.originalPrice, { color: colors.text }]}>
                  ${game.originalPrice}
                </Text>
                <Text style={[styles.discountedPrice, { color: colors.text }]}>
                  ${game.discountedPrice}
                </Text>
              </>
            )}
            {game.discountedPrice === undefined && (
              <Text style={[styles.price, { color: colors.text }]}>
                ${game.originalPrice}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginVertical: 8,
    borderRadius: 4,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  image: {
    width: 120,
    height: 70,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  platformContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  discountBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: 8,
  },
  discountText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  pricesWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  originalPrice: {
    textDecorationLine: "line-through",
    marginRight: 5,
    fontSize: 12,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  featuredCard: {
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  featuredImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  featuredContent: {
    padding: 12,
  },
  recommendedBy: {
    fontSize: 14,
    marginBottom: 8,
    fontStyle: "italic",
  },
});
