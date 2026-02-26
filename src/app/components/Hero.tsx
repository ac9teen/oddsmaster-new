'use client';

import React, { useState, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SwipeIndicator from './SwipeIndicator';

export function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const stats = [
    { value: '98.7%', label: 'Data Accuracy Rate' },
    { value: '20+ Models', label: 'Running in Parallel' },
    { value: 'Real-time', label: 'Odds Processing' },
  ];

  // Tournament Data Configuration
  const tournaments = [
    {
      name: 'Premier League',
      sport: 'Football',
      winRate: '68%',
      roi: '+24%',
      img: '/pl.svg'
    },
    {
      name: 'NBA Season',
      sport: 'Basketball',
      winRate: '64%',
      roi: '+18%',
      img: '/nba.svg'
    },
    {
      name: 'ATP Tour',
      sport: 'Tennis',
      winRate: '71%',
      roi: '+29%',
      img: '/atp.svg'
    },
    {
      name: 'NFL',
      sport: 'American Football',
      winRate: '62%',
      roi: '+21%',
      img: '/nfl.svg'
    },
    {
      name: 'IPL',
      sport: 'Cricket',
      winRate: '66%',
      roi: '+31%',
      img: '/ipl.svg'
    },
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const containerWidth = scrollRef.current.offsetWidth;
      const index = Math.round(scrollPosition / (containerWidth * 0.75));
      const safeIndex = Math.max(0, Math.min(index, tournaments.length - 1));
      if (safeIndex !== activeIndex) {
        setActiveIndex(safeIndex);
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-background text-foreground pt-[80px] md:pt-[90px] lg:pt-[100px] pb-6 md:pb-10 flex flex-col items-center overflow-hidden transition-colors duration-300">

      {/* Background Texture - Both Modes */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-60 overflow-hidden">
        <Image
          src="/bg1.png"
          alt="Background Texture"
          fill
          priority
          quality={90}
          className="object-cover mix-blend-screen"
          sizes="100vw"
        />

        {/* Cryptic Scanning Effect */}
        <div className="absolute inset-0 z-10 opacity-20">
          <div className="absolute inset-x-0 h-[2px] bg-accent/40 animate-scan pointer-events-none top-[-10%]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>

      <div className="om-container relative z-10 flex flex-col items-center w-full px-4">

        {/* Main Heading */}
        <div className="text-center mb-8 md:mb-12 max-w-[1100px] w-full mt-12 md:mt-12">
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 md:mb-6 drop-shadow-sm break-words px-4"
          >
            From Casual Tips to <br className="hidden sm:block" />
            <motion.span
              initial={{ backgroundPosition: '200% center' }}
              animate={{ backgroundPosition: '0% center' }}
              transition={{
                duration: 4,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7d849] via-[#fff5b8] to-[#f59e0b] bg-[length:200%_auto] inline-block"
            >
              Quantitative Alpha
            </motion.span>
          </motion.h1>
          <p className="text-muted max-w-[800px] mx-auto leading-relaxed font-bold tracking-tight text-xl md:text-2xl px-4">
            Whether you&apos;re looking for daily high-conviction picks or building a scalable betting syndicate,
            OddsMaster bridges the gap between retail intuition and institutional data science.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-12 md:mb-20 flex flex-col items-center gap-6">
          <button
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="om-btn-primary scale-110"
          >
            View Plans & Pricing
            <ArrowRight className="w-6 h-6 ml-2 inline-block group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="w-full max-w-[900px] mb-10 md:mb-16 px-6 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-card-border border-2 border-card-border rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
            {stats.map((stat, i) => (
              <div key={i} className="bg-card p-8 md:p-10 flex flex-col items-center text-center hover:bg-accent/[0.02] transition-all duration-500 group">
                <span className="text-3xl md:text-4xl font-black text-accent mb-2 tracking-tighter group-hover:scale-105 transition-transform">{stat.value}</span>
                <span className="text-muted text-[10px] font-black uppercase tracking-[0.3em]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tournaments Coverage Section - Tight Layout */}
        <div className="w-full overflow-hidden">
          <div className="mb-6 flex flex-col items-center">
            <h2 className="text-accent font-black text-[10px] uppercase tracking-[0.3em] mb-1">
              Active Markets
            </h2>
            <div className="w-16 h-1.5 bg-accent/20 rounded-full"></div>
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex lg:grid lg:grid-cols-5 gap-4 lg:gap-6 overflow-x-auto lg:overflow-visible pb-4 pt-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing relative z-20"
          >
            {tournaments.map((t, i) => (
              <div
                key={i}
                className={`min-w-[260px] md:min-w-[280px] lg:min-w-0 snap-center flex flex-col group h-full transition-all duration-700 ${i === activeIndex ? 'scale-105 lg:scale-100' : 'scale-95 lg:scale-100 opacity-60 lg:opacity-100'
                  }`}
              >
                <div className={`om-card p-0 flex flex-col h-full relative overflow-hidden group/card bg-card border-card-border hover:border-accent/40 transition-all duration-500`}>

                  {/* Logo Area */}
                  <div className="relative h-32 w-full flex items-center justify-center overflow-hidden border-b border-card-border/50">
                    {/* Real Logo */}
                    <div className="relative w-20 h-20 group-hover/card:scale-110 transition-transform duration-700 z-10">
                      <Image
                        src={t.img}
                        alt={t.name}
                        fill
                        className={`object-contain group-hover/card:scale-105 transition-all duration-700 ${t.img === '/atp.svg' ? 'brightness-0 invert' : ''}`}
                        sizes="(max-width: 768px) 100px, 80px"
                        loading="lazy"
                      />
                    </div>


                  </div>

                  {/* Info Density Area */}
                  <div className="p-5 flex flex-col flex-grow bg-card/50">
                    <h3 className="font-black text-foreground uppercase tracking-tight mb-1">{t.name}</h3>
                    <p className="text-muted text-[10px] font-bold uppercase tracking-widest mb-4">{t.sport}</p>

                    <div className="mt-auto grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
                      <div>
                        <div className="text-[9px] text-muted font-black uppercase tracking-wider mb-0.5">Win Rate</div>
                        <div className="text-xl font-black text-accent">{t.winRate}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] text-muted font-black uppercase tracking-wider mb-0.5">Avg. ROI</div>
                        <div className="text-xl font-black text-[#f7d849]">{t.roi}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Scroll Indicator & Swipe Helper */}
          <div className="flex lg:hidden flex-col items-center gap-2 mt-8 relative z-30">
            <div className="flex justify-center items-center gap-3 mb-2">
              {tournaments.map((_, i) => (
                <button
                  key={i}
                  className={`transition-all duration-500 rounded-full h-1.5 ${i === activeIndex
                    ? 'w-10 bg-accent'
                    : 'w-1.5 bg-foreground/20'
                    }`}
                  aria-label={`Go to tournament ${i + 1}`}
                />
              ))}
            </div>

            <SwipeIndicator />
          </div>
        </div>
      </div>
    </section>
  );
}
