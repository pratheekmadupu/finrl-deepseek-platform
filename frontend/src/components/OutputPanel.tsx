"use client";

import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, TrendingUp, TrendingDown, Target, Zap, Shield, ChevronRight, Share2, Download, Info } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const TypingSummary = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, 10);
            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    return (
        <div className="font-mono text-sm leading-relaxed text-slate-300">
            <span className="text-emerald-500 font-black mr-2">LOG:</span>
            {displayedText}
            <span className="typing-cursor inline-block ml-1" />
        </div>
    );
};

const MetricCard = ({ label, value, subtext, icon: Icon, colorClass }: any) => (
    <div className="terminal-card bg-slate-900/40 p-5 group hover:border-indigo-500/50 transition-all border-l-4 border-l-transparent hover:border-l-indigo-500">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-black/40 border border-slate-800 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-all">
                <Icon className={`w-5 h-5 ${colorClass}`} />
            </div>
            <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-slate-700" />
                <div className="w-1 h-1 rounded-full bg-slate-700" />
            </div>
        </div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
        <h3 className={`text-2xl font-black mt-1 ${colorClass} tracking-tight`}>{value}</h3>
        <p className="text-[10px] font-bold text-slate-400 opacity-60 mt-1 uppercase italic">{subtext}</p>
    </div>
);

const OutputPanel = ({ data }: { data: any }) => {
    if (!data) return null;

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#0f172a',
                titleColor: '#6366f1',
                bodyColor: '#f8fafc',
                borderColor: '#334155',
                borderWidth: 1,
                padding: 12,
                displayColors: false
            }
        },
        scales: {
            x: { display: false },
            y: { display: false }
        }
    };

    const priceData = {
        labels: Array.from({ length: 30 }, (_, i) => i),
        datasets: [{
            data: data.metrics.priceChart,
            borderColor: '#6366f1',
            backgroundColor: (context: any) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
                gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
                return gradient;
            },
            fill: true,
            tension: 0.4,
            pointRadius: 0
        }]
    };

    const equityData = {
        labels: Array.from({ length: 30 }, (_, i) => i),
        datasets: [{
            data: data.metrics.equityCurve,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.3,
            pointRadius: 0
        }]
    };

    const riskData = {
        labels: ['LOW', 'MED', 'HIGH', 'CRIT'],
        datasets: [{
            data: data.metrics.riskDistribution,
            backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#7c3aed'],
            borderWidth: 0,
            hoverOffset: 10
        }]
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Intel Summary Row */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
                <div className="flex-1 terminal-card p-6 bg-indigo-600/5 relative overflow-hidden group border-indigo-500/20">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-indigo-500 rounded-2xl shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                                <Target className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black italic tracking-tighter text-white">INTELLIGENCE REPORT / {data.ticker}</h2>
                                <p className="text-[10px] font-black text-indigo-400 tracking-[0.2em] uppercase">Status: Analysis Verified // DeepSeek Engine V2</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
                                <Share2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="terminal-card bg-black/40 p-4 font-mono text-sm leading-relaxed border-slate-800/50">
                        <TypingSummary text={`Neural network processed ${data.newsText.length} bytes of market intelligence. Correlating signal with historical RL policy... Extraction complete. Trading decision initialized based on ${data.confidence}% confidence interval. Alpha capture potential high.`} />
                    </div>
                </div>

                <div className="lg:w-80">
                    <div className={`terminal-card h-full p-6 flex flex-col justify-center text-center relative overflow-hidden group border-2 ${data.tradingAction === 'BUY' ? 'border-emerald-500 bg-emerald-500/5' : data.tradingAction === 'SELL' ? 'border-rose-500 bg-rose-500/5' : 'border-indigo-500 bg-indigo-500/5'}`}>
                        {data.tradingAction === 'BUY' && <TrendingUp className="absolute -top-5 -right-5 w-24 h-24 text-emerald-500 opacity-10 rotate-12" />}
                        {data.tradingAction === 'SELL' && <TrendingDown className="absolute -top-5 -right-5 w-24 h-24 text-rose-500 opacity-10 rotate-12" />}

                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Final Trading Vector</p>
                        <h2 className={`text-6xl font-black italic tracking-tighter mb-2 ${data.tradingAction === 'BUY' ? 'text-emerald-500' : data.tradingAction === 'SELL' ? 'text-rose-500' : 'text-indigo-400'}`}>
                            {data.tradingAction}
                        </h2>
                        <div className="inline-flex items-center gap-2 mx-auto px-4 py-1 rounded-full bg-black/40 border border-white/5 text-[10px] font-black tracking-widest uppercase">
                            <Zap className="w-3 h-3 text-yellow-500" />
                            Signal Strength: {data.confidence}%
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                    label="Recommendation"
                    value={`${data.recommendationScore}/5`}
                    subtext="Consensus Score"
                    icon={Target}
                    colorClass="text-indigo-400"
                />
                <MetricCard
                    label="Risk Exposure"
                    value={data.riskScore <= 2 ? 'LOW' : data.riskScore <= 4 ? 'MEDIUM' : 'HIGH'}
                    subtext={`Risk Score: ${data.riskScore}`}
                    icon={Shield}
                    colorClass={data.riskScore <= 2 ? 'text-emerald-400' : 'text-rose-400'}
                />
                <MetricCard
                    label="Portfolio Alloc"
                    value={data.portfolioAllocation}
                    subtext="Target Weight"
                    icon={Zap}
                    colorClass="text-yellow-400"
                />
                <MetricCard
                    label="DeepSeek SF | RF"
                    value={`${data.sf} | ${data.rf}`}
                    subtext="LLM Sentiment Vector"
                    icon={ActivityIcon}
                    colorClass="text-slate-200"
                />
            </div>

            {/* Visual Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 terminal-card p-6 min-h-[400px]">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-xl font-black italic tracking-tighter">PRICE SIMULATION</h3>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Synthetic Trend Prediction // T+30D</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-indigo-500" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Price Objective</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/50" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Policy Confidence</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <Line data={priceData} options={chartOptions} />
                    </div>
                </div>

                <div className="terminal-card p-6 flex flex-col min-h-[400px]">
                    <div className="mb-10">
                        <h3 className="text-xl font-black italic tracking-tighter">RISK CLUSTERS</h3>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Neural Anomaly Detection</p>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-4">
                        <div className="w-full max-w-[200px] h-[200px]">
                            <Pie data={riskData} options={{ ...chartOptions, plugins: { legend: { display: false } } }} />
                        </div>
                    </div>
                    <div className="pt-6 border-t border-slate-800 space-y-3">
                        <RiskLegend label="Institutional Risk" color="bg-emerald-500" value="MINIMAL" />
                        <RiskLegend label="Liquidity Spread" color="bg-amber-500" value="MODERATE" />
                        <RiskLegend label="Volatility Spike" color="bg-rose-500" value="ELEVATED" />
                    </div>
                </div>
            </div>

            {/* Disclaimer Bar */}
            <div className="mt-8 flex items-center gap-3 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                <Info className="w-4 h-4 text-slate-500" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    AI analysis is probabilistic. Past performance does not guarantee future results. Neural extraction based on latest available data buffers.
                </p>
            </div>
        </div>
    );
};

function RiskLegend({ label, color, value }: any) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
            </div>
            <span className="text-[10px] font-black text-white">{value}</span>
        </div>
    );
}

function ActivityIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
}

export default OutputPanel;
