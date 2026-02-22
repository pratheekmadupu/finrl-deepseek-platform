"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import AnalysisWorkspace from '@/components/AnalysisWorkspace';
import OutputPanel from '@/components/OutputPanel';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Activity, Bell, Search, Terminal as TerminalIcon, ShieldCheck, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('new');
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (!token) {
            router.push('/login');
        } else {
            setUser(userData ? JSON.parse(userData) : null);
        }
    }, [router]);

    const handleAnalyze = async (ticker: string, text: string) => {
        setIsLoading(true);
        setAnalysisResult(null);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5001/api/analyze', {
                ticker,
                news_text: text
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setAnalysisResult(response.data);
            setActiveTab('results');
        } catch (error) {
            console.error("Analysis failed", error);
            alert("Analysis failed. Please check backend connection.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        router.push('/login');
    };

    return (
        <div className="flex bg-[#030712] text-slate-100 min-h-screen font-sans selection:bg-indigo-500/30">
            <Sidebar
                activeTab={activeTab === 'results' ? 'new' : activeTab}
                setActiveTab={(tab) => {
                    setActiveTab(tab);
                    if (tab === 'new') setAnalysisResult(null);
                }}
                onLogout={handleLogout}
            />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Header Terminal */}
                <header className="h-16 border-b border-slate-800/50 flex items-center justify-between px-6 bg-black/20 backdrop-blur-md z-40">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20" />
                            </div>
                            <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">SYS: ACTIVE // NEURAL_NET_V2</span>
                        </div>

                        <div className="hidden md:flex items-center gap-2 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800">
                            <TerminalIcon className="w-3 h-3 text-indigo-400" />
                            <span className="text-[10px] font-bold text-slate-400 opacity-70">CONSOLE: LISTENING</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] font-black text-white leading-none uppercase tracking-tighter">{user?.email?.split('@')[0]}</p>
                                <p className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest mt-0.5">Quantum Researcher</p>
                            </div>
                            <div className="relative group p-0.5 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-500">
                                <div className="w-9 h-9 rounded-full bg-slate-950 flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform overflow-hidden">
                                    <span className="font-black text-sm text-white">{user?.email?.charAt(0).toUpperCase()}</span>
                                </div>
                            </div>
                        </div>
                        <button className="text-slate-500 hover:text-white transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full border border-slate-950" />
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab + (analysisResult ? '_res' : '')}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="p-6 lg:p-10 max-w-[1440px] mx-auto w-full"
                        >
                            {activeTab === 'new' && !analysisResult && (
                                <AnalysisWorkspace onAnalyze={handleAnalyze} isLoading={isLoading} />
                            )}

                            {(activeTab === 'results' || analysisResult) && (
                                <OutputPanel data={analysisResult} />
                            )}

                            {activeTab === 'history' && (
                                <HistoryContent />
                            )}

                            {activeTab === 'reports' && (
                                <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
                                    <LayersIcon className="w-16 h-16 mb-4 opacity-20" />
                                    <p className="font-black tracking-widest text-sm italic">ARCHIVED DATA NOT FOUND</p>
                                </div>
                            )}

                            {activeTab === 'account' && (
                                <div className="max-w-2xl mx-auto py-10">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-16 h-16 rounded-3xl bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                            <User className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black">Account Node</h2>
                                            <p className="text-slate-500 text-sm">Managing your decentralized research identity.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                        <div className="stats-card">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                <span className="font-bold text-lg">VERIFIED</span>
                                            </div>
                                        </div>
                                        <div className="stats-card">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Tier</p>
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                                                <span className="font-bold text-lg text-indigo-400 uppercase tracking-tighter">QUANTUM ELITE</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="terminal-card p-1">
                                        <div className="bg-slate-900/50 p-6 rounded-lg space-y-4">
                                            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                                                <span className="text-xs font-bold text-slate-500 uppercase">Primary Email</span>
                                                <span className="font-mono text-sm text-slate-300">{user?.email}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                                                <span className="text-xs font-bold text-slate-500 uppercase">Research ID</span>
                                                <span className="font-mono text-sm text-slate-300">#{user?.id?.slice(-8).toUpperCase()}</span>
                                            </div>
                                            <div className="pt-2">
                                                <button className="w-full bg-white text-black font-black py-3 rounded-xl hover:bg-slate-200 transition-all text-xs uppercase tracking-widest">
                                                    Manage Subscription
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

function LayersIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
}

function HistoryContent() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5001/api/history', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setHistory(response.data);
            } catch (e) { }
        };
        fetchHistory();
    }, []);

    if (history.length === 0) return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
            <Activity className="w-16 h-16 mb-4 opacity-20" />
            <p className="font-black tracking-widest text-sm italic uppercase">NO LOGS EXTRACTED</p>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h2 className="text-4xl font-black italic tracking-tighter">NEURAL LOGS</h2>
                    <p className="text-slate-500 text-sm mt-1">Retrieving past intelligence extractions.</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-xl text-[10px] font-black text-indigo-400">
                    TOTAL ENTRIES: {history.length}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {history.map((item: any) => (
                    <motion.div
                        key={item._id}
                        whileHover={{ x: 5 }}
                        className="terminal-card group p-4 flex justify-between items-center hover:bg-slate-900/40 transition-all cursor-pointer border-l-4 border-l-transparent hover:border-l-indigo-500"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center border border-slate-800 group-hover:border-indigo-500/30 transition-colors">
                                <span className="text-indigo-400 font-black text-lg">{item.ticker.slice(0, 1)}</span>
                            </div>
                            <div>
                                <span className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors tracking-tight">{item.ticker}</span>
                                <p className="text-[10px] font-mono text-slate-500 mt-0.5">{new Date(item.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black border transition-all ${item.recommendationScore >= 4
                                ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                                : 'text-slate-500 border-slate-800'}`}>
                                SCORE: {item.recommendationScore}/5
                            </div>
                            <div className={`text-sm font-black italic tracking-widest ${item.tradingAction === 'BUY' ? 'text-emerald-500' : item.tradingAction === 'SELL' ? 'text-rose-500' : 'text-indigo-500'}`}>
                                {item.tradingAction}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
