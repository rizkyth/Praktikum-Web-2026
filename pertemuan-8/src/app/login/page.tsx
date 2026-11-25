'use client';

import { loginAction } from '@/app/actions/register';
import { useActionState } from 'react';

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-funky-cyan/10 py-20">
      <div className="brutalist-card p-10 w-full max-w-md">
        <h1 className="text-4xl font-black text-center mb-8 funky-gradient-text">LOG.IN</h1>
        <form action={formAction} className="space-y-6">
          <div>
            <label className="block font-black text-sm mb-2 uppercase tracking-wider">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border-4 border-black px-4 py-3 font-mono focus:outline-none focus:ring-4 focus:ring-funky-pink"
            />
          </div>
          <div>
            <label className="block font-black text-sm mb-2 uppercase tracking-wider">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full border-4 border-black px-4 py-3 font-mono focus:outline-none focus:ring-4 focus:ring-funky-pink"
            />
          </div>
          {state?.error && (
            <p className="bg-funky-pink text-white p-4 font-black text-center border-4 border-black">
              {state.error}
            </p>
          )}
          {state?.success && (
            <p className="bg-funky-cyan text-black p-4 font-black text-center border-4 border-black">
              Login berhasil! Redirecting...
            </p>
          )}
          <button
            type="submit"
            className="brutalist-button bg-funky-pink text-white w-full text-lg uppercase"
          >
            Slide In
          </button>
        </form>
        <p className="mt-6 text-center font-medium">
          <span className="border-b-2 border-black">Belum punya akun?</span>{' '}
          <a href="/register" className="text-funky-pink font-black hover:text-funky-cyan">Join Us</a>
        </p>
      </div>
    </div>
  );
}
