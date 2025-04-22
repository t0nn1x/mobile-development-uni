import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "../contexts/ThemeContext";

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { colors } = useTheme();

  const getIconForRoute = (routeName: string, isFocused: boolean) => {
    switch (routeName) {
      case "Store":
        return "🛒";
      case "Community":
        return "👥";
      case "Chat":
        return "💬";
      case "Safety":
        return "🔐";
      case "Profile":
        return "⚠️"; // Assuming this is the icon that looks like the red notification icon in Image 5
      default:
        return "📱";
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.tabBar }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tab}
          >
            <Text style={styles.tabIcon}>
              {getIconForRoute(route.name, isFocused)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIcon: {
    fontSize: 24,
  },
});
