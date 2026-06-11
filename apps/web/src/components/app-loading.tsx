'use client';

export const AppLoading = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-sm rounded-lg border border-slate-800 bg-slate-900 p-6 text-center shadow-lg">
        <p className="text-sm font-semibold text-blue-400">RunPilot</p>
        <h1 className="mt-3 text-2xl font-bold">작업 공간을 준비하는 중</h1>
        <p className="mt-3 text-sm text-slate-400">
          로그인 상태와 러닝 데이터를 확인하고 있습니다.
        </p>
        <div className="mt-6 h-2 overflow-hidden rounded bg-slate-800">
          <div className="h-full w-1/2 animate-pulse rounded bg-blue-500" />
        </div>
      </div>
    </main>
  );
};
