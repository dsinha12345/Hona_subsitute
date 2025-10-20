import "react-native-gesture-handler"; // Must be at the top
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons"; // For icons

// Your 10 case phases
const CASE_PHASES = [
  { name: "index", label: "Dashboard", icon: "home-outline" },
  { name: "phases/phase1", label: "Phase 1: Intake", icon: "clipboard-outline" },
  { name: "phases/phase2", label: "Phase 2: Discovery", icon: "search-outline" },
  { name: "phases/phase3", label: "Phase 3: Strategy", icon: "bulb-outline" },
  { name: "phases/phase4", label: "Phase 4: Pre-Trial", icon: "shield-outline" },
  { name: "phases/phase5", label: "Phase 5: Trial", icon: "briefcase-outline" },
  { name: "phases/phase6", label: "Phase 6: Verdict", icon: "gavel-outline" },
  { name: "phases/phase7", label: "Phase 7: Settlement", icon: "document-text-outline" },
  { name: "phases/phase8", label: "Phase 8: Appeal", icon: "arrow-up-outline" },
  { name: "phases/phase9", label: "Phase 9: Resolution", icon: "checkmark-circle-outline" },
  { name: "phases/phase10", label: "Phase 10: Case Closed", icon: "lock-closed-outline" },
];

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          // This styles the header for all screens
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          // This styles the drawer content
          drawerActiveTintColor: "#f4511e",
          drawerInactiveTintColor: "#333",
          drawerLabelStyle: {
            marginLeft: -20, // Adjust icon/label spacing
          },
        }}
      >
        {/* Map over your phases to create drawer screens */}
        {CASE_PHASES.map((phase) => (
          <Drawer.Screen
            key={phase.name}
            name={phase.name}
            options={{
              title: phase.label, // This sets the header title
              drawerLabel: phase.label, // This is the text in the drawer
              drawerIcon: ({ color, size }) => (
                <Ionicons name={phase.icon as any} size={size} color={color} />
              ),
            }}
          />
        ))}
      </Drawer>
    </GestureHandlerRootView>
  );
}