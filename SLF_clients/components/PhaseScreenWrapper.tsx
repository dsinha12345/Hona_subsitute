import { View, StyleSheet } from "react-native";
import React from "react";
import PhaseProgressFooter from "./PhaseProgressFooter";

type Props = {
  children: React.ReactNode;
  phaseNumber: number;
  totalVideos: number;
};

export default function PhaseScreenWrapper({ children, phaseNumber, totalVideos }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>
      <PhaseProgressFooter phaseNumber={phaseNumber} totalVideos={totalVideos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});