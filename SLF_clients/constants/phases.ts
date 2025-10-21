import { Ionicons } from "@expo/vector-icons";

// Define the type for a screen
export type ScreenConfig = {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

// Define the Dashboard screen separately
export const DASHBOARD_SCREEN: ScreenConfig = {
  name: "index",
  label: "Dashboard",
  icon: "home-outline",
};

// Define the 15 phase screens
export const PHASE_SCREENS: ScreenConfig[] = [
  { name: "Phases/phase1", label: "Phase 1: Investigation", icon: "search-outline" },
  { name: "Phases/phase2", label: "Phase 2: Property Damage", icon: "car-outline" },
  { name: "Phases/phase3", label: "Phase 3: Treatment", icon: "medical-outline" },
  { name: "Phases/phase4", label: "Phase 4: Demand Preparation", icon: "document-text-outline" },
  { name: "Phases/phase5", label: "Phase 5: Negotiation and Insurance", icon: "cash-outline" },
  { name: "Phases/phase6", label: "Phase 6: Case Transfer to Litigation", icon: "swap-horizontal-outline" },
  { name: "Phases/phase7", label: "Phase 7: Lawsuit Filed", icon: "document-attach-outline" },
  { name: "Phases/phase8", label: "Phase 8: Discovery", icon: "document-attach-outline" },
  { name: "Phases/phase9", label: "Phase 9: Depositions", icon: "mic-outline" },
  { name: "Phases/phase10", label: "Phase 10: Mediation", icon: "people-outline" },
  { name: "Phases/phase11", label: "Phase 11: Trial Preparation", icon: "briefcase-outline" },
  { name: "Phases/phase12", label: "Phase 12: Appeal", icon: "arrow-up-circle-outline" },
  { name: "Phases/phase13", label: "Phase 13: Subrogations and Liens", icon: "link-outline" },
  { name: "Phases/phase14", label: "Phase 14: Payoff", icon: "card-outline" },
  { name: "Phases/phase15", label: "Phase 15: Closing the File", icon: "checkmark-done-outline" },
];

// Export all screens together for the layout
export const ALL_SCREENS = [DASHBOARD_SCREEN, ...PHASE_SCREENS];