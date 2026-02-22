"use client";

import React, { useState } from 'react';
import { Search, Send, Upload, Globe, Cpu, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalysisWorkspaceProps {
    onAnalyze: (ticker: string, text: string) => void;
    isLoading: boolean;
}

const tickers = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "META", "TSLA", "NVDA", "AMD", "NFLX", "PYPL"
];

const AnalysisWorkspace: React.FC<AnalysisWorkspaceProps> = ({ onAnalyze, isLoading }) => {
    const [selectedTicker, setSelectedTicker] = useState(tickers[0]);
    const [newsText, setNewsText] = useState("");

    const handleAnalyzeClick = () => {
        if (!newsText.trim()) {
            alert("SYSTEM: PLEASE INGEST SOURCE DATA BEFORE ANALYSIS");
            return;
        }
        onAnalyze(selectedTicker, newsText);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-12 text-center lg:text-left">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] mb-4 border border-indigo-500/20"
                >
                    <Globe className="w-3 h-3" />
                    NEURAL INGESTION ACTIVE
                </motion.div>
                <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter text-white mb-4">
                    DEEPSEEK <span className="text-indigo-500 not-italic">CORE</span>
                </h1>
                <p className="text-slate-500 max-w-2xl text-lg font-medium leading-relaxed">
                    Deploying LLM-infused intelligence to extract alpha from unstructured market data.
                    Ingest high-frequency news feeds to generate risk-aware trading signals.
                </p>
            </header>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Ticker Selector */}
                    <div className="md:col-span-4 terminal-card p-6">
                        <div className="flex items-center gap-2 mb-6 text-slate-500 font-black text-[10px] tracking-widest uppercase">
                            <Cpu className="w-4 h-4 text-indigo-400" />
                            Target Asset
                        </div>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                            {tickers.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setSelectedTicker(t)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all border ${selectedTicker === t
                                        ? 'bg-indigo-600/20 border-indigo-500/50 text-white shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                                        : 'border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'
                                        }`}
                                >
                                    <span className="font-bold tracking-tighter">{t}</span>
                                    {selectedTicker === t && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* News Ingestion Area */}
                    <div className="md:col-span-8 terminal-card flex flex-col min-h-[400px]">
                        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-black/20">
                            <div className="flex items-center gap-2 text-slate-500 font-black text-[10px] tracking-widest uppercase">
                                <Globe className="w-4 h-4 text-indigo-400" />
                                Data Input Buffer
                            </div>
                            <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-white transition-colors bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800">
                                <Upload className="w-3 h-3" />
                                IMPORT FILE
                            </button>
                        </div>

                        <div className="flex-1 relative group">
                            <textarea
                                value={newsText}
                                onChange={(e) => setNewsText(e.target.value)}
                                className="w-full h-full bg-transparent p-6 text-slate-300 focus:outline-none resize-none font-mono text-sm leading-relaxed placeholder:opacity-20"
                                placeholder={`> ENTER MARKET INTELLIGENCE HERE...\n> PASTE NEWS ARTICLES, EARNINGS CALLS, OR MACRO REPORTS...\n> AWAITING DATA...`}
                                spellCheck={false}
                            />
                            {newsText.length === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                                    <TrendingUpIcon className="w-48 h-48" />
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-black/40 border-t border-slate-800 flex justify-between items-center">
                            <div className="text-[10px] font-mono text-slate-600">
                                <span className="text-emerald-500 tracking-tighter">BUFFER_READY</span> | CHARS: {newsText.length}
                            </div>
                            <button
                                onClick={handleAnalyzeClick}
                                disabled={isLoading}
                                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black text-xs tracking-widest transition-all ${isLoading
                                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] active:box-shadow-none active:scale-95'}`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-3 h-3 border-2 border-indigo-300 border-t-white rounded-full animate-spin" />
                                        PROCESSING...
                                    </>
                                ) : (
                                    <>
                                        START ANALYSIS
                                        <Zap className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Secondary Info */}
                <div className="flex gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2 text-slate-600 text-[10px] font-black italic">
                        <ShieldIcon className="w-3 h-3" />
                        ENCRYPTED TUNNEL: STATIC
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-[10px] font-black italic">
                        <Zap className="w-3 h-3" />
                        LATENCY: 12ms
                    </div>
                </div>
            </div>
        </div>
    );
};

function TrendingUpIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
}

function ShieldIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
}

export default AnalysisWorkspace;
