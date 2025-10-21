import { View, Text, StyleSheet, ScrollView, Platform, Pressable } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "../contexts/LanguageContext";
import { useUser } from "../contexts/UserContext";

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
  const { user, updateLastWatchedVideo } = useUser();
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set());
  const scrollViewRef = useRef<ScrollView>(null);
  const videoRefs = useRef<{ [key: string]: View | null }>({});
  const [hasScrolled, setHasScrolled] = useState(false);

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

  // Scroll to last watched video if on the same phase
  useEffect(() => {
    if (user?.lastWatchedVideo?.phaseNumber === phaseNumber) {
      const lastVideoId = user.lastWatchedVideo.videoId;
      // Small delay to ensure refs are set
      setTimeout(() => {
        const videoRef = videoRefs.current[lastVideoId];
        if (videoRef && scrollViewRef.current) {
          videoRef.measureLayout(
            // @ts-ignore - findNodeHandle is available
            scrollViewRef.current.getInnerViewNode?.() || scrollViewRef.current,
            (x, y) => {
              scrollViewRef.current?.scrollTo({ y: y - 20, animated: true });
            },
            () => console.log('Failed to measure video position')
          );
        }
      }, 500);
    }
  }, [user?.lastWatchedVideo, phaseNumber]);

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
        // Update last watched video when user checks a video
        updateLastWatchedVideo(phaseNumber, videoId);
      }
      return newSet;
    });
  };

  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.phaseTitle}>{phaseTitle[language]}</Text>
        <Text style={styles.phaseDescription}>{phaseDescription[language]}</Text>
      </View>

      {videos.map((video, index) => {
        const isWatched = watchedVideos.has(video.id);
        const isLastWatched = user?.lastWatchedVideo?.videoId === video.id && 
                              user?.lastWatchedVideo?.phaseNumber === phaseNumber;
        
        return (
          <View 
            key={video.id} 
            ref={(ref) => { videoRefs.current[video.id] = ref; }}
            style={[
              styles.videoCard,
              isLastWatched && styles.videoCardHighlighted
            ]}
          >
            {/* Video Title */}
            <View style={styles.videoHeader}>
              <View style={styles.videoTitleContainer}>
                <Text style={styles.videoTitle}>{video.title[language]}</Text>
                {isLastWatched && (
                  <View style={styles.lastWatchedBadge}>
                    <Ionicons name="play-circle" size={12} color="#fff" />
                    <Text style={styles.lastWatchedText}>
                      {language === 'en' ? 'Continue' : 'Continuar'}
                    </Text>
                  </View>
                )}
              </View>
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

      <View style={styles.bottomSpacer} />
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
  videoCardHighlighted: {
    borderWidth: 3,
    borderColor: "#4CAF50",
  },
  videoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingBottom: 12,
  },
  videoTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  lastWatchedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: "flex-start",
    gap: 4,
  },
  lastWatchedText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
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
  bottomSpacer: {
    height: 80, // Space for fixed footer
  },
});