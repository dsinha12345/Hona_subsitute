import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DrawerHeaderProps, DrawerToggleButton } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import PhaseProgressBar from "./PhaseProgressBar";

export default function CustomHeader(props: DrawerHeaderProps) {
  const { route, options } = props;
  const title = options.title || route.name;

  return (
    // Use SafeAreaView to avoid the phone's notch
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.headerContainer}>
        {/* The Menu button */}
        <DrawerToggleButton tintColor="#fff" />
        
        {/* The Title */}
        <Text style={styles.title}>{title}</Text>
        
        {/* This empty view helps center the title properly */}
        <View style={{ width: 50 }} />
      </View>
      
      {/* Our new Progress Bar */}
      <PhaseProgressBar currentPhaseName={route.name} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#f4511e", // Set background color for the whole safe area
  },
  headerContainer: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});