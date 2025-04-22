import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Text, Divider, List } from "react-native-paper";
import { FileSystemItem } from "../context/FileSystemContext";
import {
  formatFileSize,
  formatDate,
  getFileExtension,
  getFileType,
  getFileIcon,
} from "../utils/fileUtils";

interface FileDetailsProps {
  item: FileSystemItem;
}

const FileDetails: React.FC<FileDetailsProps> = ({ item }) => {
  const fileIcon = getFileIcon(item.name, item.isDirectory);
  const fileType = item.isDirectory ? "Directory" : getFileType(item.name);
  const extension = getFileExtension(item.name);

  // Отримання детального опису типу файлу на основі розширення
  const getDetailedFileTypeDescription = (
    type: string,
    ext: string
  ): string => {
    switch (type) {
      case "Python":
        return "Python programming language file";
      case "Java":
        return "Java programming language file";
      case "C/C++":
        return ext === "c"
          ? "C programming language file"
          : ext === "cpp" || ext === "cxx" || ext === "cc"
          ? "C++ programming language file"
          : ext === "h" || ext === "hpp"
          ? "C/C++ header file"
          : "C/C++ file";
      case "Web":
        return ext === "html"
          ? "HTML web page file"
          : ext === "css"
          ? "CSS stylesheet file"
          : ext === "js"
          ? "JavaScript file"
          : ext === "ts"
          ? "TypeScript file"
          : ext === "jsx"
          ? "React JSX file"
          : ext === "tsx"
          ? "React TypeScript file"
          : ext === "php"
          ? "PHP file"
          : "Web development file";
      case "Script":
        return ext === "sh" || ext === "bash"
          ? "Bash shell script"
          : ext === "bat" || ext === "cmd"
          ? "Windows batch file"
          : ext === "ps1"
          ? "PowerShell script"
          : "Script file";
      case "Data":
        return ext === "json"
          ? "JSON data file"
          : ext === "xml"
          ? "XML data file"
          : ext === "csv"
          ? "CSV spreadsheet file"
          : ext === "yaml" || ext === "yml"
          ? "YAML data file"
          : "Data file";
      case "Text":
        return ext === "txt"
          ? "Plain text file"
          : ext === "md"
          ? "Markdown document"
          : "Text file";
      case "Image":
        return ext === "jpg" || ext === "jpeg"
          ? "JPEG image file"
          : ext === "png"
          ? "PNG image file"
          : ext === "gif"
          ? "GIF image file"
          : ext === "svg"
          ? "SVG vector graphic file"
          : "Image file";
      case "Audio":
        return ext === "mp3"
          ? "MP3 audio file"
          : ext === "wav"
          ? "WAV audio file"
          : ext === "flac"
          ? "FLAC audio file"
          : "Audio file";
      case "Video":
        return ext === "mp4"
          ? "MP4 video file"
          : ext === "avi"
          ? "AVI video file"
          : ext === "mkv"
          ? "MKV video file"
          : "Video file";
      case "Document":
        return ext === "pdf"
          ? "PDF document"
          : ext === "doc" || ext === "docx"
          ? "Word document"
          : ext === "xls" || ext === "xlsx"
          ? "Excel spreadsheet"
          : ext === "ppt" || ext === "pptx"
          ? "PowerPoint presentation"
          : "Document file";
      case "Archive":
        return ext === "zip"
          ? "ZIP archive"
          : ext === "rar"
          ? "RAR archive"
          : ext === "7z"
          ? "7-Zip archive"
          : ext === "tar" || ext === "gz" || ext === "bz2"
          ? "Compressed archive"
          : "Archive file";
      case "Directory":
        return "File folder";
      default:
        return "Unknown file type";
    }
  };

  const fileTypeDescription = getDetailedFileTypeDescription(
    fileType,
    extension
  );

  return (
    <ScrollView>
      <Card style={styles.card}>
        <Card.Title
          title="File Information"
          left={(props) => <List.Icon {...props} icon={fileIcon} />}
        />
        <Card.Content>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{item.name}</Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>{fileType}</Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{fileTypeDescription}</Text>
          </View>

          {!item.isDirectory && extension && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.detailRow}>
                <Text style={styles.label}>Extension:</Text>
                <Text style={styles.value}>.{extension}</Text>
              </View>
            </>
          )}

          <Divider style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value} numberOfLines={2}>
              {item.uri}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.label}>Size:</Text>
            <Text style={styles.value}>
              {item.isDirectory ? "—" : formatFileSize(item.size)}
            </Text>
          </View>

          {item.modificationTime && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.detailRow}>
                <Text style={styles.label}>Last Modified:</Text>
                <Text style={styles.value}>
                  {formatDate(item.modificationTime)}
                </Text>
              </View>
            </>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 2,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 8,
  },
  label: {
    flex: 2,
    fontWeight: "bold",
    color: "#757575",
  },
  value: {
    flex: 5,
  },
  divider: {
    marginVertical: 4,
  },
});

export default FileDetails;
