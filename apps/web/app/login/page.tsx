export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <p className="mb-2 text-sm font-semibold text-blue-400">RunPilot</p>

        <h1 className="text-3xl font-bold">로그인</h1>

        <p className="mt-3 text-sm text-slate-400">
          러닝 기록과 훈련 계획을 확인하려면 로그인해주세요.
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              이메일
            </label>
            <input
              type="email"
              placeholder="runner@example.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white hover:bg-blue-400"
          >
            로그인
          </button>
        </form>

        <a
          href="/"
          className="mt-6 block text-center text-sm text-slate-400 hover:text-white"
        >
          홈으로 돌아가기
        </a>
      </section>
    </main>
  );
}