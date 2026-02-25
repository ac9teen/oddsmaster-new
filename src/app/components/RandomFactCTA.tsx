'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Trophy, Target, TrendingUp, Gem } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const facts = [
    {
        icon: <TrendingUp className="w-8 h-8 text-[#f7d849]" />,
        title: "The 57% Rule",
        text: "Professional bettors only need to hit 57% of their wagers to outperform most investment funds globally. Volume is key.",
        stat: "57%",
        label: "Win Rate"
    },
    {
        icon: <Target className="w-8 h-8 text-accent" />,
        title: "Closing Line Value",
        text: "Beating the closing line consistently is a better predictor of long-term profit than your actual win/loss record.",
        stat: "CLV",
        label: "Alpha"
    },
    {
        icon: <Trophy className="w-8 h-8 text-[#f7d849]" />,
        title: "Compounding Gains",
        text: "A 3% daily edge compounded over a year doesn't just double your bankroll—it transforms it entirely.",
        stat: "3%",
        label: "Daily Edge"
    },
    {
        icon: <Gem className="w-8 h-8 text-accent" />,
        title: "The Public Fade",
        text: "When >80% of the public is on a spread, the books are begging you to take it. Fade the public, shadow the sharps.",
        stat: "80%",
        label: "Contrarian"
    }
];

export function RandomFactCTA() {
    const [fact, setFact] = useState(facts[0]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Randomize on client-side only to avoid hydration mismatch
        const randomIndex = Math.floor(Math.random() * facts.length);
        setFact(facts[randomIndex]);
        setMounted(true);
    }, []);

    if (!mounted) return null; // Avoid hydration mismatch

    return (
        <div className="my-12 relative overflow-hidden rounded-[2rem] border border-card-border bg-gradient-to-br from-[#1a1c2e] to-[#0d0f1a] shadow-2xl">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f7d849]/5 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                {/* Icon/Stat Box */}
                <div className="shrink-0 relative">
                    <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full"></div>
                    <div className="w-24 h-24 rounded-2xl bg-card border border-card-border flex flex-col items-center justify-center relative shadow-inner">
                        <span className="text-2xl font-black italic text-foreground">{fact.stat}</span>
                        <span className="text-[10px] uppercase font-bold text-muted tracking-wider">{fact.label}</span>
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-background rounded-full border border-card-border flex items-center justify-center shadow-lg">
                        {fact.icon}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-grow text-center md:text-left">
                    <h4 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white mb-3">
                        {fact.title}
                    </h4>
                    <p className="text-muted font-medium leading-relaxed mb-6 text-sm md:text-base">
                        {fact.text}
                    </p>

                    <Link href="/">
                        <button className="bg-accent hover:bg-accent/90 text-foreground font-black uppercase tracking-[0.15em] text-xs px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-[0_4px_20px_rgba(7,181,126,0.3)] flex items-center gap-2 mx-auto md:mx-0">
                            Get The Edge <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
