'use client';

import { useAuth } from '@contexts';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="shrink-0 rounded-md border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-900"
    >
      로그아웃
    </button>
  );
};
