import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { PHASE_SCREENS } from "@/constants/phases";

type Props = {
  currentPhaseName: string;
};

export default function PhaseProgressBar({ currentPhaseName }: Props) {
  // Don't render anything if we're on the dashboard
  if (currentPhaseName === "index") {
    return null;
  }

  // Find the current phase index
  const currentPhaseIndex = PHASE_SCREENS.findIndex(
    (phase) => phase.name === currentPhaseName
  );

  // If phase not found, don't render
  if (currentPhaseIndex === -1) {
    return null;
  }

  // Calculate progress percentage
  const progressPercentage = ((currentPhaseIndex + 1) / PHASE_SCREENS.length) * 100;

  return (
    <View style={styles.container}>
      {/* Progress Bar Background */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          {/* Filled Progress */}
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${progressPercentage}%` }
            ]} 
          />
        </View>
        
        {/* Phase Dots */}
        <View style={styles.dotsContainer}>
          {PHASE_SCREENS.map((phase, index) => {
            const isActive = index === currentPhaseIndex;
            const isCompleted = index < currentPhaseIndex;

            return (
              <View key={phase.name} style={styles.dotWrapper}>
                <View
                  style={[
                    styles.dot,
                    isCompleted && styles.dotCompleted,
                    isActive && styles.dotActive,
                  ]}
                />
              </View>
            );
          })}
        </View>
      </View>

      {/* Phase Label */}
      <Text style={styles.phaseLabel}>
        Phase {currentPhaseIndex + 1} of {PHASE_SCREENS.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4511e",
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  progressBarContainer: {
    position: "relative",
    height: 24,
    marginBottom: 4,
  },
  progressBarBackground: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  dotsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dotWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderWidth: 2,
    borderColor: "#f4511e",
  },
  dotCompleted: {
    backgroundColor: "#fff",
  },
  dotActive: {
    backgroundColor: "#fff",
    transform: [{ scale: 1.3 }],
    borderWidth: 3,
  },
  phaseLabel: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 2,
  },
});