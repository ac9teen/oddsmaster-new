'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Target, Zap, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const selections = [
    {
        id: 'sel-1',
        sport: 'Football',
        league: 'Premier League',
        match: 'Arsenal vs Liverpool',
        prediction: 'Over 2.5 Goals',
        modelConfidence: '92.4%',
        odds: 1.85,
        icon: '/pl.svg'
    },
    {
        id: 'sel-2',
        sport: 'Basketball',
        league: 'NBA',
        match: 'Celtics vs Nuggets',
        prediction: 'Nuggets +4.5',
        modelConfidence: '89.1%',
        odds: 1.91,
        icon: '/nba.svg'
    },
    {
        id: 'sel-3',
        sport: 'Tennis',
        league: 'ATP Tour',
        match: 'Alcaraz vs Sinner',
        prediction: 'Sinner to win',
        modelConfidence: '87.8%',
        odds: 1.76,
        icon: '/atp.svg'
    }
];

export function ParlayAssembly() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.3 });
    const [activeSelections, setActiveSelections] = useState<number>(0);

    useEffect(() => {
        if (isInView) {
            setActiveSelections(0);
            const timers = [
                setTimeout(() => setActiveSelections(1), 600),
                setTimeout(() => setActiveSelections(2), 1200),
                setTimeout(() => setActiveSelections(3), 1800)
            ];
            return () => timers.forEach(clearTimeout);
        }
    }, [isInView]);

    const currentOdds = activeSelections === 0
        ? 1.00
        : selections.slice(0, activeSelections).reduce((acc, curr) => acc * curr.odds, 1);

    return (
        <section className="py-12 md:py-20 bg-[#020202] text-foreground relative transition-colors duration-300">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent/10 blur-[120px] rounded-full mix-blend-screen"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#f7d849]/5 blur-[120px] rounded-full mix-blend-screen"></div>
            </div>

            <div className="om-container px-4 relative z-10" ref={containerRef}>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="experts-header-tag mb-6">Cross-Market Synthesis</div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter mb-6">
                            Automated Parlay <span className="text-accent">Assembly</span>
                        </h2>
                        <p className="text-muted font-bold text-lg md:text-xl leading-relaxed">
                            OddsMaster models do not just find isolated value. They continuously scan multiple sports markets, synthesizing the highest-EV selections into strategically optimized parlays with compounding mathematical edges.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-7xl mx-auto">

                    {/* Left Side: Animated Stack */}
                    <div className="col-span-1 lg:col-span-7 flex flex-col gap-4">
                        <AnimatePresence>
                            {selections.map((sel, index) => {
                                const isActive = index < activeSelections;
                                return (
                                    <motion.div
                                        key={sel.id}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{
                                            opacity: isActive ? 1 : 0.3,
                                            x: 0,
                                            scale: isActive ? 1 : 0.95
                                        }}
                                        className={`om-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 p-6 md:p-8 transition-all duration-500 border ${isActive ? 'bg-card/80 border-accent/40 shadow-[0_10px_30px_rgba(7,181,126,0.15)]' : 'bg-background/50 border-white/5'}`}
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center p-3 shrink-0 transition-colors ${isActive ? 'bg-accent/10 border border-accent/20' : 'bg-white/5'}`}>
                                                <Image src={sel.icon} alt={sel.sport} width={34} height={34} className={sel.icon === '/atp.svg' ? 'brightness-0 invert' : ''} />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">{sel.league}</div>
                                                <div className="font-bold text-lg tracking-wide mb-2">{sel.match}</div>
                                                <div className="flex items-center gap-3">
                                                    <span className="font-black italic uppercase tracking-wider text-sm text-white">{sel.prediction}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-white/10 sm:border-0 border-dashed">
                                            <div className={`text-[10px] font-black uppercase tracking-widest mb-1 flex items-center gap-1 ${isActive ? 'text-accent' : 'text-muted'}`}>
                                                {isActive ? <Zap className="w-3 h-3" /> : null} {isActive ? 'Alpha Found' : 'Scanning...'}
                                            </div>
                                            <div className="flex items-center gap-4 sm:gap-0 sm:flex-col justify-end text-right">
                                                <div className="font-black text-2xl">@{sel.odds.toFixed(2)}</div>
                                                {isActive && (
                                                    <div className="mt-1 sm:mt-2 bg-accent text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Edge: {sel.modelConfidence}</div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Right Side: Slip Summary */}
                    <div className="col-span-1 lg:col-span-5 relative mt-6 lg:mt-0 lg:sticky lg:top-32">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="om-card relative overflow-hidden bg-card/60 backdrop-blur-3xl border-accent/40 shadow-[0_20px_60px_rgba(7,181,126,0.15)] p-8 md:p-10"
                        >
                            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
                                    <Target className="w-6 h-6 text-accent" />
                                </div>
                                <h3 className="text-2xl font-black italic uppercase tracking-wider">Compound Alpha Slip</h3>
                            </div>

                            <div className="space-y-6 mb-8">
                                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                                    <span className="text-muted font-black text-xs uppercase tracking-widest">Active Selections</span>
                                    <span className="font-black text-xl">{activeSelections} / 3</span>
                                </div>

                                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                                    <span className="text-muted font-black text-xs uppercase tracking-widest">Total Math Edge</span>
                                    <span className="font-black text-xl text-[#f7d849] flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5" />
                                        {activeSelections > 0 ? '+14.2%' : '0.0%'}
                                    </span>
                                </div>

                                <div className="pt-8 border-t border-white/10 mt-8">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <span className="block text-xs font-black uppercase tracking-[0.3em] text-accent mb-3">Final Odds Target</span>
                                            <span className="text-6xl font-black tracking-tighter tabular-nums inline-block text-white">
                                                <motion.span
                                                    key={currentOdds}
                                                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    className="inline-block"
                                                >
                                                    @{currentOdds.toFixed(2)}
                                                </motion.span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/#pricing"
                                onClick={(e) => {
                                    if (typeof window !== 'undefined' && window.location.pathname === '/') {
                                        e.preventDefault();
                                        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            >
                                <button className="om-btn-primary w-full py-5 text-sm md:text-xs shadow-[0_15px_30px_rgba(7,181,126,0.3)] hover:shadow-[0_20px_40px_rgba(7,181,126,0.5)] group">
                                    <span className="flex items-center justify-center gap-2">
                                        <CheckCircle2 className="w-5 h-5" /> View Plans to Deploy Strategy
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-sweep"></div>
                                </button>
                            </Link>

                            <p className="text-center mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted/70 flex items-center justify-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                                API feeds syncing in real-time
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
