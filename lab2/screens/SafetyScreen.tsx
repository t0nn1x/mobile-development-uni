import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { ThemeToggle } from "../components/ThemeToggle";

export default function SafetyScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState("guard");
  const [authCode, setAuthCode] = useState("N5KCV");
  const [progress, setProgress] = useState(0.7); // 70% progress for the blue bar

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_logo.png",
          }}
          style={styles.logo}
        />
        <Text style={[styles.headerTitle, { color: colors.text }]}>Safety</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "guard"
              ? {
                  backgroundColor: colors.card,
                  borderBottomWidth: 2,
                  borderBottomColor: colors.primary,
                }
              : { backgroundColor: "transparent" },
          ]}
          onPress={() => setActiveTab("guard")}
        >
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === "guard" ? colors.text : colors.tabBarInactive,
              },
            ]}
          >
            Guard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "confirmations"
              ? {
                  backgroundColor: colors.card,
                  borderBottomWidth: 2,
                  borderBottomColor: colors.primary,
                }
              : { backgroundColor: "transparent" },
          ]}
          onPress={() => setActiveTab("confirmations")}
        >
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === "confirmations"
                    ? colors.text
                    : colors.tabBarInactive,
              },
            ]}
          >
            Confirmations
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.loggedInText, { color: colors.tabBarInactive }]}>
          Logged in as player
        </Text>

        <View style={styles.authCodeContainer}>
          <Text style={[styles.authCode, { color: colors.text }]}>
            {authCode}
          </Text>
        </View>

        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                backgroundColor: colors.primary,
                width: `${progress * 100}%`,
              },
            ]}
          />
        </View>

        <Text style={[styles.infoText, { color: colors.text }]}>
          You'll enter your code each time you enter your password to sign in to
          your Steam account.
        </Text>

        <Text style={[styles.tipText, { color: colors.primary }]}>
          Tip: If you don't share your PC, you can select "Remember my password"
          when you sign in to the PC client to enter your password and
          authenticator code less often.
        </Text>

        <TouchableOpacity
          style={[
            styles.actionButton,
            { borderTopColor: colors.border, borderBottomColor: colors.border },
          ]}
        >
          <Text style={[styles.actionButtonText, { color: colors.text }]}>
            Remove Authenticator
          </Text>
          <Text style={{ color: colors.tabBarInactive }}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            { borderTopColor: "transparent", borderBottomColor: colors.border },
          ]}
        >
          <Text style={[styles.actionButtonText, { color: colors.text }]}>
            My Recovery Code
          </Text>
          <Text style={{ color: colors.tabBarInactive }}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            { borderTopColor: "transparent", borderBottomColor: colors.border },
          ]}
        >
          <Text style={[styles.actionButtonText, { color: colors.text }]}>
            Help
          </Text>
          <Text style={{ color: colors.tabBarInactive }}>›</Text>
        </TouchableOpacity>
      </View>

      <ThemeToggle />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 8,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loggedInText: {
    textAlign: "center",
    marginBottom: 16,
  },
  authCodeContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  authCode: {
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#2a3f5a",
    borderRadius: 2,
    marginBottom: 32,
  },
  progressBar: {
    height: "100%",
    borderRadius: 2,
  },
  infoText: {
    marginBottom: 16,
    fontSize: 16,
  },
  tipText: {
    marginBottom: 24,
    fontSize: 14,
  },
  actionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  actionButtonText: {
    fontSize: 16,
  },
});
