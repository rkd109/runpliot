'use client';

import { useAuth } from '@contexts';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';


export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user, isInitializing } = useAuth();

  useEffect(() => {
    if (!isInitializing && !user) {
      router.replace('/login');
    }
  }, [isInitializing, user, router]);

  if (isInitializing) {
    return <div>loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};