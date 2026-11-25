export default function Home() {
  return (
    <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-funky-cyan/10">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-funky-pink opacity-20 blur-3xl rounded-full -z-10 animate-pulse" />
          <h1 className="text-6xl sm:text-8xl font-black mb-6 uppercase tracking-tighter leading-none">
            <span className="bg-black text-white px-4 py-2 inline-block rotate-[-3deg]">Wazzup</span><br />
            <span className="funky-gradient-text">MODUL 8</span>
          </h1>
          <p className="text-xl font-bold text-black max-w-2xl mx-auto mb-12 bg-funky-yellow px-4 py-2 border-2 border-black inline-block">
            Fullstack madness with Next.js & MySQL
          </p>
          <div className="flex justify-center gap-6">
            <a href="/register" className="brutalist-button bg-funky-pink text-white text-xl uppercase">
              Join Us!
            </a>
            <a href="/login" className="brutalist-button bg-white text-black text-xl uppercase">
              Slide In
            </a>
          </div>
        </div>
      </section>

      {/* Funky Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="brutalist-card p-8 bg-white rotate-1 hover:rotate-0 transition-transform">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-2xl font-black uppercase mb-4">Auth Chaos</h3>
            <p className="font-medium text-gray-900">Bcrypt hashes your secrets so they&apos;re actually safe. Magic!</p>
          </div>
          <div className="brutalist-card p-8 bg-funky-yellow -rotate-1 hover:rotate-0 transition-transform">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-black uppercase mb-4">Prisma Power</h3>
            <p className="font-medium text-gray-900">Type-safe queries. No more SQL nightmares (mostly).</p>
          </div>
          <div className="brutalist-card p-8 bg-funky-pink rotate-2 hover:rotate-0 transition-transform">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-black uppercase mb-4">Turbo Speed</h3>
            <p className="font-medium text-gray-900">Next.js 16 is so fast your browser won&apos;t know what hit it.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
