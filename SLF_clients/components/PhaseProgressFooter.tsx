import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { storage } from "../utils/storage";

type Props = {
  phaseNumber: number;
  totalVideos: number;
};

export default function PhaseProgressFooter({ phaseNumber, totalVideos }: Props) {
  const { language } = useLanguage();
  const [watchedCount, setWatchedCount] = useState(0);

  useEffect(() => {
  // Load watched videos count from storage
  const loadWatchedCount = async () => {
    const storageKey = `phase_${phaseNumber}_watched`;
    const stored = await storage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setWatchedCount(parsed.length);
      } catch (e) {
        setWatchedCount(0);
      }
    } else {
      setWatchedCount(0);
    }
  };

  loadWatchedCount();

  // Listen for storage changes (web only)
  if (Platform.OS === 'web') {
    const handleStorageChange = async () => {
      await loadWatchedCount();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('phaseProgressUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('phaseProgressUpdate', handleStorageChange);
    };
  }
}, [phaseNumber]);

  const completionPercentage = totalVideos > 0 
    ? Math.round((watchedCount / totalVideos) * 100)
    : 0;

  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {language === 'en' ? 'Phase Progress' : 'Progreso de la Fase'}
          </Text>
          <Text style={styles.subtitle}>
            {watchedCount} {language === 'en' ? 'of' : 'de'} {totalVideos} {language === 'en' ? 'videos watched' : 'videos vistos'}
          </Text>
        </View>
        
        <View style={styles.percentageContainer}>
          <Text style={styles.percentage}>{completionPercentage}%</Text>
        </View>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${completionPercentage}%` }
            ]} 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#033966",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
  },
  percentageContainer: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  percentage: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4CAF50",
  },
  progressBarContainer: {
    width: "100%",
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
});