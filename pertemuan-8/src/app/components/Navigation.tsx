import Link from 'next/link';
import { cookies } from 'next/headers';
import { logoutAction } from '@/app/actions/register';

export default async function Navigation() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('praktikum_session');
  const isLoggedIn = !!sessionCookie;

  return (
    <nav className="bg-funky-yellow border-b-4 border-black sticky top-0 z-50 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-3xl font-black italic tracking-tighter border-2 border-black bg-white px-2 py-1 rotate-[-2deg] hover:rotate-0 transition-transform">
              FTY-8
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-lg font-black uppercase hover:skew-x-12 transition-transform"
            >
              Home
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard/profile"
                  className="text-lg font-black uppercase hover:skew-x-12 transition-transform"
                >
                  Me
                </Link>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="brutalist-button bg-funky-pink text-white uppercase text-sm"
                  >
                    Bye!
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/login"
                className="brutalist-button bg-funky-cyan text-black uppercase text-sm"
              >
                In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
