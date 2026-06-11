'use client';

import { StatusMessage } from '@components';
import { useAuth } from '@contexts/auth-context';
import { getApiErrorMessage, getMe, setAccessToken, signup } from '@utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
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

      const { accessToken } = await signup({
        email,
        password,
        ...(nickname.trim() ? { nickname: nickname.trim() } : {}),
      });

      setAccessToken(accessToken);

      const user = await getMe();
      setUser(user);
      router.push('/runner-profile/setup');
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '회원가입에 실패했습니다. 입력한 정보를 확인해주세요.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-white">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <p className="mb-2 text-sm font-semibold text-blue-400">RunPilot</p>

        <h1 className="text-3xl font-bold">계정 만들기</h1>

        <p className="mt-3 text-sm text-slate-400">
          러닝 기록을 쌓고 나에게 맞는 훈련 계획을 시작하세요.
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
              닉네임
            </label>
            <input
              type="text"
              value={nickname}
              placeholder="runner"
              onChange={(event) => setNickname(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
            />
            <p className="mt-2 text-xs text-slate-500">선택 입력입니다.</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              placeholder="8자 이상 입력하세요"
              minLength={8}
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
            {isSubmitting ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <div className="mt-6 space-y-3 text-center text-sm">
          <Link href="/login" className="block font-semibold text-blue-400 hover:text-blue-300">
            이미 계정이 있나요? 로그인
          </Link>
          <Link href="/" className="block text-slate-400 hover:text-white">
            홈으로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  );
}
