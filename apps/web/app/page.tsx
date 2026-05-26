'use client';

import { APP_NAME, HEALTH_STATUS } from "@runpilot/shared";

export default function HomePage() {
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
          RunPilot은 러닝 기록을 저장하고, 기록을 기반으로 훈련 계획을
          생성하는 러닝 포트폴리오 서비스입니다.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="/login"
            className="rounded-xl bg-blue-500 px-6 py-3 text-center font-semibold text-white hover:bg-blue-400"
          >
            로그인하기
          </a>

          <a
            href="/running-records"
            className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 hover:bg-slate-900"
          >
            러닝 기록 보기
          </a>

          <a
            href="/training-plans"
            className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 hover:bg-slate-900"
          >
            훈련 계획 보기
          </a>
        </div>
      </section>
    </main>
  );
}