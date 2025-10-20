import { Ionicons } from "@expo/vector-icons";

// Define the type for a screen
export type ScreenConfig = {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap; // Use keyof for type safety
};

// Define the Dashboard screen separately
export const DASHBOARD_SCREEN: ScreenConfig = {
  name: "index",
  label: "Dashboard",
  icon: "home-outline",
};

// Define the 10 phase screens
export const PHASE_SCREENS: ScreenConfig[] = [
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

// Export all screens together for the layout
export const ALL_SCREENS = [DASHBOARD_SCREEN, ...PHASE_SCREENS];