import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, ProgressBar, Button } from "react-native-paper";
import { StorageStats } from "../context/FileSystemContext";
import { formatFileSize } from "../utils/fileUtils";

interface StorageInfoProps {
  stats: StorageStats | null;
  onRefresh: () => void;
  loading: boolean;
}

const StorageInfo: React.FC<StorageInfoProps> = ({
  stats,
  onRefresh,
  loading,
}) => {
  if (!stats) {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Storage Information</Text>
          <Text style={styles.errorText}>Storage information unavailable</Text>
          <Button
            mode="contained"
            onPress={onRefresh}
            style={styles.refreshButton}
            loading={loading}
            disabled={loading}
          >
            Refresh
          </Button>
        </Card.Content>
      </Card>
    );
  }

  const usedPercentage = stats.usedSpace / stats.totalSpace;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium">Storage Information</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <Text variant="bodyMedium">Total Space:</Text>
            <Text variant="bodyMedium" style={styles.value}>
              {formatFileSize(stats.totalSpace)}
            </Text>
          </View>

          <View style={styles.statsRow}>
            <Text variant="bodyMedium">Used Space:</Text>
            <Text variant="bodyMedium" style={styles.value}>
              {formatFileSize(stats.usedSpace)} (
              {(usedPercentage * 100).toFixed(1)}%)
            </Text>
          </View>

          <View style={styles.statsRow}>
            <Text variant="bodyMedium">Free Space:</Text>
            <Text variant="bodyMedium" style={styles.value}>
              {formatFileSize(stats.freeSpace)}
            </Text>
          </View>
        </View>

        <Text variant="bodySmall" style={styles.usageLabel}>
          Storage Usage
        </Text>
        <ProgressBar
          progress={usedPercentage}
          color={
            usedPercentage > 0.9
              ? "#F44336"
              : usedPercentage > 0.7
              ? "#FB8C00"
              : "#4CAF50"
          }
          style={styles.progressBar}
        />

        <Button
          mode="outlined"
          onPress={onRefresh}
          style={styles.refreshButton}
          loading={loading}
          disabled={loading}
        >
          Refresh
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  statsContainer: {
    marginTop: 12,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  value: {
    fontWeight: "600",
  },
  usageLabel: {
    marginBottom: 4,
    color: "#757575",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  refreshButton: {
    marginTop: 16,
    alignSelf: "center",
  },
  errorText: {
    color: "#F44336",
    marginTop: 8,
    marginBottom: 8,
  },
});

export default StorageInfo;
