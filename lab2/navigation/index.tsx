import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../contexts/ThemeContext";

import StoreScreen from "../screens/StoreScreen";
import CommunityScreen from "../screens/CommunityScreen";
import ChatScreen from "../screens/ChatScreen";
import SafetyScreen from "../screens/SafetyScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { BottomTabBar } from "../components/BottomTabBar";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const { colors } = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.card,
          text: colors.text,
          border: colors.border,
          notification: colors.accent,
        },
      }}
    >
      <Tab.Navigator
        tabBar={(props) => <BottomTabBar {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          // Fix for the undefined bold error
          headerTitleStyle: {
            fontWeight: "bold" as "bold", // Type assertion to ensure correct type
          },
          // Explicitly disable headers for all screens
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Store"
          component={StoreScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Safety"
          component={SafetyScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
