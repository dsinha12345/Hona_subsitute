import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Client!</Text>
      <Text style={styles.subtitle}>This is your case dashboard.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
});