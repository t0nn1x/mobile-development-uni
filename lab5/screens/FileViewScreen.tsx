import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Appbar,
  Text,
  ActivityIndicator,
  FAB,
  Portal,
  Dialog,
  Button,
} from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFileSystem } from "../context/FileSystemContext";
import FileDetails from "../components/FileDetails";

type RootStackParamList = {
  Home: undefined;
  Directory: { path: string };
  FileView: { uri: string; name: string };
  FileEdit: { uri: string; name: string };
};

type FileViewScreenRouteProp = RouteProp<RootStackParamList, "FileView">;
type FileViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "FileView"
>;

interface FileViewScreenProps {
  route: FileViewScreenRouteProp;
  navigation: FileViewScreenNavigationProp;
}

const FileViewScreen: React.FC<FileViewScreenProps> = ({
  route,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { uri, name } = route.params;

  const {
    readFile,
    deleteItem,
    getItemDetails,
    loading: fileSystemLoading,
    error: fileSystemError,
  } = useFileSystem();

  const [content, setContent] = useState<string>("");
  const [fileDetails, setFileDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState<boolean>(false);

  useEffect(() => {
    const loadFile = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get file content
        const fileContent = await readFile(uri);
        setContent(fileContent);

        // Get file details
        const details = await getItemDetails(uri);
        setFileDetails(details);
      } catch (err) {
        setError(`Error loading file: ${err}`);
        console.error("Error loading file:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFile();
  }, [uri]);

  const handleEdit = () => {
    navigation.navigate("FileEdit", { uri, name });
  };

  const handleDelete = () => {
    Alert.alert("Delete File", `Are you sure you want to delete "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          if (fileDetails) {
            const success = await deleteItem(fileDetails);
            if (success) {
              navigation.goBack();
            }
          }
        },
      },
    ]);
  };

  const handleShowDetails = () => {
    setShowDetailsDialog(true);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={name} />
        <Appbar.Action icon="information-outline" onPress={handleShowDetails} />
        <Appbar.Action icon="delete" onPress={handleDelete} />
      </Appbar.Header>

      {loading || fileSystemLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading file content...</Text>
        </View>
      ) : error || fileSystemError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || fileSystemError}</Text>
        </View>
      ) : (
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.content}>{content}</Text>
        </ScrollView>
      )}

      <Portal>
        <FAB
          icon="pencil"
          onPress={handleEdit}
          disabled={loading || !!error}
          style={[
            styles.fab,
            {
              bottom: insets.bottom + 16,
              right: 16,
            },
          ]}
        />
      </Portal>

      <Portal>
        <Dialog
          visible={showDetailsDialog}
          onDismiss={() => setShowDetailsDialog(false)}
        >
          <Dialog.Title>File Details</Dialog.Title>
          <Dialog.Content>
            {fileDetails && <FileDetails item={fileDetails} />}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDetailsDialog(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    color: "#F44336",
    fontSize: 16,
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  fab: {
    position: "absolute",
    margin: 16, 
    right: 0,
    bottom: 0,
  },
});

export default FileViewScreen;
