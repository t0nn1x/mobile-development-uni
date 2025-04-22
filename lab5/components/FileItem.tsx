import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { List, Text, IconButton, Menu } from "react-native-paper";
import { FileSystemItem } from "../context/FileSystemContext";
import { formatFileSize, getFileIcon } from "../utils/fileUtils";

interface FileItemProps {
  item: FileSystemItem;
  onPress: (item: FileSystemItem) => void;
  onDelete: (item: FileSystemItem) => void;
  onRename?: (item: FileSystemItem) => void;
  onViewDetails: (item: FileSystemItem) => void;
}

const FileItem: React.FC<FileItemProps> = ({
  item,
  onPress,
  onDelete,
  onRename,
  onViewDetails,
}) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const iconName = getFileIcon(item.name, item.isDirectory);
  const description = item.isDirectory
    ? "Folder"
    : `${formatFileSize(item.size)}`;

  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
      <List.Item
        title={item.name}
        description={description}
        left={() => <List.Icon icon={iconName} style={styles.icon} />}
        right={() => (
          <View style={styles.actions}>
            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              anchor={
                <IconButton icon="dots-vertical" size={24} onPress={openMenu} />
              }
            >
              <Menu.Item
                title="View Details"
                onPress={() => {
                  closeMenu();
                  onViewDetails(item);
                }}
                leadingIcon="information-outline"
              />
              {onRename && (
                <Menu.Item
                  title="Rename"
                  onPress={() => {
                    closeMenu();
                    onRename(item);
                  }}
                  leadingIcon="pencil-outline"
                />
              )}
              <Menu.Item
                title="Delete"
                onPress={() => {
                  closeMenu();
                  onDelete(item);
                }}
                leadingIcon="delete-outline"
              />
            </Menu>
          </View>
        )}
        style={styles.listItem}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 16, 
  },
  listItem: {
    paddingLeft: 8,
  },
});

export default FileItem;
