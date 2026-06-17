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
  { href: '/running-records', label: '기록' },
  { href: '/training-plans', label: '계획' },
  { href: '/runner-profile/setup', label: '프로필' },
];

const getIsActive = (pathname: string, href: string) => {
  if (href === '/dashboard') {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

export const ProtectedPageLayout = ({
  description,
  children,
  maxWidthClassName = 'max-w-5xl',
}: ProtectedPageLayoutProps) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const displayName = user?.nickname || user?.email || 'Runner';

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-950 px-5 pt-5 text-white sm:px-6 sm:pt-6">
        <section className={`mx-auto flex min-h-screen flex-col ${maxWidthClassName}`}>
          <header className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-blue-400">RunPilot</p>
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <p className="min-w-0 truncate text-sm text-slate-300">
                  안녕하세요, <span className="font-semibold text-white">{displayName}</span>님
                </p>
                <LogoutButton />
              </div>
            </div>

            <nav
              className="mt-5 flex gap-2 overflow-x-auto pb-1"
              aria-label="보호 페이지"
            >
              {navigationItems.map((item) => {
                const isActive = getIsActive(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={
                      isActive
                        ? 'flex h-10 flex-1 shrink-0 items-center justify-center rounded-full bg-blue-500 px-3 text-sm font-semibold leading-none text-white shadow-sm shadow-blue-500/20 sm:flex-none sm:px-4'
                        : 'flex h-10 flex-1 shrink-0 items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/60 px-3 text-sm font-semibold leading-none text-slate-300 hover:border-slate-500 hover:bg-slate-900 hover:text-white sm:flex-none sm:px-4'
                    }
                  >
                    <span className="whitespace-nowrap">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <p className="mt-4 max-w-2xl text-base leading-6 text-slate-400">{description}</p>
          </header>

          <div className="flex-1 pb-20 sm:pb-24">{children}</div>

          <footer className="border-t border-slate-800 py-12 text-center text-sm text-slate-500 sm:py-14">
            RunPilot
          </footer>
        </section>
      </main>
    </ProtectedRoute>
  );
};
