'use client';

import React, { useState } from 'react';
import { Zap, ArrowUpRight, X, ChevronRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeIndicator from './SwipeIndicator';
import Image from 'next/image';

export function StrategyModels() {
    const models = [
        {
            id: "uam-01",
            name: "Underdog Alpha Model",
            type: "Predictive Inefficiency",
            description: "Identifies structural mispricing in underdog outcomes by running 10,000+ Monte Carlo simulations per match, isolating value where public sentiment is distorted.",
            metrics: { winRate: "34%", avgMultiplier: "4.2x", exposure: "Low" },
            process: [
                { title: "Data Ingestion", desc: "Scrape historical odds and public betting volumes to map where retail gets overly emotional." },
                { title: "The Neutralizer", desc: "Apply Bayesian inference to strip away the 'hype' premium and expose naked probabilities." },
                { title: "Simulation Matrix", desc: "Run 10,000 Monte Carlo loops. If the server isn't sweating, we aren't trying hard enough." },
                { title: "Alpha Extraction", desc: "Identify +300 underdogs that are mathematically +150 eagles in disguise." }
            ],
            icon: (
                <div className="relative w-8 h-8">
                    <Image
                        src="/icons/underdog_alpha_model.svg"
                        alt="Underdog Alpha Model"
                        fill
                        className="object-contain drop-shadow-[0_0_5px_rgba(247,216,73,0.5)]"
                    />
                </div>
            )
        },
        {
            id: "iap-02",
            name: "Institutional Arbitrage Protocol",
            type: "Cross-Market Delta",
            description: "High-frequency monitoring of the spread between traditional bookmaker lines and decentralized prediction markets (Polymarket, Kalshi) to capture risk-free alpha.",
            metrics: { winRate: "92%", avgMultiplier: "1.08x", exposure: "Hedged" },
            process: [
                { title: "API Spelunking", desc: "Hook into sluggish traditional bookmakers and lightning-fast decentralized exchanges simultaneously." },
                { title: "Latency Wars", desc: "Optimize our ping to be faster than the boomer oddsmaker's coffee break." },
                { title: "Spread Detection", desc: "Spot the 12-second window where Polymarket says 'Yes' but Vegas says 'Maybe'." },
                { title: "Execution", desc: "Lock in both sides of the trade. Extract mathematically guaranteed yield while sipping matcha." }
            ],
            icon: (
                <div className="relative w-8 h-8">
                    <Image
                        src="/icons/institutional.svg"
                        alt="Institutional Arbitrage Protocol"
                        fill
                        className="object-contain drop-shadow-[0_0_5px_rgba(247,216,73,0.5)]"
                    />
                </div>
            )
        },
        {
            id: "vne-03",
            name: "Variance Neutralization Engine",
            type: "Risk Budgeting",
            description: "A proprietary capital allocation model that dynamically adjusts position sizes based on real-time bankroll volatility and event-level confidence scores.",
            metrics: { drawdown: "< 4.5%", kellyScale: "0.25", recovery: "Rapid" },
            process: [
                { title: "Volatility Mapping", desc: "Continuously measure the heartbeat of the bankroll against expected EV swings." },
                { title: "Kelly on Steroids", desc: "Dynamically shrink bet sizing during chaos, scale up when the math guarantees blood." },
                { title: "Circuit Breaker", desc: "Automatically halt exposure if localized variance exceeds the 4.5% catastrophic threshold." },
                { title: "Sleep Better Protocol", desc: "Ensures we never wake up to an empty wallet, no matter how nasty the bad beats get." }
            ],
            icon: (
                <div className="relative w-8 h-8">
                    <Image
                        src="/icons/variance.svg"
                        alt="Variance Neutralization Engine"
                        fill
                        className="object-contain drop-shadow-[0_0_5px_rgba(247,216,73,0.5)]"
                    />
                </div>
            )
        },
        {
            id: "ssb-04",
            name: "Sharp-Flow Sentiment Bot",
            type: "Liquidity Tracking",
            description: "Tracks 'Smart Money' flow across major liquidity pools to identify pivot points where large institutional syndicates are entering the market.",
            metrics: { leadTime: "12m", accuracy: "78%", sentiment: "Dynamic" },
            process: [
                { title: "Syndicate Spies", desc: "Monitor offshore liquidity shifts linked to known whale wallets and sharp betting groups." },
                { title: "Reverse-Retail Trigger", desc: "Detect anomalies when 80% of the money is placed by only 5% of the accounts." },
                { title: "Shadowing", desc: "Piggyback on the 'Smart Money' move before the lines drastically adjust." },
                { title: "Alpha Leech", desc: "Surf their multi-million dollar waves for our own fractional, yet highly profitable, cut." }
            ],
            icon: (
                <div className="relative w-8 h-8">
                    <Image
                        src="/icons/sharp_flow.svg"
                        alt="Sharp-Flow Sentiment Bot"
                        fill
                        className="object-contain drop-shadow-[0_0_5px_rgba(247,216,73,0.5)]"
                    />
                </div>
            )
        }
    ];

    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [selectedModel, setSelectedModel] = useState<typeof models[0] | null>(null);

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollPosition = scrollRef.current.scrollLeft;
            const containerWidth = scrollRef.current.offsetWidth;
            const index = Math.round(scrollPosition / containerWidth);
            setActiveIndex(index);
        }
    };

    return (
        <section id="models" className="py-12 md:py-20 bg-background text-foreground relative overflow-hidden">
            {/* Background Texture with Glitch Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40 overflow-hidden">
                <Image
                    src="/bg7.png"
                    alt="Background Texture"
                    fill
                    className="object-cover mix-blend-screen animate-glitch-bg"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
            </div>

            <div className="om-container relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
                    <div className="max-w-2xl px-4 md:px-0">
                        <div className="experts-header-tag">The Machine</div>
                        <h2 className="italic mb-4">
                            Advanced <span className="text-accent">Quant</span> Models
                        </h2>
                        <p className="text-muted font-bold leading-relaxed max-w-xl">
                            We don&apos;t use &quot;gut feeling.&quot; Our strategies are built on the same principles used by high-frequency trading firms and hedge funds in prediction markets.
                        </p>
                    </div>

                </div>

                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex md:grid md:grid-cols-2 gap-4 md:gap-6 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory pb-8 md:pb-0"
                >
                    {models.map((model, i) => (
                        <motion.div
                            key={model.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="min-w-[90vw] md:min-w-0 snap-center group relative"
                        >
                            <div className="om-card-premium p-6 md:p-8 h-full bg-card/30 border-card-border/50 hover:border-accent/40 transition-all duration-500 overflow-hidden flex flex-col md:flex-row gap-8 relative">
                                {/* Technical Scanning Effect - The Surprise */}
                                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 pointer-events-none">
                                    <div className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-accent to-transparent -translate-x-full group-hover:animate-sweep"></div>
                                </div>

                                <div className="flex-shrink-0 relative z-10 hidden md:block">
                                    <div className="w-16 h-16 rounded-2xl bg-background border border-card-border flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                        {model.icon}
                                    </div>
                                </div>

                                <div className="flex-grow relative z-10 text-left flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-background border border-card-border flex items-center justify-center shadow-xl md:hidden">
                                                <div className="scale-50">{model.icon}</div>
                                            </div>
                                            <span className="text-[10px] font-black text-accent uppercase tracking-widest">{model.type}</span>
                                        </div>
                                        <span className="text-[10px] font-black text-muted tracking-widest">{model.id}</span>
                                    </div>
                                    <h3 className="mb-4 group-hover:text-accent transition-colors flex items-center gap-2">
                                        {model.name}
                                    </h3>
                                    <p className="text-muted font-medium leading-relaxed mb-8 flex-grow">
                                        {model.description}
                                    </p>

                                    <div className="grid grid-cols-3 gap-4 pt-6 pb-6 border-t border-card-border">
                                        {Object.entries(model.metrics).map(([key, value]) => (
                                            <div key={key}>
                                                <div className="text-[8px] text-muted font-black uppercase tracking-widest mb-1">{key}</div>
                                                <div className="text-sm font-black text-foreground group-hover:text-accent transition-colors">{value}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-auto">
                                        <button
                                            onClick={() => setSelectedModel(model)}
                                            className="text-xs font-bold text-accent flex items-center gap-2 hover:text-white transition-colors uppercase tracking-wider bg-accent/10 px-4 py-2.5 rounded-lg border border-accent/20 hover:bg-accent/20 w-fit"
                                        >
                                            <Activity className="w-3.5 h-3.5" /> How this actually works?
                                        </button>
                                    </div>
                                </div>

                                {/* Aesthetic Background Gradient */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full pointer-events-none group-hover:bg-accent/10 transition-colors"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Slider Indicator & Swipe Helper */}
                <div className="flex md:hidden flex-col items-center gap-2 mt-12 pb-4">
                    <div className="flex justify-center items-center gap-2 mb-2">
                        {models.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-10 bg-accent' : 'w-2 bg-foreground/10'}`}
                            ></div>
                        ))}
                    </div>

                    <SwipeIndicator />
                </div>

                <style jsx>{`
                    @keyframes sweep {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(500%); }
                    }
                `}</style>
            </div>

            {/* Quirky Technical Modal */}
            <AnimatePresence>
                {selectedModel && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
                        onClick={() => setSelectedModel(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20, filter: 'blur(5px)' }}
                            animate={{ scale: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ scale: 0.95, y: 20, filter: 'blur(5px)' }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl bg-card border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden"
                        >
                            {/* Organic Header */}
                            <div className="px-6 md:px-8 py-5 flex justify-between items-center border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-accent" />
                                    <span className="text-xs uppercase tracking-[0.2em] font-black text-muted/90">
                                        Model Architecture Extract
                                    </span>
                                </div>
                                <button
                                    onClick={() => setSelectedModel(null)}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-muted hover:text-white"
                                    aria-label="Close modal"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="p-6 md:p-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex flex-shrink-0 items-center justify-center p-2">
                                        {selectedModel.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{selectedModel.name}</h3>
                                        <p className="text-accent text-xs font-mono uppercase tracking-widest mt-1">Operational Protocol</p>
                                    </div>
                                </div>

                                <div className="relative">
                                    {/* Vertical connecting line */}
                                    <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10"></div>

                                    <div className="space-y-8 relative">
                                        {selectedModel.process.map((step, idx) => (
                                            <div key={idx} className="flex gap-6 relative">
                                                {/* Node indicator */}
                                                <div className="relative z-10 w-8 h-8 rounded-full bg-card border-2 border-accent/30 flex-shrink-0 flex items-center justify-center mt-0.5">
                                                    <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(7,181,126,0.8)]"></div>
                                                </div>

                                                <div>
                                                    <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1 font-mono">
                                                        Phase 0{idx + 1} // {step.title}
                                                    </div>
                                                    <p className="text-sm text-muted font-medium leading-relaxed">
                                                        {step.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-10 pt-6 border-t border-white/10 flex justify-end">
                                    <button
                                        onClick={() => setSelectedModel(null)}
                                        className="text-xs font-bold bg-white/5 hover:bg-white/10 px-6 py-2 rounded-lg transition-colors border border-white/5 hover:border-white/20"
                                    >
                                        Acknowledge & Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
