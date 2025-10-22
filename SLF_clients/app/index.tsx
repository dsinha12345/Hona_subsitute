import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useUser, getPhaseRouteName } from "../contexts/UserContext";

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useUser();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    console.log("Dashboard loaded, user:", user);
    
    // Redirect to user's current phase
    if (user && user.currentPhase && !isRedirecting) {
      setIsRedirecting(true);
      const phaseRoute = getPhaseRouteName(user.currentPhase) as any;
      console.log("Redirecting to:", phaseRoute);
      
      // Small delay to ensure everything is loaded
      setTimeout(() => {
        router.replace(phaseRoute);
      }, 500);
    }
  }, [user, isRedirecting, router]);

  // Show loading while redirecting
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000080" />
      <Text style={styles.text}>Loading your case information...</Text>
      {user ? (
        <>
          <Text style={styles.subText}>
            Welcome back, {user.name}
          </Text>
          <Text style={styles.phaseText}>
            Redirecting to Phase {user.currentPhase}...
          </Text>
        </>
      ) : (
        <Text style={styles.subText}>
          Initializing...
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  subText: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
  phaseText: {
    marginTop: 4,
    fontSize: 12,
    color: "#033966",
    fontWeight: "600",
  },
});