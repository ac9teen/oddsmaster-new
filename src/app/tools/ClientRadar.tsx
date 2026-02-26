'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Zap, Play, Activity, AlertTriangle, ShieldAlert, Cpu } from 'lucide-react';
import Link from 'next/link';

export function ClientRadar({ fixtures }: { fixtures: any[] }) {
    const [selectedLeague, setSelectedLeague] = useState<number | 'ALL'>('ALL');
    const [activeMatch, setActiveMatch] = useState<any | null>(null);

    const leagues = Array.from(new Set(fixtures.map(f => f.league.id))).map(id => {
        const fixture = fixtures.find(f => f.league.id === id);
        return {
            id,
            name: fixture?.league.name,
            logo: fixture?.league.logo,
        };
    });

    const filteredFixtures = selectedLeague === 'ALL' ? fixtures : fixtures.filter(f => f.league.id === selectedLeague);

    // Ensure we handle empty states gracefully (API limits etc.)
    if (!fixtures || fixtures.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-card/30 rounded-3xl border border-white/5">
                <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Quant Radar Offline</h3>
                <p className="text-muted text-sm text-center max-w-sm">
                    No active major fixtures detected for the current window, or algorithmic scraping limit reached. Check back soon.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Control Panel */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 bg-card/40 border border-white/10 p-4 md:p-6 rounded-2xl backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center animate-pulse">
                        <Activity className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-accent mb-1">Status: Active Scanning</div>
                        <h2 className="text-lg font-bold">Live Market Alpha</h2>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <button
                        onClick={() => setSelectedLeague('ALL')}
                        className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors border ${selectedLeague === 'ALL' ? 'bg-accent text-black border-accent' : 'bg-black/50 text-muted border-white/10 hover:border-accent/40'}`}
                    >
                        Total Market
                    </button>
                    {leagues.map(league => (
                        <button
                            key={league.id}
                            onClick={() => setSelectedLeague(league.id)}
                            className={`px-4 py-2 text-[10px] font-black flex items-center gap-2 uppercase tracking-widest rounded-lg transition-colors border ${selectedLeague === league.id ? 'bg-accent text-black border-accent' : 'bg-black/50 text-muted border-white/10 hover:border-accent/40'}`}
                        >
                            {league.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Fixture Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFixtures.map((fixture) => (
                    <div
                        key={fixture.fixture.id}
                        className="om-card bg-card/40 border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-accent/50 cursor-pointer transition-all duration-300"
                        onClick={() => setActiveMatch(fixture)}
                    >
                        {/* Status / Algorithmic Highlight */}
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-[9px] font-black uppercase tracking-widest text-muted/80 flex items-center gap-2">
                                <Image src={fixture.league.flag || fixture.league.logo} alt={fixture.league.name} width={14} height={14} className="rounded-sm" />
                                {fixture.league.name}
                            </span>
                            <span className={`text-[9px] px-2 py-0.5 rounded flex items-center gap-1 font-black uppercase tracking-widest ${fixture.pseudoMetrics.alphaSignal > 75 ? 'bg-accent/20 text-accent' : 'bg-white/5 text-muted'}`}>
                                {fixture.pseudoMetrics.alphaSignal > 75 && <Flame className="w-3 h-3" />}
                                Alpha: {fixture.pseudoMetrics.alphaSignal}%
                            </span>
                        </div>

                        {/* Matchup */}
                        <div className="flex justify-between items-center relative">
                            <div className="flex flex-col items-center gap-3 w-[40%]">
                                <div className="w-14 h-14 relative group-hover:scale-110 transition-transform bg-white/5 rounded-full p-2 border border-white/10">
                                    <Image src={fixture.teams.home.logo} alt={fixture.teams.home.name} fill className="object-contain p-2" />
                                </div>
                                <span className="text-[11px] font-bold text-center leading-tight truncate w-full">{fixture.teams.home.name}</span>
                            </div>

                            <div className="flex flex-col items-center justify-center w-[20%]">
                                <span className="text-[10px] font-black text-muted/50 mb-1">VS</span>
                                <div className="text-[9px] bg-black/50 px-2 py-1 rounded text-muted font-mono">{new Date(fixture.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                            </div>

                            <div className="flex flex-col items-center gap-3 w-[40%]">
                                <div className="w-14 h-14 relative group-hover:scale-110 transition-transform bg-white/5 rounded-full p-2 border border-white/10">
                                    <Image src={fixture.teams.away.logo} alt={fixture.teams.away.name} fill className="object-contain p-2" />
                                </div>
                                <span className="text-[11px] font-bold text-center leading-tight truncate w-full">{fixture.teams.away.name}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black uppercase tracking-widest text-muted mb-1">Volatility Index</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(v => (
                                        <div key={v} className={`w-3 h-1 rounded-full ${v <= (fixture.pseudoMetrics.volatility / 20) ? 'bg-[#f7d849]' : 'bg-white/10'}`} />
                                    ))}
                                </div>
                            </div>
                            <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-colors">
                                <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* AI Modal */}
            {activeMatch && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-md" onClick={() => setActiveMatch(null)}>
                    <div
                        className="w-full max-w-2xl bg-black border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="absolute inset-0 z-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none"></div>

                        <div className="p-8 relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <div className="text-[10px] font-black text-accent uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Cpu className="w-4 h-4" /> Machine Learning Node
                                    </div>
                                    <h3 className="text-2xl font-black">{activeMatch.teams.home.name} vs {activeMatch.teams.away.name}</h3>
                                </div>
                                <button onClick={() => setActiveMatch(null)} className="text-muted hover:text-white transition-colors bg-white/5 p-2 rounded-full">
                                    X
                                </button>
                            </div>

                            {/* Pseudo Dashboard inside Model */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-card/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
                                    <span className="text-[9px] font-black tracking-widest text-muted uppercase mb-1">Algorithmic Edge</span>
                                    <span className="text-3xl font-black text-white">{activeMatch.pseudoMetrics.edgePercentage}%</span>
                                    <span className="text-[10px] text-accent mt-2 font-mono">Found Mispricing</span>
                                </div>
                                <div className="bg-card/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
                                    <span className="text-[9px] font-black tracking-widest text-muted uppercase mb-1">Sentiment Divergence</span>
                                    <span className="text-3xl font-black text-white">{activeMatch.pseudoMetrics.retailSentimentRatio}:1</span>
                                    <span className="text-[10px] text-red-400 mt-2 font-mono">Retail is Trapped</span>
                                </div>
                            </div>

                            <div className="bg-card/50 border border-accent/20 rounded-2xl p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full"></div>
                                <h4 className="font-bold mb-2 flex items-center gap-2 text-white relative z-10">
                                    <ShieldAlert className="w-4 h-4 text-accent" /> Restricted Data Access
                                </h4>
                                <p className="text-sm font-medium text-muted/90 leading-relaxed mb-6 relative z-10">
                                    The model has detected a highly asymmetric betting setup for this fixture. To protect market liquidity and avoid line movement, the final expected value (+EV) prediction is concealed for retail users.
                                </p>

                                <Link href="/#pricing" className="block w-full relative z-10">
                                    <button className="w-full bg-accent text-black font-black uppercase tracking-[0.2em] text-[10px] py-4 rounded-xl shadow-[0_0_20px_rgba(7,181,126,0.3)] hover:scale-[1.02] transition-transform">
                                        Unlock Full Quantitative Play
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Just a quick flame icon for the render
function Flame({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>
    );
}
