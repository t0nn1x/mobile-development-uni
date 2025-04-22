import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import {
  Appbar,
  Text,
  Divider,
  Portal,
  Dialog,
  Button,
} from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFileSystem, BASE_DIRECTORY } from "../context/FileSystemContext";
import StorageInfo from "../components/StorageInfo";
import FileItem from "../components/FileItem";
import FileActions from "../components/FileActions";
import CreateNewItem from "../components/CreateNewItem";
import FileDetails from "../components/FileDetails";
import { isOpenableFile } from "../utils/fileUtils";

type RootStackParamList = {
  Home: undefined;
  Directory: { path: string };
  FileView: { uri: string; name: string };
  FileEdit: { uri: string; name: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const {
    items,
    storageStats,
    loading,
    error,
    refreshFiles,
    refreshStorageStats,
    createDirectory,
    createFile,
    deleteItem,
    navigateTo,
  } = useFileSystem();

  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [createType, setCreateType] = useState<"file" | "directory">("file");

  useEffect(() => {
    // Initial data loading
    refreshFiles();
    refreshStorageStats();
  }, []);

  const handleItemPress = (item: any) => {
    if (item.isDirectory) {
      navigation.navigate("Directory", { path: item.uri });
    } else if (isOpenableFile(item.name)) {
      navigation.navigate("FileView", { uri: item.uri, name: item.name });
    } else {
      Alert.alert(
        "File not supported",
        "This file type cannot be opened in the app."
      );
    }
  };

  const handleItemDelete = (item: any) => {
    Alert.alert(
      `Delete ${item.isDirectory ? "Folder" : "File"}`,
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteItem(item),
        },
      ]
    );
  };

  const handleViewDetails = (item: any) => {
    setSelectedItem(item);
    setShowDetailDialog(true);
  };

  const handleCreateNew = async (name: string, content: string = "") => {
    if (createType === "directory") {
      return await createDirectory(name);
    } else {
      return await createFile(name, content);
    }
  };

  const handleCreateNewFolder = () => {
    setCreateType("directory");
    setShowCreateDialog(true);
  };

  const handleCreateNewFile = () => {
    setCreateType("file");
    setShowCreateDialog(true);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="File Manager" />
        <Appbar.Action icon="refresh" onPress={refreshFiles} />
        <Appbar.Action icon="folder-plus" onPress={handleCreateNewFolder} />
        <Appbar.Action icon="file-plus" onPress={handleCreateNewFile} />
      </Appbar.Header>

      <StorageInfo
        stats={storageStats}
        onRefresh={refreshStorageStats}
        loading={loading}
      />

      <Divider />

      <View style={styles.directoryHeader}>
        <Text variant="titleMedium">Home Directory</Text>
        <Text variant="bodySmall">{BASE_DIRECTORY}</Text>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <FlatList
        data={items}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <FileItem
            item={item}
            onPress={handleItemPress}
            onDelete={handleItemDelete}
            onViewDetails={handleViewDetails}
          />
        )}
        refreshing={loading}
        onRefresh={refreshFiles}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {loading
                ? "Loading files..."
                : "No files or folders found. Create one using the buttons below."}
            </Text>
          </View>
        }
      />

      <FileActions
        onCreateDirectory={createDirectory}
        onCreateFile={createFile}
        loading={loading}
      />

      {/* File Details Dialog */}
      <Portal>
        <Dialog
          visible={showDetailDialog}
          onDismiss={() => setShowDetailDialog(false)}
        >
          <Dialog.Title>File Details</Dialog.Title>
          <Dialog.Content>
            {selectedItem && <FileDetails item={selectedItem} />}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDetailDialog(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Create New Item Dialog */}
      <CreateNewItem
        visible={showCreateDialog}
        type={createType}
        onDismiss={() => setShowCreateDialog(false)}
        onCreate={handleCreateNew}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  directoryHeader: {
    padding: 16,
    backgroundColor: "#e0e0e0",
  },
  listContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    textAlign: "center",
    color: "#757575",
  },
  errorContainer: {
    padding: 16,
    backgroundColor: "#FFEBEE",
  },
  errorText: {
    color: "#F44336",
  },
});

export default HomeScreen;
