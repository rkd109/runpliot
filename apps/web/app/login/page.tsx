'use client';

import { StatusMessage } from '@components';
import { useAuth } from '@contexts/auth-context';
import { getApiErrorMessage, getMe, getPostAuthRedirectPath, login, setAccessToken } from '@utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const { accessToken } = await login({
        email,
        password,
      });

      setAccessToken(accessToken);

      const user = await getMe();
      setUser(user);
      const redirectPath = await getPostAuthRedirectPath();
      router.push(redirectPath);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <p className="mb-2 text-sm font-semibold text-blue-400">RunPilot</p>

        <h1 className="text-3xl font-bold">로그인</h1>

        <p className="mt-3 text-sm text-slate-400">
          러닝 기록과 훈련 계획을 확인하려면 로그인해주세요.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              이메일
            </label>
            <input
              type="email"
              value={email}
              placeholder="runner@example.com"
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              placeholder="비밀번호를 입력하세요"
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              required
            />
          </div>

          {errorMessage && <StatusMessage message={errorMessage} />}

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="mt-6 space-y-3 text-center text-sm">
          <Link href="/signup" className="block font-semibold text-blue-400 hover:text-blue-300">
            계정 만들기
          </Link>
          <Link href="/" className="block text-slate-400 hover:text-white">
            홈으로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  );
}
