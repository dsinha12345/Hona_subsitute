import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { DrawerHeaderProps, DrawerToggleButton } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import PhaseProgressBar from "./PhaseProgressBar";
import { useLanguage } from "../contexts/LanguageContext";

export default function CustomHeader(props: DrawerHeaderProps) {
  const { route, options } = props;
  const { language, setLanguage, t } = useLanguage();
  
  // Get translated title
  const getTranslatedTitle = () => {
    if (route.name === "index") {
      return t("phase.dashboard");
    }
    
    // Extract phase number from route name (e.g., "Phases/phase1" -> "1")
    const phaseMatch = route.name.match(/phase(\d+)/);
    if (phaseMatch) {
      const phaseNum = phaseMatch[1];
      return t(`phase.${phaseNum}`);
    }
    
    return options.title || route.name;
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerContainer}>
          <View style={styles.menuButton}>
            <DrawerToggleButton tintColor="#fff" />
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {getTranslatedTitle()}
            </Text>
          </View>
          
          <Pressable 
            style={styles.languageToggle}
            onPress={toggleLanguage}
          >
            <Text style={styles.languageText}>
              {language === "en" ? "ES" : "EN"}
            </Text>
          </Pressable>
        </View>
        
        <PhaseProgressBar currentPhaseName={route.name} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#033966",
  },
  headerWrapper: {
    backgroundColor: "#033966",
    paddingBottom: 8,
  },
  headerContainer: {
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  menuButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.3,
    textAlign: "center",
  },
  languageToggle: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  languageText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});