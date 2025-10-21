import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Phase1Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phase 1: Intake</Text>
      <Text style={styles.content}>
        Here you will see all information related to the intake process,
        documents required, and initial consultation notes.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});