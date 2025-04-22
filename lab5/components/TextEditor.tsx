import React, { useState, useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, ActivityIndicator, Text } from "react-native-paper";

interface TextEditorProps {
  initialContent: string;
  onContentChange: (content: string) => void;
  loading: boolean;
  error: string | null;
  fileName: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  initialContent,
  onContentChange,
  loading,
  error,
  fileName,
}) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleTextChange = (text: string) => {
    setContent(text);
    onContentChange(text);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading content...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <TextInput
        mode="outlined"
        multiline
        value={content}
        onChangeText={handleTextChange}
        style={styles.editor}
        placeholder={`Edit content of ${fileName}...`}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  editor: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: "top",
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
});

export default TextEditor;
