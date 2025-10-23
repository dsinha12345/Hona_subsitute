import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
// Import API service
import api from '../services/api';
import { storage } from "../utils/storage"; // Still import storage for potential fallback if needed, but not primarily used here

type Props = {
  phaseNumber: number;
  totalVideos: number;
};

export default function PhaseProgressFooter({ phaseNumber, totalVideos }: Props) {
  const { language } = useLanguage();
  const [watchedCount, setWatchedCount] = useState(0);

  useEffect(() => {
    // Function to load watched videos count from the API
    const loadWatchedCountFromAPI = async () => {
      try {
        // Use the API endpoint to get progress for the current phase
        const response = await api.get(`/api/progress/phase/${phaseNumber}`);
        
        // Filter the response data to count only watched videos
        const watchedVideos = response.data.filter(
          (p: { watched: boolean }) => p.watched
        );
        
        setWatchedCount(watchedVideos.length);

      } catch (error) {
        console.error("Failed to load phase progress from API:", error);
        // Fallback or default to 0 on API failure
        setWatchedCount(0);
        
        // OPTIONAL: Fallback to local storage if API fails, as you did before.
        // const storageKey = `phase_${phaseNumber}_watched`;
        // const stored = await storage.getItem(storageKey);
        // if (stored) {
        //   try {
        //     const parsed = JSON.parse(stored);
        //     setWatchedCount(parsed.length);
        //   } catch (e) {
        //     setWatchedCount(0);
        //   }
        // }
      }
    };

    loadWatchedCountFromAPI();

    // Listen for custom events triggered by VideoSection.tsx (web only)
    if (Platform.OS === 'web') {
      // The `phaseProgressUpdate` event is dispatched in VideoSection.tsx 
      // after a successful API call to update progress.
      const handleProgressUpdate = () => {
        loadWatchedCountFromAPI();
      };

      // Note: We are no longer listening to 'storage' change as progress is API-driven
      window.addEventListener('phaseProgressUpdate', handleProgressUpdate);

      return () => {
        window.removeEventListener('phaseProgressUpdate', handleProgressUpdate);
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