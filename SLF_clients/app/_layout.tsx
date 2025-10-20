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
        screenOptions={{
          // Use our CustomHeader component for ALL screens - MOVED HERE
          header: (props) => <CustomHeader {...props} />,
          
          // Drawer styling
          drawerActiveTintColor: "#f4511e",
          drawerInactiveTintColor: "#333",
          drawerLabelStyle: {
            marginLeft: 0,
          },
          
          // Header styles (these get passed to CustomHeader as 'options')
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
            name={screen.name} // e.g., "index" or "Phases/phase1"
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