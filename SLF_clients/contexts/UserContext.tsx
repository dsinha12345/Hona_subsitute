import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserData = {
  name: string;
  currentPhase: number; // 1-15
  email?: string;
  caseNumber?: string;
  lastWatchedVideo?: {
    phaseNumber: number;
    videoId: string;
  };
};

type UserContextType = {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  updateCurrentPhase: (phase: number) => void;
  updateLastWatchedVideo: (phaseNumber: number, videoId: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // HARDCODED USER DATA - Replace this with API call later
  const [user, setUser] = useState<UserData | null>({
    name: "John Doe",
    currentPhase: 8, // User is currently in Phase 8: Discovery
    email: "john.doe@example.com",
    caseNumber: "CASE-2024-001",
  });

  const updateCurrentPhase = (phase: number) => {
    if (user) {
      setUser({ ...user, currentPhase: phase });
      // TODO: Later, make API call to update phase in MongoDB
      // await fetch('/api/user/update-phase', { method: 'POST', body: JSON.stringify({ phase }) });
    }
  };

  const updateLastWatchedVideo = (phaseNumber: number, videoId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        lastWatchedVideo: { phaseNumber, videoId }
      };
      setUser(updatedUser);
      // Save to localStorage for persistence
      localStorage.setItem('lastWatchedVideo', JSON.stringify({ phaseNumber, videoId }));
      // TODO: Later, make API call to update in MongoDB
      // await fetch('/api/user/update-last-video', { method: 'POST', body: JSON.stringify({ phaseNumber, videoId }) });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateCurrentPhase, updateLastWatchedVideo }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use user context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    // Return default values if provider not found (shouldn't happen in production)
    console.warn('useUser called outside UserProvider');
    return {
      user: null,
      setUser: () => {},
      updateCurrentPhase: () => {},
      updateLastWatchedVideo: () => {},
    };
  }
  return context;
}

// Helper function to get phase route name
export function getPhaseRouteName(phaseNumber: number): string {
  return `Phases/phase${phaseNumber}`;
}