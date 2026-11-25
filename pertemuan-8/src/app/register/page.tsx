'use client';

import { registerAction } from "@/app/actions/register";
import Link from "next/link";
import { useActionState } from "react";

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-funky-cyan/10 py-20">
      <div className="brutalist-card p-10 w-full max-w-md">
        <h1 className="text-4xl font-black text-center mb-8 funky-gradient-text">SIGN.UP</h1>
        <form action={formAction} className="space-y-6">
          <div>
            <label className="block font-black text-sm mb-2 uppercase tracking-wider">Nama Lengkap</label>
            <input type="text" name="name" required className="w-full border-4 border-black px-4 py-3 font-mono focus:outline-none focus:ring-4 focus:ring-funky-pink" />
          </div>
          <div>
            <label className="block font-black text-sm mb-2 uppercase tracking-wider">NIM (Opsional)</label>
            <input type="text" name="nim" className="w-full border-4 border-black px-4 py-3 font-mono focus:outline-none focus:ring-4 focus:ring-funky-pink" />
          </div>
          <div>
            <label className="block font-black text-sm mb-2 uppercase tracking-wider">Email</label>
            <input type="email" name="email" required className="w-full border-4 border-black px-4 py-3 font-mono focus:outline-none focus:ring-4 focus:ring-funky-pink" />
          </div>
          <div>
            <label className="block font-black text-sm mb-2 uppercase tracking-wider">Password</label>
            <input type="password" name="password" required minLength={6} className="w-full border-4 border-black px-4 py-3 font-mono focus:outline-none focus:ring-4 focus:ring-funky-pink" />
          </div>
          {state?.error && <p className="bg-funky-pink text-white p-4 font-black text-center border-4 border-black">{state.error}</p>}
          {state?.success && (
            <p className="bg-funky-cyan text-black p-4 font-black text-center border-4 border-black">
              Registrasi berhasil!{" "}
              <Link href="/login" className="underline font-black">Slide In</Link>
            </p>
          )}
          <button type="submit" className="brutalist-button bg-funky-yellow text-black w-full text-lg uppercase">
            Join Us!
          </button>
        </form>
        <p className="mt-6 text-center font-medium">
          <span className="border-b-2 border-black">Sudah punya akun?</span>{' '}
          <Link href="/login" className="text-funky-pink font-black hover:text-funky-cyan">Slide In</Link>
        </p>
      </div>
    </div>
  );
}
