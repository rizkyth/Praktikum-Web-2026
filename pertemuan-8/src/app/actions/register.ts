'use server';

import { db } from '@/../prisma/db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function registerAction(_state: unknown, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const nim = formData.get('nim') as string || null;

  if (!name || !email || !password) {
    return { error: 'Nama, email, dan password wajib diisi.' };
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return { error: 'Email sudah terdaftar.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      nim: nim || null,
    },
  });

  return { success: true };
}

export async function loginAction(_state: unknown, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email dan password wajib diisi.' };
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return { error: 'Email atau password salah.' };
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return { error: 'Email atau password salah.' };
  }

  const cookieStore = await cookies();
  cookieStore.set('praktikum_session', JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    nim: user.nim,
    role: user.role,
  }), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/' });

  return { success: true };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('praktikum_session');
}
