'use client';

import { useAuth } from '@contexts';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { AppLoading } from './app-loading';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user, isInitializing } = useAuth();

  useEffect(() => {
    if (!isInitializing && !user) {
      router.replace('/login');
    }
  }, [isInitializing, user, router]);

  if (isInitializing) {
    return <AppLoading />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};
