import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl text-center">
        
        {/* Logo ya Icon */}
        <div className="mb-6 inline-block p-4 bg-blue-600 rounded-full shadow-lg shadow-blue-500/50">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
          Welcome to <span className="text-blue-500 text-glow">My App</span>
        </h1>
        
        <p className="text-gray-400 mb-8">
          Sir, agar aap login nahi hain toh pehle khud ko register karein.
        </p>

        <div className="space-y-4">
          <div className="flex gap-4">
            <Link href="/login" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95">
              Login
            </Link>
            <Link href="/register" className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-xl border border-white/10 transition-all active:scale-95">
              Register
            </Link>
          </div>
          
          <Link href="/dashboard" className="block text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors pt-4">
            Go to Dashboard &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}