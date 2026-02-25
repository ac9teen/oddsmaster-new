'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const partners = [
  { name: 'Stake', logo: '/stake.svg' },
  { name: 'FanDuel', logo: '/fanduel.svg' },
  { name: 'bet365', logo: '/bet365.png' },
  { name: '1xBet', logo: '/1x.svg' },
  { name: 'Kalshi', logo: '/kaalshinew.svg' },
  { name: 'Polymarket', logo: '/Polymarket.png' },
];

export function PartnerBar() {
  return (
    <section className="bg-[#f7d849] py-12 md:py-20 overflow-hidden border-y border-black/5 relative">
      <div className="om-container relative z-10 text-center">
        <div className="max-w-3xl mx-auto mb-10">
          <div className="mb-4 relative inline-block">
            <motion.h2
              initial={{ skewX: 0 }}
              whileInView={{ skewX: [0, -10, 10, -5, 5, 0] }}
              viewport={{ once: false, amount: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              className="italic !text-black relative z-10"
            >
              Counter-Striking the <span className="underline decoration-black/30 underline-offset-4 relative inline-block">
                House Edge
                <motion.span
                  className="absolute inset-0 bg-black/10 mix-blend-overlay"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 0.1 }}
                />
              </span>
            </motion.h2>
          </div>
          <p className="text-black/70 font-bold text-sm md:text-base leading-relaxed">
            We don&apos;t just track odds; we monitor the predatory algorithms of major sportsbooks. Our system identifies structural imbalances in how platforms like BetMGM and Stake price risk, allowing you to exploit the margin they try to hide.
          </p>
        </div>

        {/* Unified Single line for all views */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 lg:gap-20">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative h-6 md:h-8 w-24 md:w-32 transition-all duration-500 hover:scale-110 group"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain transition-all brightness-0 opacity-60 group-hover:opacity-100"
              />
              {/* Tooltip-like indicator */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-black text-[#f7d849] text-[8px] font-black uppercase py-1.5 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-xl z-30">
                Monitoring {partner.name} Edge
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
