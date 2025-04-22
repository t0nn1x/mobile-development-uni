import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as FileSystem from "expo-file-system";
import * as Device from "expo-device";

// Define the base directory for all operations
export const BASE_DIRECTORY = FileSystem.documentDirectory + "AppData/";

// Type for file or directory item
export type FileSystemItem = {
  name: string;
  uri: string;
  isDirectory: boolean;
  modificationTime?: number;
  size?: number;
};

// Type for storage statistics
export type StorageStats = {
  totalSpace: number;
  freeSpace: number;
  usedSpace: number;
};

// Context type definition
type FileSystemContextType = {
  currentPath: string;
  items: FileSystemItem[];
  navigationHistory: string[];
  storageStats: StorageStats | null;
  loading: boolean;
  error: string | null;
  refreshFiles: () => Promise<void>;
  navigateTo: (path: string) => void;
  navigateBack: () => void;
  createDirectory: (dirName: string) => Promise<boolean>;
  createFile: (fileName: string, content: string) => Promise<boolean>;
  deleteItem: (item: FileSystemItem) => Promise<boolean>;
  readFile: (uri: string) => Promise<string>;
  writeFile: (uri: string, content: string) => Promise<boolean>;
  getItemDetails: (uri: string) => Promise<FileSystemItem | null>;
  refreshStorageStats: () => Promise<void>;
};

// Create context with default values
export const FileSystemContext = createContext<FileSystemContextType>({
  currentPath: BASE_DIRECTORY,
  items: [],
  navigationHistory: [BASE_DIRECTORY],
  storageStats: null,
  loading: false,
  error: null,
  refreshFiles: async () => {},
  navigateTo: () => {},
  navigateBack: () => {},
  createDirectory: async () => false,
  createFile: async () => false,
  deleteItem: async () => false,
  readFile: async () => "",
  writeFile: async () => false,
  getItemDetails: async () => null,
  refreshStorageStats: async () => {},
});

// Provider component
export const FileSystemProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentPath, setCurrentPath] = useState<string>(BASE_DIRECTORY);
  const [items, setItems] = useState<FileSystemItem[]>([]);
  const [navigationHistory, setNavigationHistory] = useState<string[]>([
    BASE_DIRECTORY,
  ]);
  const [storageStats, setStorageStats] = useState<StorageStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isBaseDirectoryReady, setIsBaseDirectoryReady] =
    useState<boolean>(false);

  // Helper function to ensure paths end with slash
  const ensureTrailingSlash = (path: string): string => {
    return path.endsWith("/") ? path : path + "/";
  };

  // Ensure base directory exists on app launch
  useEffect(() => {
    const initializeFileSystem = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Checking for base directory:", BASE_DIRECTORY);
        const baseDir = await FileSystem.getInfoAsync(BASE_DIRECTORY);

        if (!baseDir.exists) {
          console.log("Base directory not found, creating it...");
          await FileSystem.makeDirectoryAsync(BASE_DIRECTORY, {
            intermediates: true,
          });
          console.log("Base directory created successfully");
        } else {
          console.log("Base directory already exists");
        }

        // Mark that base directory is ready
        setIsBaseDirectoryReady(true);
      } catch (err) {
        console.error("Error initializing file system:", err);
        setError(`Error initializing file system: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    initializeFileSystem();
  }, []);

  // Once base directory is ready, refresh files and stats
  useEffect(() => {
    if (isBaseDirectoryReady) {
      refreshFiles();
      refreshStorageStats();
    }
  }, [isBaseDirectoryReady]);

  // Refresh the file list of current directory
  const refreshFiles = async () => {
    if (!isBaseDirectoryReady) {
      console.log("Base directory not ready yet, skipping refreshFiles");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Ensure currentPath ends with a slash
      const path = ensureTrailingSlash(currentPath);

      // Check if the current path exists
      const pathInfo = await FileSystem.getInfoAsync(path);
      if (!pathInfo.exists) {
        console.log("Path does not exist:", path);
        // If current path doesn't exist but it's the base directory, try to create it
        if (path === BASE_DIRECTORY) {
          console.log("Creating base directory again...");
          await FileSystem.makeDirectoryAsync(BASE_DIRECTORY, {
            intermediates: true,
          });
        } else {
          throw new Error(`The directory ${path} doesn't exist`);
        }
      }

      console.log("Reading directory:", path);
      const fileEntries = await FileSystem.readDirectoryAsync(path);
      console.log("Files found:", fileEntries.length);

      const fileDetails: FileSystemItem[] = await Promise.all(
        fileEntries.map(async (fileName) => {
          const uri = `${path}${fileName}`;
          const info = await FileSystem.getInfoAsync(uri);

          return {
            name: fileName,
            uri: info.isDirectory ? ensureTrailingSlash(uri) : uri,
            isDirectory: info.isDirectory || false,
            modificationTime: info.modificationTime || undefined,
            size: info.size || 0,
          };
        })
      );

      // Sort directories first, then files
      fileDetails.sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      });

      setItems(fileDetails);
    } catch (err) {
      console.error("Error reading directory:", err);
      setError(`Error reading directory: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // Navigate to a directory
  const navigateTo = (path: string) => {
    // Ensure path ends with a slash
    const formattedPath = ensureTrailingSlash(path);
    console.log("Navigating to path:", formattedPath);
    setCurrentPath(formattedPath);
    setNavigationHistory([...navigationHistory, formattedPath]);
  };

  // Navigate back to previous directory
  const navigateBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current path
      const previousPath = newHistory[newHistory.length - 1];
      setCurrentPath(previousPath);
      setNavigationHistory(newHistory);
    }
  };

  // Create a new directory
  const createDirectory = async (dirName: string): Promise<boolean> => {
    if (!isBaseDirectoryReady) {
      setError("Cannot create directory: Base directory not initialized yet");
      return false;
    }

    try {
      setLoading(true);

      // Ensure current path ends with a slash
      const path = ensureTrailingSlash(currentPath);
      const dirPath = `${path}${dirName}`;
      const formattedDirPath = ensureTrailingSlash(dirPath);

      console.log(`Creating directory at: ${formattedDirPath}`);

      const dirInfo = await FileSystem.getInfoAsync(formattedDirPath);

      if (dirInfo.exists) {
        setError(`Directory already exists: ${dirName}`);
        return false;
      }

      await FileSystem.makeDirectoryAsync(formattedDirPath, {
        intermediates: false,
      });
      await refreshFiles();
      return true;
    } catch (err) {
      setError(`Error creating directory: ${err}`);
      console.error("Error creating directory:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Create a new file
  const createFile = async (
    fileName: string,
    content: string
  ): Promise<boolean> => {
    if (!isBaseDirectoryReady) {
      setError("Cannot create file: Base directory not initialized yet");
      return false;
    }

    try {
      setLoading(true);

      // Ensure current path ends with a slash
      const path = ensureTrailingSlash(currentPath);
      const filePath = `${path}${fileName}`;

      console.log(`Creating file at: ${filePath}`);

      const fileInfo = await FileSystem.getInfoAsync(filePath);

      if (fileInfo.exists) {
        setError(`File already exists: ${fileName}`);
        return false;
      }

      await FileSystem.writeAsStringAsync(filePath, content);
      await refreshFiles();
      return true;
    } catch (err) {
      setError(`Error creating file: ${err}`);
      console.error("Error creating file:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete a file or directory
  const deleteItem = async (item: FileSystemItem): Promise<boolean> => {
    try {
      setLoading(true);
      await FileSystem.deleteAsync(item.uri);
      await refreshFiles();
      return true;
    } catch (err) {
      setError(`Error deleting item: ${err}`);
      console.error("Error deleting item:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Read a file's content
  const readFile = async (uri: string): Promise<string> => {
    try {
      const content = await FileSystem.readAsStringAsync(uri);
      return content;
    } catch (err) {
      setError(`Error reading file: ${err}`);
      console.error("Error reading file:", err);
      return "";
    }
  };

  // Write content to a file
  const writeFile = async (uri: string, content: string): Promise<boolean> => {
    try {
      setLoading(true);
      await FileSystem.writeAsStringAsync(uri, content);
      return true;
    } catch (err) {
      setError(`Error writing to file: ${err}`);
      console.error("Error writing to file:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get detailed information about a file or directory
  const getItemDetails = async (
    uri: string
  ): Promise<FileSystemItem | null> => {
    try {
      const info = await FileSystem.getInfoAsync(uri);
      if (!info.exists) return null;

      // Extract filename from URI
      const name = uri.split("/").pop() || "";

      return {
        name,
        uri: info.isDirectory ? ensureTrailingSlash(uri) : uri,
        isDirectory: info.isDirectory || false,
        modificationTime: info.modificationTime,
        size: info.size,
      };
    } catch (err) {
      setError(`Error getting item details: ${err}`);
      console.error("Error getting item details:", err);
      return null;
    }
  };

  // Get storage statistics
  const refreshStorageStats = async (): Promise<void> => {
    try {
      // This is a mock implementation since expo-file-system doesn't provide
      // a direct way to get device storage stats

      if (Device.isDevice) {
        // On a real device, we would get real stats
        // This is just a placeholder
        const totalSpace = 64 * 1024 * 1024 * 1024; // 64GB
        const freeSpace = 32 * 1024 * 1024 * 1024; // 32GB
        const usedSpace = totalSpace - freeSpace;

        setStorageStats({
          totalSpace,
          freeSpace,
          usedSpace,
        });
      } else {
        // On simulator/emulator, provide mock data
        const totalSpace = 128 * 1024 * 1024 * 1024; // 128GB
        const freeSpace = 64 * 1024 * 1024 * 1024; // 64GB
        const usedSpace = totalSpace - freeSpace;

        setStorageStats({
          totalSpace,
          freeSpace,
          usedSpace,
        });
      }
    } catch (err) {
      console.error("Error getting storage stats:", err);
      setStorageStats(null);
    }
  };

  // When current path changes, refresh files
  useEffect(() => {
    if (isBaseDirectoryReady) {
      refreshFiles();
    }
  }, [currentPath, isBaseDirectoryReady]);

  const contextValue: FileSystemContextType = {
    currentPath,
    items,
    navigationHistory,
    storageStats,
    loading,
    error,
    refreshFiles,
    navigateTo,
    navigateBack,
    createDirectory,
    createFile,
    deleteItem,
    readFile,
    writeFile,
    getItemDetails,
    refreshStorageStats,
  };

  return (
    <FileSystemContext.Provider value={contextValue}>
      {children}
    </FileSystemContext.Provider>
  );
};

// Custom hook to use the file system context
export const useFileSystem = () => React.useContext(FileSystemContext);
