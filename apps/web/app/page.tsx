'use client';

import { useAuth } from '@contexts';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [router, user]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6">
        <p className="mb-4 text-sm font-semibold text-blue-400">
          RunPilot
        </p>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          러닝 기록으로 만드는
          <br />
          나만의 훈련 계획
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          RunPilot은 러닝 기록을 저장하고, 기록을 기반으로 훈련 계획을 생성하는 러닝 포트폴리오 서비스입니다.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-xl bg-blue-500 px-6 py-3 text-center font-semibold text-white hover:bg-blue-400"
          >
            회원가입
          </Link>
          <Link
            href="/login"
            className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 hover:bg-slate-900"
          >
            로그인
          </Link>
        </div>
      </section>
    </main>
  );
}
