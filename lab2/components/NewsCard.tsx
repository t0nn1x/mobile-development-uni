import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { NewsItem } from "../data/newsData";

interface NewsCardProps {
  news: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=3" }}
          style={styles.sourceAvatar}
        />
        <View style={styles.sourceInfo}>
          <View style={styles.sourceRow}>
            <Text style={[styles.sourceName, { color: colors.text }]}>
              {news.source}
            </Text>
            <View
              style={[styles.newsBadge, { backgroundColor: colors.accent }]}
            >
              <Text style={styles.newsBadgeText}>NEWS</Text>
            </View>
          </View>
          <Text style={[styles.dateTime, { color: colors.tabBarInactive }]}>
            {news.date} • {news.time}
          </Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={{ color: colors.tabBarInactive }}>•••</Text>
        </TouchableOpacity>
      </View>

      <Image source={{ uri: news.imageUri }} style={styles.image} />

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{news.title}</Text>
        <Text
          style={[styles.description, { color: colors.tabBarInactive }]}
          numberOfLines={2}
        >
          {news.content}
        </Text>

        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Text style={{ color: "#66c0f4" }}>👍</Text>
            <Text style={[styles.footerText, { color: colors.tabBarInactive }]}>
              {news.likes}
            </Text>
          </View>
          <View style={styles.footerItem}>
            <Text style={{ color: colors.tabBarInactive }}>💬</Text>
            <Text style={[styles.footerText, { color: colors.tabBarInactive }]}>
              {news.comments}
            </Text>
          </View>
          <View style={styles.footerItem}>
            <Text style={{ color: colors.tabBarInactive }}>↩️</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },
  sourceAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  sourceInfo: {
    flex: 1,
  },
  sourceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  sourceName: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 8,
  },
  newsBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  newsBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  dateTime: {
    fontSize: 12,
  },
  moreButton: {
    padding: 8,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    marginTop: 8,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  footerText: {
    marginLeft: 4,
    fontSize: 14,
  },
});
