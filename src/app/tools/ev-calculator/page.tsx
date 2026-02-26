'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, HelpCircle, ArrowUpRight, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export default function EVCalculator() {
    const [stake, setStake] = useState<number>(100);
    const [marketOdds, setMarketOdds] = useState<string>('+150');
    const [sharpOddsA, setSharpOddsA] = useState<string>('-120');
    const [sharpOddsB, setSharpOddsB] = useState<string>('+100');

    const [results, setResults] = useState<{
        evAmount: number;
        evPercentage: number;
        noVigProb: number;
        kellyFraction: number;
        edge: "positive" | "negative" | "neutral";
    } | null>(null);

    // Calculate Implied Probability based on American Odds
    const getImpliedProb = (oddsInput: string): number => {
        const odds = parseInt(oddsInput);
        if (isNaN(odds)) return 0;
        if (odds === 0) return 0;

        if (odds > 0) {
            return 100 / (odds + 100);
        } else {
            return Math.abs(odds) / (Math.abs(odds) + 100);
        }
    };

    const getPayoutMultiplier = (oddsInput: string): number => {
        const odds = parseInt(oddsInput);
        if (isNaN(odds)) return 0;
        if (odds > 0) {
            return odds / 100;
        } else {
            return 100 / Math.abs(odds);
        }
    };

    useEffect(() => {
        try {
            const mOdds = parseInt(marketOdds);
            const sOddsA = parseInt(sharpOddsA);
            const sOddsB = parseInt(sharpOddsB);

            if (isNaN(mOdds) || isNaN(sOddsA) || isNaN(sOddsB)) {
                setResults(null);
                return;
            }

            const impA = getImpliedProb(sharpOddsA);
            const impB = getImpliedProb(sharpOddsB);
            const totalImp = impA + impB;

            // True probability after removing vig
            const noVigProbA = impA / totalImp;

            // EV Calculation
            const payoutMult = getPayoutMultiplier(marketOdds);
            const potentialProfit = stake * payoutMult;
            const evAmount = (noVigProbA * potentialProfit) - ((1 - noVigProbA) * stake);
            const evPercentage = (evAmount / stake) * 100;

            // Kelly Criterion Formula: f* = p - (q / b)
            // p = probability of winning, q = probability of losing, b = odds multiplier
            const q = 1 - noVigProbA;
            const b = payoutMult;
            const kelly = ((noVigProbA * b) - q) / b;
            // Cap kelly fraction at 1, floor at 0
            const safeKelly = Math.max(0, Math.min(1, kelly));

            let edge: "positive" | "negative" | "neutral" = "neutral";
            if (evPercentage > 0.5) edge = "positive";
            else if (evPercentage < -0.5) edge = "negative";

            setResults({
                evAmount,
                evPercentage,
                noVigProb: noVigProbA * 100,
                kellyFraction: safeKelly * 100, // percentage
                edge
            });

        } catch (e) {
            setResults(null);
        }
    }, [stake, marketOdds, sharpOddsA, sharpOddsB]);

    return (
        <main className="min-h-screen bg-background relative overflow-hidden flex flex-col pt-24 pb-20">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/bg7.png')] bg-cover mix-blend-screen opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
            </div>

            <div className="om-container relative z-10 px-4 md:px-0 max-w-6xl mx-auto flex-grow">
                {/* Header Back Link */}
                <div className="mb-8">
                    <Link href="/tools" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-muted hover:text-accent transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tool Arsenal
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left Column: Calculator Interface */}
                    <div className="lg:col-span-7 flex flex-col">
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex flex-shrink-0 items-center justify-center p-2 text-accent">
                                    <Calculator className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase whitespace-nowrap">
                                        <span className="text-accent">+EV</span> Calculator
                                    </h1>
                                </div>
                            </div>
                            <p className="text-muted font-medium text-lg leading-relaxed max-w-lg">
                                Uncover the true mathematical edge of a bet. Strip away the sportsbook's vig and discover if you&apos;re making a profitable play over the long term.
                            </p>
                        </div>

                        {/* Input Panel */}
                        <div className="om-card p-6 md:p-10 bg-card/50 backdrop-blur-md border border-white/10 rounded-[2rem] shadow-2xl relative overflow-hidden flex-grow">

                            {/* Decorative line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>

                            <div className="space-y-8">
                                {/* Section 1: Your Bet */}
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 relative overflow-hidden">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                                        <h3 className="text-[12px] font-black uppercase tracking-widest text-white/90">Market Input (Your Bet)</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-muted/80">Market Odds</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={marketOdds}
                                                    onChange={(e) => setMarketOdds(e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-xl font-bold text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all outline-none"
                                                    placeholder="+150"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-muted/80">Bet Stake ($)</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold">$</span>
                                                <input
                                                    type="number"
                                                    value={stake}
                                                    onChange={(e) => setStake(parseFloat(e.target.value))}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-8 pr-4 py-3.5 text-xl font-bold text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all outline-none"
                                                    placeholder="100"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Fair Value Source */}
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 relative overflow-hidden">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                            <h3 className="text-[12px] font-black uppercase tracking-widest text-white/90">Sharp Book Lines (To remove vig)</h3>
                                        </div>
                                        <div className="group relative cursor-help">
                                            <HelpCircle className="w-4 h-4 text-muted hover:text-white transition-colors" />
                                            <div className="absolute bottom-full mb-2 right-0 w-[260px] bg-black border border-white/10 p-3 rounded-xl text-[10px] font-medium leading-relaxed text-muted opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl">
                                                Enter the odds from a sharp bookmaker (like Pinnacle or Circa) for BOTH sides of the bet. This allows us to calculate the probability with the house edge (vig) removed.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2 relative">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-muted/80 flex items-center gap-1.5">
                                                Side A (Your Bet) <span className="text-blue-400 text-[9px]">(Sharp)</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={sharpOddsA}
                                                onChange={(e) => setSharpOddsA(e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-xl font-bold text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none"
                                                placeholder="-120"
                                            />
                                        </div>
                                        <div className="hidden md:flex absolute left-1/2 top-3/4 -translate-y-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-[#111] border border-white/10 items-center justify-center text-[9px] font-black text-muted uppercase tracking-widest shadow-xl">
                                            vs
                                        </div>
                                        <div className="flex flex-col gap-2 relative">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-muted/80 flex items-center gap-1.5">
                                                Side B (Opponent) <span className="text-red-400 text-[9px]">(Sharp)</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={sharpOddsB}
                                                onChange={(e) => setSharpOddsB(e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-xl font-bold text-white focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all outline-none"
                                                placeholder="+100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Dashboard Results */}
                    <div className="lg:col-span-5 flex flex-col pt-0 lg:pt-14">
                        <div className="om-card p-6 md:p-8 bg-[#050505] border-white/10 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.8)] sticky top-32">

                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-card-border">
                                <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                                    </span>
                                    Analytics Engine
                                </h3>
                            </div>

                            {!results ? (
                                <div className="py-20 text-center flex flex-col items-center justify-center opacity-50">
                                    <div className="w-16 h-16 border-4 border-white/10 border-t-accent rounded-full animate-spin mb-4"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted">Awaiting Market Data</span>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Edge Indicator */}
                                    <div className={`p-5 rounded-2xl flex items-center gap-4 border ${results.edge === 'positive' ? 'bg-accent/10 border-accent/20 text-accent' :
                                            results.edge === 'negative' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                                'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                                        }`}>
                                        <div className={`w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center bg-black/50`}>
                                            {results.edge === 'positive' && <CheckCircle2 className="w-6 h-6" />}
                                            {results.edge === 'negative' && <XCircle className="w-6 h-6" />}
                                            {results.edge === 'neutral' && <AlertTriangle className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Mathematical Status</div>
                                            <div className="text-xl font-bold">
                                                {results.edge === 'positive' && "Profitable (+EV)"}
                                                {results.edge === 'negative' && "Unprofitable (-EV)"}
                                                {results.edge === 'neutral' && "Breakeven (0EV)"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expected Value Result */}
                                    <div className="bg-card/30 rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full group-hover:bg-accent/10 transition-colors pointer-events-none"></div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-muted mb-2">Expected Value (EV)</div>

                                        <div className="flex items-baseline gap-4 mt-2">
                                            <span className={`text-4xl lg:text-5xl font-black tracking-tighter ${results.evAmount >= 0 ? 'text-white' : 'text-red-500'}`}>
                                                {results.evAmount > 0 ? '+' : ''}{results.evPercentage.toFixed(2)}%
                                            </span>
                                            <span className={`text-xl font-bold ${results.evAmount >= 0 ? 'text-accent' : 'text-red-500'}`}>
                                                {results.evAmount > 0 ? '+' : ''}${results.evAmount.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Secondary Metrics */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-card/30 rounded-2xl p-4 border border-white/5 flex flex-col justify-center">
                                            <div className="text-[9px] font-black uppercase tracking-widest text-muted mb-1 flex items-center justify-between">
                                                True Win Prob
                                                <HelpCircle className="w-3 h-3 cursor-help text-muted/50 hover:text-accent transition-colors" />
                                            </div>
                                            <div className="text-2xl font-black">{results.noVigProb.toFixed(1)}%</div>
                                        </div>
                                        <div className="bg-card/30 rounded-2xl p-4 border border-white/5 flex flex-col justify-center">
                                            <div className="text-[9px] font-black uppercase tracking-widest text-muted mb-1 flex items-center justify-between">
                                                Suggested Kelly
                                                <HelpCircle className="w-3 h-3 cursor-help text-muted/50 hover:text-accent transition-colors" />
                                            </div>
                                            <div className={`text-2xl font-black ${results.kellyFraction > 0 ? 'text-[#f7d849]' : 'text-muted'}`}>
                                                {results.kellyFraction > 0 ? `${results.kellyFraction.toFixed(2)}%` : '0.00%'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Upsell to Paid product */}
                                    <div className="mt-8 pt-6 border-t border-white/5">
                                        <div className="bg-accent/5 rounded-xl border border-accent/20 p-4">
                                            <p className="text-xs font-bold leading-relaxed text-muted/90 mb-3">
                                                Manually calculating EV takes time. Our algorithms scan thousands of lines per second to find and alert you to <span className="text-accent underline decoration-accent/30 underline-offset-2">structural mispricing</span>.
                                            </p>
                                            <Link href="/#pricing" className="block w-full">
                                                <button className="w-full py-2.5 rounded-lg bg-accent/10 border border-accent/30 text-accent text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-black transition-colors">
                                                    Automate My Edge
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                {/* Educational Content / SEO Below the fold */}
                <div className="max-w-4xl mx-auto mt-32 space-y-12 mb-20">
                    <div className="text-center">
                        <div className="w-16 h-1 bg-accent/20 mx-auto rounded-full mb-6"></div>
                        <h2 className="text-2xl md:text-3xl font-black italic mb-6">Stop Guessing. Start Calculating.</h2>
                        <p className="text-muted leading-relaxed font-medium md:text-lg">
                            The difference between a retail gambler and an institutional bettor comes down to one absolute truth: <strong>Expected Value (+EV)</strong>. The sportsbook mathematically guarantees its profit by baking a fee (vig) into every line. If you consistently bet without mathematically verifying that your edge exceeds that vig, you will lose long-term. Period.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="om-card bg-card/10 p-8 border border-white/5 shadow-none rounded-3xl">
                            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-black">1</div>
                                Finding Fair Value
                            </h3>
                            <p className="text-muted leading-relaxed text-sm">
                                Market odds are distorted. If a book lists both sides of a bet at -110, their implied probability adds up to 104.7%. That extra 4.7% is their guaranteed cut. To calculate if a bet is +EV, you must first remove the 'vig' from a sharp, highly efficient bookmaker (like Pinnacle) to find the 'True' probability.
                            </p>
                        </div>
                        <div className="om-card bg-card/10 p-8 border border-white/5 shadow-none rounded-3xl">
                            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-black">2</div>
                                The Kelly Criterion
                            </h3>
                            <p className="text-muted leading-relaxed text-sm">
                                Expected Value tells you WHAT to bet, but Kelly Criterion tells you HOW MUCH to bet. Our calculator applies the Kelly formula natively, advising you what percentage of your bankroll to allocate based on the strength of the mathematical edge, minimizing variance and protecting your capital.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
