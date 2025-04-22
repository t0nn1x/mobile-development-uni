import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GameProvider } from "./contexts/GameContext";
import AppNavigation from "./navigation";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <GameProvider>
          <StatusBar style="auto" />
          <AppNavigation />
        </GameProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
