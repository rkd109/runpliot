import { APP_NAME, HEALTH_STATUS } from "@runpilot/shared";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Portfolio Monorepo
          </p>
          <h1 className="text-4xl font-bold text-slate-950 sm:text-5xl">
            {APP_NAME}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-700">
            Next.js, NestJS, PostgreSQL을 pnpm workspace로 묶은 실행 가능한
            기본 껍데기입니다.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Web", "Next.js App Router"],
            ["API", "NestJS on port 3001"],
            ["DB", "PostgreSQL 16 on port 15432"]
          ].map(([title, description]) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={title}
            >
              <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
              <p className="mt-2 text-sm text-slate-600">{description}</p>
            </article>
          ))}
        </div>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-emerald-950">
          Shared package status: {HEALTH_STATUS.OK}
        </div>
      </section>
    </main>
  );
}
