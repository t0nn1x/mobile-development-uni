import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Appbar, Text, Chip } from "react-native-paper";
import { parsePath } from "../utils/fileUtils";
import { BASE_DIRECTORY } from "../context/FileSystemContext";

interface DirectoryHeaderProps {
  currentPath: string;
  onNavigateBack: () => void;
  onBreadcrumbPress: (path: string) => void;
}

const DirectoryHeader: React.FC<DirectoryHeaderProps> = ({
  currentPath,
  onNavigateBack,
  onBreadcrumbPress,
}) => {
  const breadcrumbs = parsePath(currentPath, BASE_DIRECTORY);
  const isRootDir = currentPath === BASE_DIRECTORY;

  return (
    <View style={styles.container}>
      <Appbar.Header>
        {!isRootDir && <Appbar.BackAction onPress={onNavigateBack} />}
        <Appbar.Content title="File Manager" />
      </Appbar.Header>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.breadcrumbContainer}
        contentContainerStyle={styles.breadcrumbContent}
      >
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            {index > 0 && <Text style={styles.separator}>/</Text>}
            <TouchableOpacity
              onPress={() => onBreadcrumbPress(crumb.path)}
              disabled={index === breadcrumbs.length - 1}
            >
              <Chip
                mode="outlined"
                style={[
                  styles.breadcrumb,
                  index === breadcrumbs.length - 1 && styles.currentBreadcrumb,
                ]}
                textStyle={[
                  styles.breadcrumbText,
                  index === breadcrumbs.length - 1 &&
                    styles.currentBreadcrumbText,
                ]}
              >
                {crumb.name}
              </Chip>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    backgroundColor: "#fff",
  },
  breadcrumbContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
  },
  breadcrumbContent: {
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 16,
  },
  breadcrumb: {
    marginVertical: 0,
    height: 32,
    backgroundColor: "transparent",
  },
  currentBreadcrumb: {
    backgroundColor: "#e0e0e0",
  },
  breadcrumbText: {
    fontSize: 14,
  },
  currentBreadcrumbText: {
    fontWeight: "bold",
  },
  separator: {
    marginHorizontal: 4,
    color: "#757575",
  },
});

export default DirectoryHeader;
