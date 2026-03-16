"use client";
import { useState } from 'react';
import { registerUser } from '../actions/auth';
import Link from 'next/link';

export default function Register() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData) {
        setLoading(true);
        setError('');
        
        try {
            const result = await registerUser(formData);
            if (result?.error) {
                setError(result.error);
                setLoading(false);
            }
        } catch (e) {
            setError("Kuch ghalat ho gaya. Dubara koshish karein.");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#0f172a] bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center p-6 font-sans text-center">
            <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                
                {/* Background Glow */}
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
                
                <h1 className="text-3xl font-black text-white mb-2 tracking-tight relative z-10">Create Account</h1>
                <p className="text-slate-400 mb-8 font-medium relative z-10">Apni details enter karein</p>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl animate-pulse relative z-10">
                        {error}
                    </div>
                )}

                <form action={handleSubmit} className="flex flex-col gap-5 relative z-10 text-left">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                        <input 
                            name="name" 
                            type="text"
                            placeholder="user name" 
                            required 
                            className="w-full mt-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" 
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                        <input 
                            name="email" 
                            type="email" 
                            placeholder="ali@example.com" 
                            required 
                            className="w-full mt-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" 
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
                        <input 
                            name="password" 
                            type="password" 
                            placeholder="••••••••" 
                            required 
                            className="w-full mt-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" 
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800/50 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 mt-2"
                    >
                        {loading ? 'Creating Account...' : 'Register Now'}
                    </button>
                </form>

                <p className="mt-8 text-slate-500 text-sm font-medium relative z-10">
                    Pehle se account hai? <Link href="/login" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">Login karein</Link>
                </p>
            </div>
        </div>
    );
}