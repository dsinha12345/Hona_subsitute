import { View, Text, StyleSheet, ScrollView, Platform, Pressable, Linking, Alert, Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "../contexts/LanguageContext";
import { useUser } from "../contexts/UserContext";
import { storage } from "../utils/storage";
// Import WebView for mobile platforms
import { WebView } from 'react-native-webview';

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
function VideoPlayer({ loomEmbedUrl, title }: { loomEmbedUrl: string; title: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Check if URL looks like a valid Loom embed URL
  const isValidLoomUrl = loomEmbedUrl && 
    (loomEmbedUrl.includes('loom.com/embed/') || 
     loomEmbedUrl.includes('loom.com/share/'));
  
  if (Platform.OS === "web") {
    // Show placeholder if no URL or error occurred
    if (!loomEmbedUrl || hasError || !isValidLoomUrl) {
      return (
        <div style={{ 
          position: "relative", 
          paddingBottom: "56.25%", 
          height: 0,
          backgroundColor: "#000080",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎬</div>
            <div style={{ 
              color: "#fff", 
              fontSize: "20px", 
              fontWeight: "600" 
            }}>
              Video Coming Soon
            </div>
            <div style={{ 
              color: "#ccc", 
              fontSize: "14px", 
              marginTop: "8px" 
            }}>
              This video will be available shortly
            </div>
          </div>
        </div>
      );
    }
    
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
          onError={() => {
            console.error('Failed to load video:', loomEmbedUrl);
            setHasError(true);
          }}
        />
      </div>
    );
  } else {
    // Mobile implementation with WebView
    
    // Show placeholder if no URL or invalid
    if (!loomEmbedUrl || !isValidLoomUrl) {
      return (
        <View style={styles.videoComingSoon}>
          <Text style={styles.videoComingSoonEmoji}>🎬</Text>
          <Text style={styles.videoComingSoonText}>Video Coming Soon</Text>
          <Text style={styles.videoComingSoonSubtext}>
            This video will be available shortly
          </Text>
        </View>
      );
    }
    
    // Create HTML wrapper for better mobile experience
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
          <style>
            * { margin: 0; padding: 0; }
            body { 
              background: #000; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              height: 100vh;
            }
            iframe {
              width: 100vw;
              height: 56.25vw;
              max-height: 100vh;
              max-width: 177.78vh;
            }
            .error-container {
              background: #000080;
              color: white;
              text-align: center;
              padding: 20px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .error-emoji {
              font-size: 48px;
              margin-bottom: 16px;
            }
            .error-title {
              font-size: 20px;
              font-weight: 600;
              margin-bottom: 8px;
            }
            .error-subtitle {
              font-size: 14px;
              color: #ccc;
            }
          </style>
          <script>
            window.addEventListener('message', function(e) {
              if (e.data === 'loom-error') {
                document.body.innerHTML = \`
                  <div class="error-container">
                    <div class="error-emoji">🎬</div>
                    <div class="error-title">Video Coming Soon</div>
                    <div class="error-subtitle">This video will be available shortly</div>
                  </div>
                \`;
              }
            });
          </script>
        </head>
        <body>
          <iframe 
            src="${loomEmbedUrl}" 
            frameborder="0" 
            webkitallowfullscreen 
            mozallowfullscreen 
            allowfullscreen
            allow="autoplay; fullscreen; picture-in-picture"
            onerror="window.postMessage('loom-error', '*')"
          ></iframe>
        </body>
      </html>
    `;

    return (
      <View style={styles.mobileVideoContainer}>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <Text style={styles.loadingText}>Loading video...</Text>
          </View>
        )}
        <WebView
          source={{ html }}
          style={styles.webView}
          allowsFullscreenVideo={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          onLoadEnd={() => setIsLoading(false)}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
            setHasError(true);
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('HTTP error: ', nativeEvent.statusCode);
            if (nativeEvent.statusCode === 404) {
              setHasError(true);
            }
          }}
          renderError={() => (
            <View style={styles.videoComingSoon}>
              <Text style={styles.videoComingSoonEmoji}>🎬</Text>
              <Text style={styles.videoComingSoonText}>Video Coming Soon</Text>
              <Text style={styles.videoComingSoonSubtext}>
                This video will be available shortly
              </Text>
            </View>
          )}
          // Android specific props
          mixedContentMode="compatibility"
          // iOS specific props
          allowsLinkPreview={false}
          scrollEnabled={false}
        />
        {hasError && (
          <View style={[styles.videoComingSoon, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}>
            <Text style={styles.videoComingSoonEmoji}>🎬</Text>
            <Text style={styles.videoComingSoonText}>Video Coming Soon</Text>
            <Text style={styles.videoComingSoonSubtext}>
              This video will be available shortly
            </Text>
          </View>
        )}
      </View>
    );
  }
}

// Alternative: Open in External Browser Button (fallback option)
function ExternalVideoButton({ loomEmbedUrl, title, language }: { 
  loomEmbedUrl: string; 
  title: string;
  language: 'en' | 'es';
}) {
  const handleOpenExternal = () => {
    // Extract the actual Loom share URL from embed URL
    const loomId = loomEmbedUrl.match(/embed\/([a-zA-Z0-9]+)/)?.[1];
    const shareUrl = loomId 
      ? `https://www.loom.com/share/${loomId}`
      : loomEmbedUrl.replace('/embed/', '/share/');
    
    Linking.openURL(shareUrl).catch(err => {
      Alert.alert(
        language === 'en' ? 'Error' : 'Error',
        language === 'en' 
          ? 'Could not open video. Please try again.'
          : 'No se pudo abrir el video. Por favor intente de nuevo.',
        [{ text: 'OK' }]
      );
    });
  };

  return (
    <Pressable style={styles.externalButton} onPress={handleOpenExternal}>
      <Ionicons name="open-outline" size={20} color="#fff" />
      <Text style={styles.externalButtonText}>
        {language === 'en' ? 'Open in Browser' : 'Abrir en Navegador'}
      </Text>
    </Pressable>
  );
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
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  // Listen for screen size changes on web
  useEffect(() => {
    if (Platform.OS === 'web') {
      const updateDimensions = () => {
        setScreenWidth(Dimensions.get('window').width);
      };
      
      const subscription = Dimensions.addEventListener('change', updateDimensions);
      return () => subscription?.remove();
    }
  }, []);

  // Load watched videos from storage on mount
  useEffect(() => {
    const loadWatchedVideos = async () => {
      const storageKey = `phase_${phaseNumber}_watched`;
      const stored = await storage.getItem(storageKey);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setWatchedVideos(new Set(parsed));
        } catch (e) {
          console.error("Error loading watched videos:", e);
        }
      }
    };
    loadWatchedVideos();
  }, [phaseNumber]);

  // Scroll to last watched video if on the same phase
  useEffect(() => {
    if (user?.lastWatchedVideo?.phaseNumber === phaseNumber && !hasScrolled) {
      const lastVideoId = user.lastWatchedVideo.videoId;
      const videoIndex = videos.findIndex(v => v.id === lastVideoId);
      
      if (videoIndex !== -1) {
        // Calculate approximate scroll position
        const scrollPosition = 120 + (videoIndex * 600);
        
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ 
            y: scrollPosition, 
            animated: true 
          });
          setHasScrolled(true);
        }, 800);
        
        console.log(`Scrolling to last watched video: ${lastVideoId} at index ${videoIndex}`);
      }
    }
  }, [user?.lastWatchedVideo, phaseNumber, videos, hasScrolled]);

  // Save watched videos to storage whenever it changes
  useEffect(() => {
    const saveWatchedVideos = async () => {
      const storageKey = `phase_${phaseNumber}_watched`;
      await storage.setItem(storageKey, JSON.stringify(Array.from(watchedVideos)));
      // Dispatch custom event to update footer (web only)
      if (Platform.OS === 'web') {
        window.dispatchEvent(new Event('phaseProgressUpdate'));
      }
    };
    if (watchedVideos.size > 0) {
      saveWatchedVideos();
    }
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
        
        // Calculate responsive width for web
        const getCardStyle = (): any[] => {
          const baseStyles: any[] = [styles.videoCard];
          
          if (isLastWatched) {
            baseStyles.push(styles.videoCardHighlighted);
          }
          
          if (Platform.OS === 'web' && screenWidth > 1024) {
            baseStyles.push({
              maxWidth: 800,
              alignSelf: 'center' as 'center',
              width: '100%',
              marginHorizontal: 16,
            });
          }
          
          return baseStyles;
        };
        
        return (
          <View 
            key={video.id} 
            ref={(ref) => { videoRefs.current[video.id] = ref; }}
            style={getCardStyle()}
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
            
            {/* Video Player */}
            <View style={styles.videoContainer}>
              <VideoPlayer 
                loomEmbedUrl={video.loomEmbedUrl[language]} 
                title={video.title[language]}
              />
              
              {/* Add external link option for mobile as small fallback */}
              {Platform.OS !== 'web' && video.loomEmbedUrl[language] && (
                <View style={styles.alternativeOption}>
                  <ExternalVideoButton 
                    loomEmbedUrl={video.loomEmbedUrl[language]}
                    title={video.title[language]}
                    language={language}
                  />
                </View>
              )}
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
  mobileVideoContainer: {
    width: "100%",
    height: 250,
    backgroundColor: "#000",
  },
  webView: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
  },
  externalButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
  },
  externalButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  alternativeOption: {
    position: "absolute",
    bottom: 10,
    right: 10,
    opacity: 0.9,
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
  videoComingSoon: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000080",
  },
  videoComingSoonEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  videoComingSoonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  videoComingSoonSubtext: {
    color: "#ccc",
    fontSize: 14,
  },
  bottomSpacer: {
    height: 80, // Space for fixed footer
  },
});