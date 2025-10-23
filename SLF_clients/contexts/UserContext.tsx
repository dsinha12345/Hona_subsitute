import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { storage } from '../utils/storage';
import api from '../services/api';

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
  updateLastWatchedVideo: (phaseNumber: number, videoId: string) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { authUser, isAuthenticated } = useAuth(); // Load from useAuth
  const [user, setUser] = useState<UserData | null>(null);

  // Effect to load user data from API upon authentication status change
  useEffect(() => {
    const loadUser = async () => {
      // Check if authenticated. If not, clear user state and stop.
      if (!isAuthenticated || !authUser) {
        setUser(null);
        return;
      }

      try {
        // Load from API
        const response = await api.get('/api/user/me'); 
        
        // Explicitly map fields, relying on API data
        setUser({
          name: response.data.name,
          currentPhase: response.data.currentPhase,
          email: response.data.email,
          caseNumber: response.data.caseNumber,
          lastWatchedVideo: response.data.lastWatchedVideo // API is the source of truth
        });

      } catch (error) {
        console.error('Failed to load user from API:', error);
        // Clear user on failure to load from API
        setUser(null); 
      }
    };

    loadUser();
  }, [isAuthenticated, authUser]); // Dependencies on auth status

  const updateCurrentPhase = async (phase: number) => {
    if (user) {
      // Optimistic update
      const oldPhase = user.currentPhase;
      setUser({ ...user, currentPhase: phase });
      
      try {
        // Update phase via API
        await api.post('/api/user/update-phase', { phase });

        // Dispatch custom event (if needed for other components)
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('userPhaseUpdate'));
        }

      } catch (error) {
        console.error('Failed to update current phase:', error);
        // Revert on error
        setUser(prev => prev ? { ...prev, currentPhase: oldPhase } : null);
      }
    }
  };

  const updateLastWatchedVideo = async (phaseNumber: number, videoId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        lastWatchedVideo: { phaseNumber, videoId }
      };
      setUser(updatedUser);
      
      // Save to storage for offline
      await storage.setItem('lastWatchedVideo', JSON.stringify({ phaseNumber, videoId }));
      
      // Try to sync with API
      try {
        await api.patch('/api/user/last-video', { phaseNumber, videoId });
      } catch (error) {
        console.error('Failed to update last watched video:', error);
        // Continue even if API fails - local storage has it
      }
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
      updateLastWatchedVideo: async () => {},
    };
  }
  return context;
}

// Helper function to get phase route name
export function getPhaseRouteName(phaseNumber: number): string {
  return `Phases/phase${phaseNumber}`;
}