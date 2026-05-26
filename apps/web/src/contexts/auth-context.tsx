'use client';

import { api, getAccessToken, removeAccessToken } from '@utils';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';


type AuthUser = {
  userId: number;
  email: string;
  nickname?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  isInitializing : boolean
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      const accessToken = getAccessToken();

      if (!accessToken) {
        setIsInitializing(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        setUser(response.data.data);
      } catch {
        removeAccessToken();
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };

    restoreUser();
  }, []);

  if (isInitializing) {
    return <div>loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isInitializing }} >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};