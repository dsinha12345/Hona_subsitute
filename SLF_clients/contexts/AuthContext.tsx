import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { storage } from '../utils/storage';
import api from '../services/api';

type UserRole = 'client' | 'admin';

type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  caseNumber?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  authUser: AuthUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo accounts fallback
const DEMO_ACCOUNTS = [
  {
    email: 'client@demo.com',
    password: 'client123',
    user: {
      id: 'demo-client-1',
      email: 'client@demo.com',
      name: 'John Doe',
      role: 'client' as UserRole,
      caseNumber: 'CASE-2024-001',
    },
  },
  {
    email: 'admin@demo.com',
    password: 'admin123',
    user: {
      id: 'demo-admin-1',
      email: 'admin@demo.com',
      name: 'Admin User',
      role: 'admin' as UserRole,
    },
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedUser = await storage.getItem('authUser');
      const token = await storage.getItem('authToken');
      
      if (storedUser && token) {
        const user = JSON.parse(storedUser);
        setAuthUser(user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithAPI = async (email: string, password: string) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Save token and user
      await storage.setItem('authToken', token);
      
      const authUserData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        caseNumber: user.caseNumber
      };
      
      await storage.setItem('authUser', JSON.stringify(authUserData));
      
      setAuthUser(authUserData);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error: any) {
      console.error('API login error:', error);
      throw error;
    }
  };

  const loginWithDemo = async (email: string, password: string) => {
    const account = DEMO_ACCOUNTS.find(
      acc => acc.email === email && acc.password === password
    );
    
    if (!account) {
      return { success: false, error: 'Invalid credentials' };
    }
    
    await storage.setItem('authUser', JSON.stringify(account.user));
    setAuthUser(account.user);
    setIsAuthenticated(true);
    
    return { success: true };
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Try API first
      const result = await loginWithAPI(email, password);
      return result;
    } catch (error: any) {
      console.log('API login failed, trying demo accounts...');
      
      // If network error, fall back to demo accounts
      if (!error.response || error.code === 'ECONNABORTED') {
        const demoResult = await loginWithDemo(email, password);
        if (demoResult.success) {
          console.log('Logged in with demo account (offline mode)');
        }
        return demoResult;
      }
      
      // If API responded with error, return that error
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await storage.removeItem('authUser');
    await storage.removeItem('authToken');
    setAuthUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authUser, login, logout, isLoading }}>
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