import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'client' | 'admin';

type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  caseNumber?: string; // Only for clients
};

type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('authUser');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error('Error parsing saved user:', e);
          localStorage.removeItem('authUser');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // HARDCODED LOGIN - Replace with API call later
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo accounts
    const demoAccounts = [
      {
        email: 'client@demo.com',
        password: 'client123',
        user: {
          id: '1',
          email: 'client@demo.com',
          name: 'John Doe',
          role: 'client' as UserRole,
          caseNumber: 'CASE-2024-001'
        }
      },
      {
        email: 'admin@demo.com',
        password: 'admin123',
        user: {
          id: '2',
          email: 'admin@demo.com',
          name: 'Admin User',
          role: 'admin' as UserRole
        }
      }
    ];

    const account = demoAccounts.find(
      acc => acc.email === email && acc.password === password
    );

    if (account) {
      setUser(account.user);
      localStorage.setItem('authUser', JSON.stringify(account.user));
      setIsLoading(false);
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: 'Invalid email or password' };
    }

    // TODO: Replace with actual API call
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // });
    // const data = await response.json();
    // if (data.success) {
    //   setUser(data.user);
    //   localStorage.setItem('authUser', JSON.stringify(data.user));
    //   return { success: true };
    // }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('lastWatchedVideo');
    // Clear all phase progress
    for (let i = 1; i <= 15; i++) {
      localStorage.removeItem(`phase_${i}_watched`);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        logout, 
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}