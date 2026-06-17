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
      <main className="min-h-screen bg-slate-950 px-5 text-white sm:px-6">
        <section className={`mx-auto flex min-h-screen flex-col ${maxWidthClassName}`}>
          <header className="mb-8 pt-10 sm:pt-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-blue-400">RunPilot</p>
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <p className="min-w-0 truncate text-sm text-slate-300">
                  안녕하세요, <span className="font-semibold text-white">{displayName}</span>님
                </p>
                <LogoutButton />
              </div>
            </div>

            <div className="mt-5 flex min-h-32 flex-col justify-end sm:min-h-36">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">{title}</h1>
              <p className="mt-3 max-w-2xl text-base leading-6 text-slate-400">{description}</p>
            </div>

            <nav
              className="-mx-5 mt-5 flex min-h-12 gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0"
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
                        ? 'flex h-11 shrink-0 items-center whitespace-nowrap rounded-lg bg-blue-500 px-4 text-sm font-semibold text-white'
                        : 'flex h-11 shrink-0 items-center whitespace-nowrap rounded-lg border border-slate-700 px-4 text-sm font-semibold text-slate-200 hover:bg-slate-900'
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
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
