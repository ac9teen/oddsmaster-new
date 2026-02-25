'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import MinimalBarChart from './MinimalBarChart';

export function MissionSection() {
    return (
        <section id="mission" className="py-8 md:py-16 px-4 bg-background relative reveal transition-colors duration-300">
            {/* Background Texture matching main site style (bg2) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-30 overflow-hidden">
                <img src="/bg2.png" alt="" className="w-full h-full object-cover mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
            </div>

            <div className="om-container max-w-3xl relative z-10">
                <div className="text-center mb-10">
                    <h2 className="mb-6 italic text-2xl md:text-3xl lg:text-4xl max-w-4xl mx-auto leading-tight">
                        Betting companies are{' '}
                        <motion.span
                            className="text-red-600 inline-block font-black uppercase tracking-tight relative"
                            animate={{
                                scale: [1, 1.05, 1],
                                textShadow: [
                                    "0 0 0px rgba(220, 38, 38, 0)",
                                    "0 0 10px rgba(220, 38, 38, 0.5)",
                                    "0 0 0px rgba(220, 38, 38, 0)"
                                ]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <span className="relative z-10">preying on you</span>
                            {/* Subtle blood/danger drip effect or ominous glow */}
                            <motion.span
                                className="absolute -inset-1 bg-red-500/10 blur-xl -z-10 rounded-full"
                                animate={{ opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                            />
                        </motion.span>
                        {' '}— it&apos;s time to outsmart the system
                    </h2>

                    <div className="relative w-full aspect-[2/1] rounded-[32px] overflow-hidden mb-6 border border-white/10 shadow-2xl">
                        <Image
                            src="/FINALBG.png"
                            alt="Systematic Extraction Illustration"
                            fill
                            className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background"></div>
                    </div>
                </div>

                <div className="om-card-premium mb-12 px-8 md:px-12 py-10">
                    <div className="space-y-6 text-lg md:text-xl text-muted font-medium leading-relaxed mb-8 max-w-3xl mx-auto">
                        <p>
                            Let&apos;s be honest: sportsbooks aren&apos;t here to &quot;make the game more fun.&quot; They&apos;re built to keep you hooked and quietly bleed your wallet. Research shows <span className="text-accent underline decoration-accent/30 underline-offset-4 font-bold">online betting drains household savings</span>¹. The hit is heaviest on young men and financially stressed households².
                        </p>
                        <p>
                            For every flashy &quot;big win&quot; story, there are thousands scraping by—<span className="text-red-500 underline decoration-red-500/30 underline-offset-4 font-bold">more anxiety, more debt, less future</span>³.
                        </p>
                        <p>
                            This isn&apos;t entertainment, it&apos;s extraction. At OddsMaster, we&apos;re not selling illusions; we&apos;re giving you clarity, discipline, and smarter ways to play—so you can finally flip the odds in your favor.
                        </p>
                    </div>

                    <div className="pt-6 border-t border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-3">Sources:</p>
                        {[
                            { id: 1, text: 'Kellogg Insight – Online sports betting is draining household savings' },
                            { id: 2, text: 'Institute for Family Studies – The sports gambling disaster' },
                            { id: 3, text: 'Vox – The real costs of legalized sports betting' }
                        ].map((source) => (
                            <p key={source.id} className="text-[10px] font-bold text-muted/60">
                                <sup className="text-accent mr-1">{source.id}</sup> {source.text}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-8 md:mt-12">
                    <h2 className="text-3xl md:text-5xl font-black italic mb-10 tracking-tighter leading-none">
                        A future where <span className="text-accent underline decoration-accent/30 underline-offset-4 font-bold">everyone wins</span>
                    </h2>

                    <div className="p-0 overflow-hidden mb-10 border-none bg-transparent shadow-none">
                        <MinimalBarChart />
                    </div>

                    <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-muted font-medium leading-relaxed">
                        <p>
                            Every year, people bet over $1.6 trillion worldwide and the house walks away with more than $250 billion of it.
                        </p>
                        <p>
                            At OddsMaster, we do things differently. We treat betting like an asset class, using discipline, strategy, and data-driven insights to help you shift the odds and turn the house&apos;s cut into smarter profits for yourself.
                        </p>
                    </div>

                    <div className="mt-12 text-left max-w-2xl mx-auto pl-8 border-l border-accent/20">
                        <p className="text-muted font-bold italic mb-4">Sincerely,</p>
                        <div className="relative w-48 h-16 opacity-80 hover:opacity-100 transition-opacity">
                            <Image
                                src="/Lex_Green.svg"
                                alt="Lex Oddsman Signature"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
