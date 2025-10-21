import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { PHASE_SCREENS } from "@/constants/phases";
import { useLanguage } from "../contexts/LanguageContext";

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
          {/* Filled Progress with animated gradient effect */}
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
                >
                  {/* Inner dot for active state */}
                  {isActive && <View style={styles.dotInner} />}
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Phase Label with better styling */}
      <View style={styles.labelContainer}>
        <Text style={styles.phaseLabel}>
          Phase {currentPhaseIndex + 1} of {PHASE_SCREENS.length}
        </Text>
        <View style={styles.progressBadge}>
          <Text style={styles.progressPercentage}>
            {Math.round(progressPercentage)}%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  progressBarContainer: {
    position: "relative",
    height: 28,
    marginBottom: 8,
  },
  progressBarBackground: {
    position: "absolute",
    top: 12,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 2,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
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
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    borderWidth: 2.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dotCompleted: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  dotActive: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    transform: [{ scale: 1.4 }],
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  dotInner: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#f4511e",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  phaseLabel: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  progressBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  progressPercentage: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});