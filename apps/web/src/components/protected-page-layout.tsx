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
  { href: '/dashboard', label: '대시보드', shortLabel: '홈' },
  { href: '/running-records', label: '러닝 기록', shortLabel: '기록' },
  { href: '/training-plans', label: '훈련 계획', shortLabel: '계획' },
  { href: '/runner-profile/setup', label: '러닝 프로필', shortLabel: '프로필' },
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
      <main className="min-h-screen bg-slate-950 px-5 text-white sm:px-6">
        <section className={`mx-auto flex min-h-screen flex-col pt-10 sm:pt-12 ${maxWidthClassName}`}>
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
              className="mt-5 grid grid-cols-4 gap-1 rounded-full border border-slate-800 bg-slate-900/50 p-1 sm:inline-flex sm:w-auto"
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
                        ? 'flex h-9 min-w-0 items-center justify-center rounded-full bg-blue-500 px-2 text-xs font-semibold leading-none text-white shadow-sm shadow-blue-500/20 sm:min-w-max sm:px-4 sm:text-sm'
                        : 'flex h-9 min-w-0 items-center justify-center rounded-full px-2 text-xs font-semibold leading-none text-slate-300 hover:bg-slate-800 hover:text-white sm:min-w-max sm:px-4 sm:text-sm'
                    }
                  >
                    <span className="whitespace-nowrap sm:hidden">{item.shortLabel}</span>
                    <span className="hidden whitespace-nowrap sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-7">
              <h1 className="text-3xl font-bold text-white sm:text-5xl">{title}</h1>
              <p className="mt-3 max-w-2xl text-base leading-6 text-slate-400">{description}</p>
            </div>
          </header>

          <div className="flex-1">{children}</div>

          <footer className="mt-14 border-t border-slate-800 py-8 text-center text-xs text-slate-500 sm:mt-16">
            RunPilot
          </footer>
        </section>
      </main>
    </ProtectedRoute>
  );
};
