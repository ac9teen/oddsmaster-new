'use client';

import React, { useState } from 'react';
import { Target, Zap, Wallet, Disc } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BettingSlipCarousel from './BettingSlipCarousel';
import Image from 'next/image';

export function ExpertiseSection() {
  const [mode, setMode] = useState<'retail' | 'quant'>('quant');

  return (
    <section id="about" className="py-12 md:py-20 bg-background text-foreground relative overflow-hidden transition-colors duration-300">
      {/* Background Texture with Cinematic Drift */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40 overflow-hidden">
        <Image
          src="/bg8.png"
          alt="Background Texture"
          fill
          className="object-cover mix-blend-overlay animate-drift"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>

      <div className="om-container relative z-10 w-full">
        {/* Simplified Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto reveal px-4 md:px-0">
          <div className="experts-header-tag">Operational Mastery</div>
          <h2 className="mb-8 italic">
            Mastering the <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#f7d849] to-[#f59e0b]">Multi</span> & Conserving your <span className="text-accent underline decoration-accent/20">Capital</span>
          </h2>
          <p className="text-muted font-bold max-w-2xl mx-auto leading-relaxed">
            Institutional-grade betting isn&apos;t just about picking winners—it&apos;s about rigorous capital structuring. We maximize asymmetric upside while maintaining strict risk controls.
          </p>
        </div>

        <div className="flex flex-col gap-20 lg:gap-32">

          {/* RISK MITIGATION PROTOCOL */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* Protocol Header */}


            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Left Column: The Paradox */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="om-card p-8 bg-card/40 backdrop-blur-md border-white/5 relative overflow-hidden">
                  <h3 className="italic text-2xl mb-6 text-foreground">The Parlay Paradox</h3>
                  <p className="text-muted font-bold text-sm leading-relaxed mb-8">
                    Retail bettors think single outcomes are &quot;safer.&quot; They are wrong. High-capital singles create <span className="text-red-500">Inventory Risk</span>.
                  </p>

                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-2 h-2 mt-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] flex-shrink-0" />
                      <p className="text-[11px] font-bold text-muted/80 leading-relaxed">
                        Retail risks <span className="text-foreground">$500</span> to extract $450. One loss wipes out the bankroll segment.
                      </p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-2 h-2 mt-2 rounded-full bg-accent shadow-[0_0_10px_rgba(7,181,126,0.5)] flex-shrink-0" />
                      <p className="text-[11px] font-bold text-muted/80 leading-relaxed">
                        OddsMaster risks <span className="text-foreground">$50</span> to extract $1,000+. We keep $450 in the wallet while holding the same upside.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-accent/5 border border-accent/20 rounded-3xl p-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-accent font-black text-[10px] uppercase tracking-widest leading-relaxed">
                    Leverage precision over volume. Maximize capital velocity.
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Dashboard */}
              <div className="lg:col-span-7">
                <div className="om-card-premium p-1 bg-[#050505] border-white/10 overflow-hidden shadow-2xl">
                  {/* Dashboard Header */}
                  <div className="bg-white/5 p-2 rounded-t-[2.3rem] flex justify-center mb-8 border-b border-white/5">
                    <div className="flex bg-black/50 p-1 rounded-full border border-white/5 relative">
                      {/* Sliding Pill */}
                      <motion.div
                        className="absolute inset-y-1 rounded-full bg-accent/20 border border-accent/30"
                        initial={false}
                        animate={{
                          left: mode === 'retail' ? '4px' : '50%',
                          width: 'calc(50% - 4px)',
                          x: mode === 'quant' ? '0%' : '0%'
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />

                      <button
                        onClick={() => setMode('retail')}
                        className={`relative z-10 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${mode === 'retail' ? 'text-white' : 'text-muted hover:text-white'}`}
                      >
                        Retail Path
                      </button>
                      <button
                        onClick={() => setMode('quant')}
                        className={`relative z-10 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${mode === 'quant' ? 'text-accent' : 'text-muted hover:text-white'}`}
                      >
                        Quant Protocol
                      </button>
                    </div>
                  </div>

                  {/* Dashboard Grid */}
                  <div className="px-6 md:px-10 pb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Liquid Bankroll */}
                      <div className="bg-card/5 rounded-3xl p-6 border border-white/5 relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-8">
                          <span className="text-[9px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
                            <Wallet className="w-3 h-3" /> Capital State
                          </span>
                        </div>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={mode}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter"
                          >
                            {mode === 'retail' ? '$0' : '$450'}
                          </motion.div>
                        </AnimatePresence>
                        <div className={`inline-block px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${mode === 'retail' ? 'bg-red-500/10 text-red-500' : 'bg-[#07b57e]/10 text-[#07b57e]'}`}>
                          {mode === 'retail' ? 'Capital Exhausted' : 'Capital Preserved'}
                        </div>
                      </div>

                      {/* Risked Assets */}
                      <div className="bg-card/5 rounded-3xl p-6 border border-white/5 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-8">
                          <span className="text-[9px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
                            <Disc className="w-3 h-3" /> Exposure Model
                          </span>
                          <span className="text-[10px] text-muted"><Disc className="w-3 h-3 animate-spin duration-[10s]" /></span>
                        </div>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={mode}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter"
                          >
                            {mode === 'retail' ? '$500' : '$50'}
                          </motion.div>
                        </AnimatePresence>
                        <div className={`inline-block px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${mode === 'retail' ? 'text-muted' : 'text-[#07b57e]'}`}>
                          {mode === 'retail' ? '1.9x Potential Return' : 'Target: 18.4x ROI'}
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 text-center px-4">
                      <p className="text-muted text-[10px] md:text-xs font-bold leading-relaxed italic">
                        The OddsMaster path leverages systematic extraction. Low entry cost with massive asymmetric upside allows you to survive variance and scale indefinitely.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* BACKTEST RESULTS */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col w-full"
          >
            <div className="relative mb-8 md:mb-12 w-full flex flex-col">
              <div className="text-center mb-12">
                <h2 className="italic">
                  Performance <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#f7d849] to-[#f59e0b]">Verification</span>
                </h2>
              </div>

              <div className="w-full">
                <BettingSlipCarousel />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
