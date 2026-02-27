'use client';

import React, { useState } from 'react';
import { UserCheck, Users, Brain, Zap, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function HumanAiSynergy() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const points = [
        {
            title: "Elite Human Selection",
            description: "Our core is powered by veteran analysts with decade-long track records. They identify psychological edges and 'on-the-ground' variables that raw data can miss.",
            icon: (
                <div className="relative w-8 h-8">
                    <img
                        src="/icons/elite_human_selection.svg"
                        alt="Elite Human Selection"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain drop-shadow-[0_0_5px_rgba(247,216,73,0.5)]"
                    />
                </div>
            ),
            tag: "Human Intuition"
        },
        {
            title: "Insight Consolidation",
            description: "We are smart enough to know we don't know everything. We subscribe to and monitor the world's most consistent top-tier bettors, consolidating their high-conviction plays into our proprietary 'Mega-Slips'.",
            icon: (
                <div className="relative w-8 h-8">
                    <img
                        src="/icons/insight_consolidation.svg"
                        alt="Insight Consolidation"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain drop-shadow-[0_0_5px_rgba(247,216,73,0.5)]"
                    />
                </div>
            ),
            tag: "Expert Network"
        },
        {
            title: "The Machine Filter",
            description: "Every human pick and consolidated insight is processed through our top-tier quantitative models. We filter out picks with low mathematical probability and prioritize those with significant structural value.",
            icon: (
                <div className="relative w-8 h-8">
                    <img
                        src="/icons/machine_filter.svg"
                        alt="The Machine Filter"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain drop-shadow-[0_0_5px_rgba(247,216,73,0.5)]"
                    />
                </div>
            ),
            tag: "Quant Validation"
        }
    ];

    return (
        <section className="py-12 md:py-20 bg-background text-foreground relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-30">
                <img src="/bg3.png" alt="" width={1920} height={1080} className="w-full h-full object-cover mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
            </div>

            <div className="om-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12 text-center lg:text-left">
                    <div>
                        <div className="experts-header-tag">Synergy Protocol</div>
                        <h2 className="italic mb-6">
                            Randomness can only be cut through <span className="text-[#f7d849]">Randomness</span>.
                        </h2>
                        <p className="text-muted font-bold leading-relaxed max-w-xl border-l-2 border-accent/20 pl-6 mx-auto lg:mx-0">
                            Markets aren&apos;t just numbers; they are human emotions and mechanical shifts. We combine the best of both worlds—unbeatable human intuition and cold, hard algorithmic execution.
                        </p>
                    </div>

                </div>

                {/* Desktop View */}
                <div className="hidden md:grid grid-cols-3 gap-6">
                    {points.map((point, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group p-8 rounded-[32px] border border-card-border bg-card/20 hover:border-accent/40 transition-all duration-500 hover:-translate-y-1 w-full text-center md:text-left shadow-xl"
                        >
                            <div className="flex justify-between items-start mb-12">
                                <div className="p-4 rounded-2xl bg-background border border-card-border group-hover:scale-110 transition-transform duration-500 mx-auto md:mx-0">
                                    {point.icon}
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted/50 group-hover:text-accent transition-colors">{point.tag}</span>
                            </div>
                            <h3 className="mb-4">{point.title}</h3>
                            <p className="text-muted font-medium leading-relaxed">
                                {point.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View - Icons that expand */}
                <div className="md:hidden flex flex-col gap-4 px-4">
                    <div className="flex justify-around items-center mb-6 bg-card/30 backdrop-blur-md rounded-2xl p-4 border border-card-border">
                        {points.map((point, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`p-4 rounded-xl transition-all duration-300 ${activeIndex === i ? 'bg-accent/20 border-accent/40 scale-110 shadow-lg' : 'bg-transparent border-transparent grayscale opacity-50'}`}
                                style={{ border: '1px solid currentColor' }}
                            >
                                {point.icon}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {activeIndex !== null && (
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="p-8 rounded-[32px] border border-accent/30 bg-card/50 backdrop-blur-xl shadow-2xl relative overflow-hidden text-center"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    {points[activeIndex].icon}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-4 block">
                                    {points[activeIndex].tag}
                                </span>
                                <h3 className="mb-4 text-2xl font-black italic">{points[activeIndex].title}</h3>
                                <p className="text-muted font-bold leading-relaxed">
                                    {points[activeIndex].description}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
