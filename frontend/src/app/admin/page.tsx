"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Users, Activity, ExternalLink, Trash2, ArrowLeft, Terminal, Cpu, TrendingUp, TrendingDown, Globe, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [analyses, setAnalyses] = useState([]);
    const [marketData, setMarketData] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchAdminData = async () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            const user = userData ? JSON.parse(userData) : null;

            if (!token || user?.role !== 'admin') {
                router.push('/dashboard');
                return;
            }

            try {
                console.log('Fetching Admin Data with token:', token);
                const [usersRes, analysesRes, marketRes] = await Promise.all([
                    axios.get('http://localhost:5001/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get('http://localhost:5001/api/admin/all-analysis', { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get('http://localhost:5001/api/admin/market-data', { headers: { Authorization: `Bearer ${token}` } })
                ]);
                console.log('Admin Users Received:', usersRes.data);
                setUsers(usersRes.data);
                setAnalyses(analysesRes.data);
                setMarketData(marketRes.data);
            } catch (error: any) {
                console.error("Admin fetch failed", error);
                if (error.response) {
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, [router]);

    const handleDeleteUser = async (id: string) => {
        if (!confirm('TERMINATE USER NODE? THIS ACTION CANNOT BE REVERTED.')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5001/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter((u: any) => u.id !== id));
        } catch (e) {
            alert('DELETION FAILED');
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#030712] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                <span className="text-[10px] font-black tracking-[0.3em] text-indigo-400 uppercase animate-pulse">Synchronizing Admin Nexus</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#030712] text-slate-100 p-6 lg:p-12">
            <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-all shadow-lg"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <ShieldAlert className="w-5 h-5 text-rose-500" />
                            <span className="text-[10px] font-black text-rose-500 tracking-[0.3em] uppercase">SYSTEM LEVEL: ROOT</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter">CENTRAL <span className="text-rose-500 not-italic">COMMAND</span></h1>
                    </div>
                </div>

                <div className="flex gap-4">
                    <StatBox label="Active Researchers" value={users.length} icon={Users} color="text-indigo-400" />
                    <StatBox label="Neural Extractions" value={analyses.length} icon={Activity} color="text-emerald-400" />
                </div>
            </header>

            <main className="max-w-7xl mx-auto space-y-12">
                {/* Market Intelligence - NEW */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <Globe className="w-6 h-6 text-indigo-400" />
                        <h2 className="text-2xl font-black italic tracking-tighter uppercase">Global Market Pulse</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {marketData.map((stock: any) => (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                key={stock.symbol}
                                className="terminal-card bg-slate-900/40 p-4 border-slate-800 hover:border-indigo-500/30 transition-all"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-lg font-black text-white">{stock.symbol}</span>
                                    <span className={`flex items-center gap-1 text-xs font-bold ${stock.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                        {Math.abs(stock.change)}%
                                    </span>
                                </div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase truncate">{stock.name}</p>
                                <div className="mt-4 flex justify-between items-end">
                                    <span className="text-xl font-mono text-slate-200">${stock.price}</span>
                                    <span className="text-[8px] font-mono text-slate-600">VOL: {stock.volume}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Manager */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black italic tracking-tighter uppercase flex items-center gap-2">
                                <Users className="w-5 h-5 text-indigo-400" />
                                Research Nodes
                            </h2>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800">
                                Node Monitor Active
                            </div>
                        </div>

                        <div className="terminal-card overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-black/40 border-b border-slate-800 text-[10px] font-black text-slate-500 tracking-widest uppercase">
                                        <tr>
                                            <th className="px-6 py-4">Node Profile</th>
                                            <th className="px-6 py-4">Role</th>
                                            <th className="px-6 py-4 text-right">Operation</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {users.length > 0 ? users.map((u: any) => (
                                            <tr key={u.id} className="hover:bg-slate-900/50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 font-bold text-xs text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                                                            {u.email.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold text-slate-100">{u.email}</div>
                                                            <div className="text-[10px] font-mono text-slate-600">ID: {u.id?.slice(-8).toUpperCase()}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-[10px] font-black px-2 py-1 rounded-full border ${u.role === 'admin' ? 'text-rose-500 border-rose-500/20 bg-rose-500/5' : 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5'}`}>
                                                        {u.role?.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDeleteUser(u.id)}
                                                        className="p-2 text-slate-600 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={3} className="px-6 py-20 text-center text-slate-500 italic text-sm">
                                                    NO RESEARCH NODES DETECTED IN THE GRID
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Global Timeline */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-black italic tracking-tighter uppercase flex items-center gap-2">
                            <Activity className="w-5 h-5 text-emerald-400" />
                            Intelligence Feed
                        </h2>
                        <div className="terminal-card bg-black/40 flex flex-col h-[600px]">
                            <div className="p-4 border-b border-slate-800 flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-indigo-400" />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Stream</span>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                                {analyses.map((a: any) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={a.id}
                                        className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-indigo-500/30 transition-all cursor-crosshair"
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-xs font-black text-white">{a.ticker}</span>
                                            <span className={`text-[10px] font-black ${a.tradingAction === 'BUY' ? 'text-emerald-500' : 'text-rose-500'}`}>{a.tradingAction}</span>
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-mono italic truncate">{a.userId?.email || 'Unknown User'}</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <div className="h-1 bg-slate-800 flex-1 rounded-full mr-4 overflow-hidden">
                                                <div className="h-full bg-indigo-500 rounded-full shadow-[0_0_5px_#6366f1]" style={{ width: `${a.confidence}%` }} />
                                            </div>
                                            <span className="text-[8px] font-mono text-slate-600">{a.confidence}%</span>
                                        </div>
                                    </motion.div>
                                ))}
                                {analyses.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-20 text-slate-700 italic">
                                        <Cpu className="w-12 h-12 mb-2 opacity-20" />
                                        <span className="text-[10px] font-black tracking-widest">AWAITING SIGNALS</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatBox({ label, value, icon: Icon, color }: any) {
    return (
        <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-3xl flex items-center gap-4 min-w-[200px] shadow-lg">
            <div className={`p-3 rounded-2xl bg-black/40 border border-slate-800 ${color} shadow-inner`}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{label}</p>
                <p className="text-2xl font-black text-white tracking-tighter leading-none">{value}</p>
            </div>
        </div>
    );
}
