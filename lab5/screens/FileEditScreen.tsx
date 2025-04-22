import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, BackHandler } from "react-native";
import { Appbar, Snackbar } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFileSystem } from "../context/FileSystemContext";
import TextEditor from "../components/TextEditor";

type RootStackParamList = {
  Home: undefined;
  Directory: { path: string };
  FileView: { uri: string; name: string };
  FileEdit: { uri: string; name: string };
};

type FileEditScreenRouteProp = RouteProp<RootStackParamList, "FileEdit">;
type FileEditScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "FileEdit"
>;

interface FileEditScreenProps {
  route: FileEditScreenRouteProp;
  navigation: FileEditScreenNavigationProp;
}

const FileEditScreen: React.FC<FileEditScreenProps> = ({
  route,
  navigation,
}) => {
  const { uri, name } = route.params;

  const {
    readFile,
    writeFile,
    loading: fileSystemLoading,
    error: fileSystemError,
  } = useFileSystem();

  const [initialContent, setInitialContent] = useState<string>("");
  const [currentContent, setCurrentContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  useEffect(() => {
    const loadFile = async () => {
      try {
        setLoading(true);
        setError(null);

        const fileContent = await readFile(uri);
        setInitialContent(fileContent);
        setCurrentContent(fileContent);
      } catch (err) {
        setError(`Error loading file: ${err}`);
        console.error("Error loading file:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFile();
  }, [uri]);

  useEffect(() => {
    // Check if content has been modified
    setHasChanges(initialContent !== currentContent);
  }, [initialContent, currentContent]);

  useEffect(() => {
    // Handle back button press for unsaved changes
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (hasChanges) {
          handleBackWithChanges();
          return true; // Prevent default back action
        }
        return false; // Let default back action happen
      }
    );

    return () => backHandler.remove();
  }, [hasChanges]);

  const handleContentChange = (newContent: string) => {
    setCurrentContent(newContent);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const success = await writeFile(uri, currentContent);

      if (success) {
        setInitialContent(currentContent); // Update initial content to new state
        setHasChanges(false);
        setSnackbarMessage("File saved successfully");
        setShowSnackbar(true);
      } else {
        throw new Error("Failed to save file");
      }
    } catch (err) {
      setError(`Error saving file: ${err}`);
      console.error("Error saving file:", err);
      setSnackbarMessage("Failed to save file");
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBackWithChanges = () => {
    Alert.alert(
      "Unsaved Changes",
      "You have unsaved changes. Do you want to save before leaving?",
      [
        {
          text: "Discard",
          style: "destructive",
          onPress: () => navigation.goBack(),
        },
        {
          text: "Save",
          onPress: async () => {
            await handleSave();
            navigation.goBack();
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const handleBackPress = () => {
    if (hasChanges) {
      handleBackWithChanges();
    } else {
      navigation.goBack();
    }
  };

  const dismissSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBackPress} />
        <Appbar.Content title={`Edit: ${name}`} />
        <Appbar.Action
          icon="content-save"
          onPress={handleSave}
          disabled={loading || !hasChanges}
        />
      </Appbar.Header>

      <TextEditor
        initialContent={initialContent}
        onContentChange={handleContentChange}
        loading={loading || fileSystemLoading}
        error={error || fileSystemError}
        fileName={name}
      />

      <Snackbar
        visible={showSnackbar}
        onDismiss={dismissSnackbar}
        duration={3000}
        action={{
          label: "Close",
          onPress: dismissSnackbar,
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

export default FileEditScreen;
