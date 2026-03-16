"use client";
import { useState } from 'react';
import { loginUser } from '../actions/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(formData) {
        setLoading(true);
        setError(''); 
        
        const result = await loginUser(formData);
        
        if (result?.success) {
            // Agar success hai toh yahan se redirect hoga
            router.push('/dashboard'); 
        } else if (result?.error) {
            setError(result.error);
            setLoading(false);
        } else {
            setError("Kuch ghalat ho gaya.");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#0f172a] bg-gradient-to-br from-slate-900 via-[#1e293b] to-black flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <h1 className="text-3xl font-black text-white mb-2 text-center">Welcome Back</h1>
                <p className="text-slate-400 mb-8 text-center">Login karke Dashboard par jayein</p>
                
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl text-center">
                        {error}
                    </div>
                )}
                
                <form action={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
                        <input name="email" type="email" required className="w-full mt-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 outline-none" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
                        <input name="password" type="password" required className="w-full mt-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 outline-none" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl mt-2 transition-all">
                        {loading ? 'Processing...' : 'Sign In'}
                    </button>
                </form>
                <p className="mt-8 text-slate-500 text-sm text-center">
                    Naya account? <Link href="/register" className="text-blue-400 font-bold">Register karein</Link>
                </p>
            </div>
        </div>
    );
}