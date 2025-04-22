import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Dialog, Portal, TextInput, Button, Text } from "react-native-paper";
import { createSafeFilename } from "../utils/fileUtils";

interface CreateNewItemProps {
  visible: boolean;
  type: "file" | "directory";
  onDismiss: () => void;
  onCreate: (name: string, content?: string) => Promise<boolean>;
  loading: boolean;
}

const CreateNewItem: React.FC<CreateNewItemProps> = ({
  visible,
  type,
  onDismiss,
  onCreate,
  loading,
}) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const hasExtension = (filename: string): boolean => {
    const lastDotIndex = filename.lastIndexOf(".");
    const lastSlashIndex = filename.lastIndexOf("/");

    return lastDotIndex > lastSlashIndex && lastDotIndex < filename.length - 1;
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      setError(`${type === "file" ? "File" : "Folder"} name cannot be empty`);
      return;
    }

    let safeName = createSafeFilename(name.trim());

    // Add .txt extension only if creating a file without extension
    if (type === "file" && !hasExtension(safeName)) {
      safeName += ".txt";
    }

    const success = await onCreate(
      safeName,
      type === "file" ? content : undefined
    );

    if (success) {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setName("");
    setContent("");
    setError(null);
    onDismiss();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>
          {type === "file" ? "Create New File" : "Create New Folder"}
        </Dialog.Title>
        <Dialog.Content>
          <TextInput
            label={
              type === "file"
                ? "File Name (with extension, e.g. script.py)"
                : "Folder Name"
            }
            value={name}
            onChangeText={setName}
            mode="outlined"
            disabled={loading}
            error={!!error}
            style={styles.input}
          />

          {type === "file" && (
            <>
              <Text style={styles.hintText}>
                If no extension is provided, .txt will be added automatically.
              </Text>
              <TextInput
                label="Initial Content"
                value={content}
                onChangeText={setContent}
                mode="outlined"
                multiline
                numberOfLines={5}
                disabled={loading}
                style={styles.input}
              />
            </>
          )}

          {error && <Text style={styles.errorText}>{error}</Text>}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleCancel}>Cancel</Button>
          <Button onPress={handleCreate} loading={loading} disabled={loading}>
            Create
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
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

export default CreateNewItem;
