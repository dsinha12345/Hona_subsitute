import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { ALL_SCREENS } from "../constants/phases"; // Import our new constant
import CustomHeader from "../components/CustomHeader"; // Import our new header

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        // Use our CustomHeader component for ALL screens
        header={(props) => <CustomHeader {...props} />}

        screenOptions={{
          // We still define these so the drawer itself is styled
          drawerActiveTintColor: "#f4511e",
          drawerInactiveTintColor: "#333",
          drawerLabelStyle: {
            marginLeft: -20,
          },
          
          // These header styles are now applied by our custom component,
          // but we keep them here so React Navigation can pass them
          // as 'options' to our CustomHeader.
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {/* Map over ALL screens */}
        {ALL_SCREENS.map((screen) => (
          <Drawer.Screen
            key={screen.name}
            name={screen.name} // e.g., "index" or "phases/phase1"
            options={{
              title: screen.label, // e.g., "Dashboard" or "Phase 1: Intake"
              drawerLabel: screen.label,
              drawerIcon: ({ color, size }) => (
                <Ionicons name={screen.icon} size={size} color={color} />
              ),
            }}
          />
        ))}
      </Drawer>
    </GestureHandlerRootView>
  );
}