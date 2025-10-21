import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { ALL_SCREENS } from "../constants/phases";
import CustomHeader from "../components/CustomHeader";
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";
import { useMemo } from "react";

function DrawerLayout() {
  const { t } = useLanguage();

  // Generate screen options with translations
  const getScreenOptions = useMemo(() => {
    return ALL_SCREENS.map((screen) => {
      // Get translated label
      let translatedLabel;
      if (screen.name === "index") {
        translatedLabel = t("phase.dashboard");
      } else {
        const phaseMatch = screen.name.match(/phase(\d+)/);
        if (phaseMatch) {
          const phaseNum = phaseMatch[1];
          translatedLabel = t(`phase.${phaseNum}`);
        } else {
          translatedLabel = screen.label;
        }
      }

      return {
        ...screen,
        translatedLabel,
      };
    });
  }, [t]);

  return (
    <Drawer
      screenOptions={{
        // Use our CustomHeader component for ALL screens
        header: (props) => <CustomHeader {...props} />,
        
        // Drawer styling
        drawerActiveTintColor: "#000080",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: 0,
          fontSize: 15,
          fontWeight: "500",
        },
        drawerItemStyle: {
          marginHorizontal: 8,
          paddingHorizontal: 8,
          borderRadius: 8,
        },
        drawerContentStyle: {
          paddingTop: 10,
        },
        
        // Header styles (these get passed to CustomHeader as 'options')
        headerStyle: {
          backgroundColor: "#000080",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {getScreenOptions.map((screen) => (
        <Drawer.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.translatedLabel,
            drawerLabel: screen.translatedLabel,
            drawerIcon: ({ color, size }) => (
              <Ionicons name={screen.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
      
      {/* Hidden screens - not shown in drawer */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="modal"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LanguageProvider>
        <DrawerLayout />
      </LanguageProvider>
    </GestureHandlerRootView>
  );
}