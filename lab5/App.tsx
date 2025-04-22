import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FileSystemProvider } from "./context/FileSystemContext";

// Import screens
import HomeScreen from "./screens/HomeScreen";
import DirectoryScreen from "./screens/DirectoryScreen";
import FileViewScreen from "./screens/FileViewScreen";
import FileEditScreen from "./screens/FileEditScreen";

// Define the stack navigation types
type RootStackParamList = {
  Home: undefined;
  Directory: { path: string };
  FileView: { uri: string; name: string };
  FileEdit: { uri: string; name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

// Define theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2196F3",
    accent: "#03A9F4",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <FileSystemProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: "#ffffff" },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Directory" component={DirectoryScreen} />
            <Stack.Screen name="FileView" component={FileViewScreen} />
            <Stack.Screen name="FileEdit" component={FileEditScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </FileSystemProvider>
    </PaperProvider>
  );
}
