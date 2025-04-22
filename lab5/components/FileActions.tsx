import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  FAB,
  Portal,
  Dialog,
  TextInput,
  Button,
  Text,
} from "react-native-paper";
import { createSafeFilename } from "../utils/fileUtils";

interface FileActionsProps {
  onCreateDirectory: (dirName: string) => Promise<boolean>;
  onCreateFile: (fileName: string, content: string) => Promise<boolean>;
  loading: boolean;
}

const FileActions: React.FC<FileActionsProps> = ({
  onCreateDirectory,
  onCreateFile,
  loading,
}) => {
  const [fabOpen, setFabOpen] = useState(false);
  const [showDirDialog, setShowDirDialog] = useState(false);
  const [showFileDialog, setShowFileDialog] = useState(false);
  const [dirName, setDirName] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onFabStateChange = ({ open }: { open: boolean }) => setFabOpen(open);

  const hasExtension = (filename: string): boolean => {
    const lastDotIndex = filename.lastIndexOf(".");
    const lastSlashIndex = filename.lastIndexOf("/");

    return lastDotIndex > lastSlashIndex && lastDotIndex < filename.length - 1;
  };

  const handleCreateDirectory = async () => {
    if (!dirName.trim()) {
      setError("Directory name cannot be empty");
      return;
    }
    // Clean the directory name of any path separators to ensure we don't create nested paths
    const safeDirectoryName = createSafeFilename(dirName.trim());

    console.log("Creating directory with name:", safeDirectoryName);
    const success = await onCreateDirectory(safeDirectoryName);

    if (success) {
      setDirName("");
      setShowDirDialog(false);
      setError(null);
    }
  };

  const handleCreateFile = async () => {
    if (!fileName.trim()) {
      setError("File name cannot be empty");
      return;
    }

    // Clean the filename from invalid characters
    let safeFileName = createSafeFilename(fileName.trim());

    // Add .txt extension only if there's no extension already
    if (!hasExtension(safeFileName)) {
      safeFileName += ".txt";
    }

    console.log("Creating file with name:", safeFileName);
    const success = await onCreateFile(safeFileName, fileContent);

    if (success) {
      setFileName("");
      setFileContent("");
      setShowFileDialog(false);
      setError(null);
    }
  };

  return (
    <>
      <Portal>
        <FAB.Group
          visible={true}
          open={fabOpen}
          icon={fabOpen ? "close" : "plus"}
          actions={[
            {
              icon: "folder-plus",
              label: "New Folder",
              onPress: () => setShowDirDialog(true),
              disabled: loading,
            },
            {
              icon: "file-plus",
              label: "New Text File",
              onPress: () => setShowFileDialog(true),
              disabled: loading,
            },
          ]}
          onStateChange={onFabStateChange}
          style={styles.fab}
        />
      </Portal>

      {/* Create Directory Dialog */}
      <Portal>
        <Dialog
          visible={showDirDialog}
          onDismiss={() => setShowDirDialog(false)}
        >
          <Dialog.Title>Create New Folder</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Folder Name"
              value={dirName}
              onChangeText={setDirName}
              mode="outlined"
              disabled={loading}
              error={!!error}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setShowDirDialog(false);
                setError(null);
                setDirName("");
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={handleCreateDirectory}
              loading={loading}
              disabled={loading}
            >
              Create
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Create File Dialog */}
      <Portal>
        <Dialog
          visible={showFileDialog}
          onDismiss={() => setShowFileDialog(false)}
        >
          <Dialog.Title>Create New File</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="File Name (with extension, e.g. script.py)"
              value={fileName}
              onChangeText={setFileName}
              mode="outlined"
              disabled={loading}
              error={!!error}
              style={styles.input}
            />
            <Text style={styles.hintText}>
              If no extension is provided, .txt will be added automatically.
            </Text>
            <TextInput
              label="Initial Content"
              value={fileContent}
              onChangeText={setFileContent}
              mode="outlined"
              multiline
              numberOfLines={5}
              disabled={loading}
              style={styles.input}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setShowFileDialog(false);
                setError(null);
                setFileName("");
                setFileContent("");
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={handleCreateFile}
              loading={loading}
              disabled={loading}
            >
              Create
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  input: {
    marginBottom: 12,
  },
  errorText: {
    color: "#F44336",
    marginTop: 8,
  },
  hintText: {
    fontSize: 12,
    color: "#757575",
    marginBottom: 12,
    marginTop: -4,
  },
});

export default FileActions;
