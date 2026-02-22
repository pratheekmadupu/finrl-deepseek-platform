"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TrendingUp, Mail, Lock, Terminal, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            router.push('/dashboard');
        } catch (err: any) {
            if (!err.response) {
                alert('Backend server is not responding. Please ensure the backend is running on port 5001.');
            } else {
                alert(err.response.data.message || 'Login failed.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030712] flex flex-col justify-center items-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md z-10"
            >
                <div className="flex flex-col items-center mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-12 h-12 text-indigo-500" />
                        <span className="text-4xl font-black tracking-tighter text-white italic">FINRL-<span className="text-indigo-500 not-italic">DEEPSEEK</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-[10px] tracking-[0.3em] uppercase opacity-70">
                        <Terminal className="w-3 h-3" />
                        Neural Gateway Active
                    </div>
                </div>

                <div className="terminal-card bg-slate-900/40 backdrop-blur-xl border-slate-800 p-8 rounded-3xl shadow-2xl relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-indigo-500 rounded-b-full shadow-[0_0_15px_#6366f1]" />

                    <h2 className="text-3xl font-black mb-8 text-center text-white italic tracking-tighter">AUTHENTICATE</h2>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Institutional Identifier</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/40 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono text-sm"
                                    placeholder="analyst@finrl.ai"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Security Keyphrase</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/40 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative group overflow-hidden bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-50 text-xs tracking-widest uppercase"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? "ESTABLISHING LINK..." : (
                                    <>
                                        INITIALIZE SESSION
                                        <Zap className="w-4 h-4" />
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                            New Node? <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 transition-colors">Register Identity</Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-6 opacity-30">
                    <div className="flex items-center gap-2 text-[8px] font-black text-slate-500 uppercase tracking-widest">
                        <Activity className="w-3 h-3" />
                        Network Stable
                    </div>
                    <div className="flex items-center gap-2 text-[8px] font-black text-slate-500 uppercase tracking-widest">
                        <Shield className="w-3 h-3" />
                        AES-256 Enabled
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function Shield({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
}
