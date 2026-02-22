"use client";

import React from 'react';
import { PlusCircle, History, FileText, User, LogOut, TrendingUp, ShieldAlert, Cpu, Layers, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
    const [user, setUser] = React.useState<any>(null);
    const router = useRouter();

    React.useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) setUser(JSON.parse(userData));
    }, []);

    const menuItems = [
        { id: 'new', label: 'DEEPSEEK CORE', icon: Cpu },
        { id: 'history', label: 'NEURAL LOGS', icon: History },
        { id: 'reports', label: 'FINRL REPORTS', icon: Layers },
        { id: 'account', label: 'RESEARCH PROFILE', icon: User },
    ];

    return (
        <div className="w-20 lg:w-72 h-screen bg-black/40 backdrop-blur-xl border-r border-slate-800 flex flex-col p-4 z-50 transition-all duration-300">
            {/* Brand Section */}
            <div className="flex items-center gap-4 mb-12 px-2 mt-4">
                <div className="relative group">
                    <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                    <TrendingUp className="w-12 h-12 text-indigo-500 relative z-10" />
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse z-20" />
                </div>
                <div className="hidden lg:block group">
                    <span className="text-2xl font-black tracking-tighter text-white block leading-none">FINRL</span>
                    <span className="text-[10px] font-black text-indigo-400 tracking-[0.4em] uppercase opacity-70">DEEPSEEK OS</span>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 space-y-2">
                <p className="hidden lg:block text-[10px] font-black text-slate-600 tracking-widest uppercase mb-4 px-4 opacity-50">Operations</p>
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group relative border ${activeTab === item.id
                            ? 'bg-indigo-600/10 text-indigo-400 border-indigo-600/30 shadow-[0_4px_20px_rgba(79,70,229,0.15)] ring-1 ring-indigo-500/20'
                            : 'text-slate-500 border-transparent hover:bg-slate-900/50 hover:text-slate-200'
                            }`}
                    >
                        <item.icon className={`w-5 h-5 transition-all duration-300 ${activeTab === item.id ? 'scale-110 rotate-3 shadow-indigo-500' : 'group-hover:scale-110 group-hover:text-white'}`} />
                        <span className="font-bold text-[11px] tracking-widest hidden lg:block uppercase transition-colors">{item.label}</span>
                        {activeTab === item.id && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-indigo-500 rounded-r-full shadow-[0_0_15px_#6366f1]" />
                        )}
                    </button>
                ))}

                {user?.role === 'admin' && (
                    <>
                        <p className="hidden lg:block text-[10px] font-black text-slate-600 tracking-widest uppercase mt-8 mb-4 px-4 opacity-50">Nexus Root</p>
                        <button
                            onClick={() => router.push('/admin')}
                            className="w-full flex items-center gap-4 px-4 py-4 text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all border border-rose-500/10 hover:border-rose-500/30 group relative"
                        >
                            <ShieldAlert className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-[11px] tracking-widest hidden lg:block uppercase">ADMIN NEXUS</span>
                            <div className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
                        </button>
                    </>
                )}
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-slate-800/50">
                <div className="mb-6 px-4 hidden lg:block">
                    <div className="flex items-center justify-between text-[10px] font-black text-slate-500 mb-2">
                        <span>NEURAL_NET_LOAD</span>
                        <span className="text-indigo-400">12%</span>
                    </div>
                    <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 w-[12%] shadow-[0_0_10px_#6366f1]" />
                    </div>
                </div>

                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-4 px-4 py-4 text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 rounded-2xl transition-all group overflow-hidden"
                >
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold text-[11px] tracking-widest hidden lg:block uppercase">TERMINATE_SESSION</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
