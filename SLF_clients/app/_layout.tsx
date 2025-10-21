import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { ALL_SCREENS } from "../constants/phases";
import CustomHeader from "../components/CustomHeader";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";
import { UserProvider } from "../contexts/UserContext";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { useMemo, useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Slot } from "expo-router";

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
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
      <Drawer.Screen
        name="login"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="admin"
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
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'login';
    const inAdminGroup = segments[0] === 'admin';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect authenticated users away from login
      if (user?.role === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/');
      }
    } else if (isAuthenticated && user?.role === 'admin' && !inAdminGroup) {
      // Redirect admin to admin panel if not already there
      router.replace('/admin');
    } else if (isAuthenticated && user?.role === 'client' && inAdminGroup) {
      // Redirect clients away from admin panel
      router.replace('/');
    }
  }, [isAuthenticated, segments, isLoading, user, router]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000080" />
      </View>
    );
  }

  if (!isAuthenticated) {
    // Render login route
    return <Slot />;
  }

  // User is authenticated - check role
  if (user?.role === 'admin') {
    // Admin sees the admin panel (no drawer navigation)
    return <Slot />;
  }

  // Client sees the phase navigation with drawer
  return (
    <UserProvider>
      <LanguageProvider>
        <DrawerLayout />
      </LanguageProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});