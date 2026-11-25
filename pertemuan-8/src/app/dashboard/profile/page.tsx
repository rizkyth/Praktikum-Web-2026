import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/../prisma/db";
import { logoutAction } from "@/app/actions/register";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardProfile() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("praktikum_session");

  let user: { id: number; name: string | null; email: string; nim: string | null; role: string } | null = null;

  if (sessionCookie) {
    try {
      const parsed = JSON.parse(sessionCookie.value);
      if (parsed?.id) {
        user = await db.user.findUnique({ where: { id: Number(parsed.id) } });
      }
    } catch {
      redirect("/login");
    }
  }

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-funky-cyan/10 py-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="brutalist-card p-10">
          <h1 className="text-4xl font-black text-center mb-8 funky-gradient-text">PRO.FILE</h1>
          
          <div className="grid gap-6 mb-8">
            <div className="bg-funky-yellow border-4 border-black p-6">
              <p className="font-black text-sm uppercase tracking-wider mb-1">Nama Lengkap</p>
              <p className="text-2xl font-bold">{user.name || "—"}</p>
            </div>
            <div className="bg-funky-cyan border-4 border-black p-6">
              <p className="font-black text-sm uppercase tracking-wider mb-1">NIM</p>
              <p className="text-2xl font-bold">{user.nim || "—"}</p>
            </div>
            <div className="bg-funky-pink text-white border-4 border-black p-6">
              <p className="font-black text-sm uppercase tracking-wider mb-1">Email</p>
              <p className="text-2xl font-bold">{user.email}</p>
            </div>
            <div className="bg-white border-4 border-black p-6">
              <p className="font-black text-sm uppercase tracking-wider mb-1">Hak Akses</p>
              <p className="text-2xl font-bold">{user.role}</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <form action={logoutAction}>
              <button type="submit" className="brutalist-button bg-funky-pink text-white text-lg uppercase">
                Eject
              </button>
            </form>
            <Link href="/" className="brutalist-button bg-funky-cyan text-black text-lg uppercase">
              ← Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
