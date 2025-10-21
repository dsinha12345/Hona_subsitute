import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

export type VideoItem = {
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
};

// Platform-specific video component
function VideoPlayer({ loomEmbedUrl }: { loomEmbedUrl: string }) {
  if (Platform.OS === "web") {
    // For web, use an iframe with responsive wrapper
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
    // For mobile, show message or use WebView if available
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
  videos 
}: VideoSectionProps) {
  const { language, t } = useLanguage();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.phaseTitle}>{phaseTitle[language]}</Text>
        <Text style={styles.phaseDescription}>{phaseDescription[language]}</Text>
      </View>

      {videos.map((video, index) => (
        <View key={index} style={styles.videoCard}>
          {/* Video Title */}
          <Text style={styles.videoTitle}>{video.title[language]}</Text>
          
          {/* Loom Video Embed */}
          <View style={styles.videoContainer}>
            <VideoPlayer loomEmbedUrl={video.loomEmbedUrl[language]} />
          </View>
          
          {/* Video Summary */}
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryLabel}>{t('video.summary')}</Text>
            <Text style={styles.summaryText}>{video.summary[language]}</Text>
          </View>
        </View>
      ))}

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
  videoTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    padding: 16,
    paddingBottom: 12,
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
  bottomSpacer: {
    height: 20,
  },
});