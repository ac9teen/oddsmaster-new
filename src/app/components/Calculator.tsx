'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, TrendingUp, Zap, MousePointer2, Wallet, ArrowRightLeft, Target } from 'lucide-react';

export function Calculator() {
  const [activeMode, setActiveMode] = useState<'retail' | 'quant'>('quant');

  return (
    <section className="py-12 md:py-20 bg-[#020202] text-foreground relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-[#00d588]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="om-container relative z-10 w-full max-w-6xl mx-auto px-4 md:px-0">

        <div className="text-center mb-12 md:mb-16">
          <div className="experts-header-tag flex items-center gap-2 mx-auto w-fit">
            <Target className="w-3 h-3 text-accent" />
            Strategic Capital Deployment
          </div>
          <h2 className="text-4xl md:text-6xl font-black italic mt-4 tracking-tighter leading-none text-white uppercase">
            Risk <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7d849] via-[#fff5b8] to-[#f59e0b] bg-[length:200%_auto] animate-shimmer">Mitigation</span> Protocol
          </h2>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Side: The Narrative */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-8">
            <div className="bg-card/20 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl">
              <h3 className="text-xl font-black italic mb-4 text-white uppercase tracking-tight">The Parlay Paradox</h3>
              <p className="text-muted/80 text-sm md:text-base font-medium leading-relaxed mb-6">
                Retail bettors think single outcomes are &quot;safer.&quot; They are wrong. High-capital singles create <span className="text-red-500">Inventory Risk</span>.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="mt-1 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                  </div>
                  <p className="text-xs font-bold text-muted/60 leading-snug">Retail risks $500 to extract $450. One loss wipes out the bankroll segment.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#00d588]/10 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00d588]"></div>
                  </div>
                  <p className="text-xs font-bold text-muted/60 leading-snug">OddsMaster risks $50 to extract $1,000+. We keep $450 in the wallet while holding the same upside.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#00d588]/5 border border-[#00d588]/10 p-6 rounded-2xl flex items-center gap-4">
              <Zap className="w-8 h-8 text-accent animate-pulse" />
              <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-accent leading-tight">
                Leverage precision over volume. Maximize capital velocity.
              </p>
            </div>
          </div>

          {/* Right Side: Visual Comparison */}
          <div className="lg:col-span-8 bg-[#0a0a0a] border border-white/5 rounded-[40px] p-4 md:p-8 relative overflow-hidden shadow-2xl flex flex-col">

            {/* Interactive Switcher */}
            <div className="flex justify-center mb-10">
              <div className="bg-background/80 p-1.5 rounded-2xl border border-white/5 flex gap-2 w-full max-w-sm">
                <button
                  onClick={() => setActiveMode('retail')}
                  className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeMode === 'retail' ? 'bg-red-500/10 text-red-500 border border-red-500/20 shadow-lg' : 'text-muted/40 hover:text-muted'}`}
                >
                  Retail Path
                </button>
                <button
                  onClick={() => setActiveMode('quant')}
                  className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeMode === 'quant' ? 'bg-[#00d588]/10 text-accent border border-[#00d588]/20 shadow-lg' : 'text-muted/40 hover:text-muted'}`}
                >
                  Quant Protocol
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">

              {/* Wallet Visual */}
              <div className="space-y-6">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted/50 px-2">
                  <span>Capital State</span>
                  <Wallet className="w-3 h-3" />
                </div>
                <div className="bg-background/40 border border-white/5 rounded-3xl p-8 relative overflow-hidden h-[240px] flex flex-col justify-center items-center text-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMode}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative z-10"
                    >
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-muted/40">Liquid Bankroll</div>
                      <div className={`text-6xl md:text-7xl font-black italic tracking-tighter transition-colors ${activeMode === 'retail' ? 'text-white/20' : 'text-white'}`}>
                        ${activeMode === 'retail' ? '0' : '450'}
                      </div>
                      <div className={`mt-4 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${activeMode === 'retail' ? 'bg-red-500/10 text-red-500' : 'bg-[#00d588]/10 text-accent'}`}>
                        {activeMode === 'retail' ? 'Full Exposure' : 'Capital Preserved'}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Visual Bankroll Bar */}
                  <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none overflow-hidden opacity-5">
                    <div
                      className={`absolute inset-x-0 bottom-0 transition-all duration-1000 ${activeMode === 'retail' ? 'h-0 bg-red-500' : 'h-[90%] bg-accent'}`}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Risk Visual */}
              <div className="space-y-6">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted/50 px-2">
                  <span>Exposure Model</span>
                  <Shield className="w-3 h-3" />
                </div>
                <div className="bg-background/40 border border-white/5 rounded-3xl p-8 relative overflow-hidden h-[240px] flex flex-col justify-center items-center text-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMode}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative z-10"
                    >
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-muted/40 items-center flex gap-2 justify-center">
                        Risked Assets
                        <ArrowRightLeft className="w-3 h-3" />
                      </div>
                      <div className={`text-6xl md:text-7xl font-black italic tracking-tighter transition-colors ${activeMode === 'retail' ? 'text-red-500' : 'text-white'}`}>
                        ${activeMode === 'retail' ? '500' : '50'}
                      </div>
                      <div className={`mt-4 text-[10px] font-black uppercase tracking-widest italic ${activeMode === 'retail' ? 'text-red-500/60' : 'text-accent'}`}>
                        Target: {activeMode === 'retail' ? '1.9x' : '18.4x'} ROI
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Visual Pulse */}
                  {activeMode === 'retail' ? (
                    <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none"></div>
                  ) : (
                    <div className="absolute inset-0 bg-accent/5 pointer-events-none"></div>
                  )}
                </div>
              </div>

            </div>

            {/* Comparison Caption */}
            <div className="mt-10 pt-8 border-t border-white/5 text-center px-4">
              <p className="text-muted/60 text-[11px] md:text-xs font-bold leading-relaxed max-w-xl mx-auto italic">
                {activeMode === 'retail'
                  ? "The Retail path is a slow bleed. You risk significant capital for marginal returns, essentially providing liquidity to the sportsbooks."
                  : "The OddsMaster path leverages systematic extraction. Low entry cost with massive asymmetric upside allows you to survive variance and scale indefinitely."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
