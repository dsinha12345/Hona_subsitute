import { View, Text, StyleSheet, ScrollView, Platform, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "../contexts/LanguageContext";

export type VideoItem = {
  id: string; // Unique identifier for the video
  title: {
    en: string;
    es: string;
  };
  loomEmbedUrl: {
    en: string;
    es: string;
  };
  summary: {
    en: string;
    es: string;
  };
};

type VideoSectionProps = {
  phaseTitle: {
    en: string;
    es: string;
  };
  phaseDescription: {
    en: string;
    es: string;
  };
  videos: VideoItem[];
  phaseNumber: number; // Used for storage key
};

// Platform-specific video component
function VideoPlayer({ loomEmbedUrl }: { loomEmbedUrl: string }) {
  if (Platform.OS === "web") {
    return (
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
        <iframe
          src={loomEmbedUrl}
          frameBorder="0"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    );
  } else {
    return (
      <View style={styles.mobileVideoPlaceholder}>
        <Text style={styles.mobileVideoText}>
          Video playback available on web
        </Text>
      </View>
    );
  }
}

export default function VideoSection({ 
  phaseTitle, 
  phaseDescription, 
  videos,
  phaseNumber 
}: VideoSectionProps) {
  const { language, t } = useLanguage();
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set());

  // Load watched videos from localStorage on mount
  useEffect(() => {
    const storageKey = `phase_${phaseNumber}_watched`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setWatchedVideos(new Set(parsed));
      } catch (e) {
        console.error("Error loading watched videos:", e);
      }
    }
  }, [phaseNumber]);

  // Save watched videos to localStorage whenever it changes
  useEffect(() => {
    const storageKey = `phase_${phaseNumber}_watched`;
    localStorage.setItem(storageKey, JSON.stringify(Array.from(watchedVideos)));
    // Dispatch custom event to update footer
    window.dispatchEvent(new Event('phaseProgressUpdate'));
  }, [watchedVideos, phaseNumber]);

  const toggleWatched = (videoId: string) => {
    setWatchedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const completionPercentage = videos.length > 0 
    ? Math.round((watchedVideos.size / videos.length) * 100)
    : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.phaseTitle}>{phaseTitle[language]}</Text>
        <Text style={styles.phaseDescription}>{phaseDescription[language]}</Text>
      </View>

      {videos.map((video, index) => {
        const isWatched = watchedVideos.has(video.id);
        
        return (
          <View key={video.id} style={styles.videoCard}>
            {/* Video Title */}
            <View style={styles.videoHeader}>
              <Text style={styles.videoTitle}>{video.title[language]}</Text>
              <View style={styles.videoNumber}>
                <Text style={styles.videoNumberText}>{index + 1}/{videos.length}</Text>
              </View>
            </View>
            
            {/* Loom Video Embed */}
            <View style={styles.videoContainer}>
              <VideoPlayer loomEmbedUrl={video.loomEmbedUrl[language]} />
            </View>
            
            {/* Video Summary */}
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryLabel}>{t('video.summary')}</Text>
              <Text style={styles.summaryText}>{video.summary[language]}</Text>
            </View>

            {/* Watched Checkbox */}
            <Pressable 
              style={styles.checkboxContainer}
              onPress={() => toggleWatched(video.id)}
            >
              <View style={[styles.checkbox, isWatched && styles.checkboxChecked]}>
                {isWatched && (
                  <Ionicons name="checkmark" size={18} color="#fff" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>
                {language === 'en' ? 'Mark as watched' : 'Marcar como visto'}
              </Text>
            </Pressable>
          </View>
        );
      })}

          </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  phaseTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000080",
    marginBottom: 8,
  },
  phaseDescription: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  videoCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  videoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingBottom: 12,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 12,
  },
  videoNumber: {
    backgroundColor: "#000080",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  videoNumberText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  videoContainer: {
    width: "100%",
    backgroundColor: "#000",
  },
  mobileVideoPlaceholder: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000080",
  },
  mobileVideoText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000080",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summaryText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#555",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  phaseProgressSection: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000080",
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: "700",
    color: "#4CAF50",
  },
  progressBarContainer: {
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 6,
  },
  progressSubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  bottomSpacer: {
    height: 20,
  },
});