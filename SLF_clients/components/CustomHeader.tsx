import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DrawerHeaderProps, DrawerToggleButton } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import PhaseProgressBar from "./PhaseProgressBar";

export default function CustomHeader(props: DrawerHeaderProps) {
  const { route, options } = props;
  const title = options.title || route.name;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerContainer}>
          {/* The Menu button with background */}
          <View style={styles.menuButton}>
            <DrawerToggleButton tintColor="#fff" />
          </View>
          
          {/* The Title - centered */}
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          </View>
          
          {/* Spacer for balance */}
          <View style={styles.spacer} />
        </View>
        
        {/* Our Progress Bar */}
        <PhaseProgressBar currentPhaseName={route.name} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#000080",
  },
  headerWrapper: {
    backgroundColor: "#000080",
    paddingBottom: 8,
    // Add a subtle shadow at the bottom
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  headerContainer: {
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  menuButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.3,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  spacer: {
    width: 44,
  },
});