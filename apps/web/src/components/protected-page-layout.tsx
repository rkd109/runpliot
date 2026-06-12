'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { useAuth } from '@contexts';
import { LogoutButton } from './logout-button';
import { ProtectedRoute } from './protected-route';

type ProtectedPageLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
  maxWidthClassName?: string;
};

const navigationItems = [
  { href: '/dashboard', label: '대시보드' },
  { href: '/running-records', label: '러닝 기록' },
  { href: '/training-plans', label: '훈련 계획' },
  { href: '/runner-profile/setup', label: '러닝 프로필' },
];

const getIsActive = (pathname: string, href: string) => {
  if (href === '/dashboard') {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

export const ProtectedPageLayout = ({
  title,
  description,
  children,
  maxWidthClassName = 'max-w-5xl',
}: ProtectedPageLayoutProps) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const displayName = user?.nickname || user?.email || 'Runner';

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <section className={`mx-auto ${maxWidthClassName}`}>
          <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-400">RunPilot</p>
              <h1 className="mt-2 text-4xl font-bold text-white">{title}</h1>
              <p className="mt-3 text-slate-400">{description}</p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <nav className="flex flex-wrap gap-2" aria-label="보호 페이지">
                {navigationItems.map((item) => {
                  const isActive = getIsActive(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={
                        isActive
                          ? 'rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white'
                          : 'rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900'
                      }
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex w-full flex-col gap-3 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 sm:w-auto sm:min-w-64 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase text-slate-500">Signed in</p>
                  <p className="mt-1 truncate text-sm font-semibold text-slate-200">{displayName}</p>
                </div>
                <LogoutButton />
              </div>
            </div>
          </header>

          {children}
        </section>
      </main>
    </ProtectedRoute>
  );
};
