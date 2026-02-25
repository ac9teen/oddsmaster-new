'use client';

import React from 'react';
import { Brain, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Features() {
  const features = [
    {
      title: "Build your winning strategy",
      description: "Turn raw match data and live odds into actionable betting frameworks, guided by advanced predictive modelling.",
      icon: <Brain className="w-10 h-10 text-[#079b6c]" />
    },
    {
      title: "Accelerate portfolio growth",
      description: "Hit profit milestones with confidence. Add new strategies and market coverage your current system lacks.",
      icon: <TrendingUp className="w-10 h-10 text-[#079b6c]" />
    },
    {
      title: "Stabilise risk and performance",
      description: "Eliminate guesswork and reduce volatility with refined bankroll management and performance monitoring tools.",
      icon: <ShieldCheck className="w-10 h-10 text-[#079b6c]" />
    }
  ];

  return (
    <section id="case-studies" className="py-12 md:py-20 bg-section-bg text-foreground relative overflow-hidden transition-colors duration-300">
      {/* Background Decorative Element - Dark Mode Only */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#07b57e]/5 blur-[100px] rounded-full pointer-events-none opacity-0 dark:opacity-100"></div>

      <div className="om-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-block px-3 py-1 rounded-full border border-[#07b57e]/30 bg-[#07b57e]/10 text-[#07b57e] text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              Our Framework
            </div>
            <h2 className="mb-8 italic">
              Launch. Scale.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#07b57e] to-[#058c62]">Stabilize.</span>
            </h2>
            <p className="text-muted mb-10 leading-relaxed max-w-lg font-bold mx-auto lg:mx-0 text-sm md:text-base px-4 md:px-0">
              OddsMaster provides the infrastructure you need to turn betting into a structured, profitable enterprise with institutional-grade tools.
            </p>
            <div className="flex justify-center lg:justify-start px-4 md:px-0">
              <Link href="#pricing" className="w-full sm:w-auto">
                <button className="om-btn-primary w-full sm:w-auto group">
                  View Plans & Pricing
                  <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Features Grid */}
          <div className="grid grid-cols-1 gap-5 relative">
            <div className="absolute -inset-4 bg-[#07b57e]/5 blur-3xl rounded-full pointer-events-none"></div>
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-card/80 backdrop-blur-xl border border-card-border p-6 md:p-8 rounded-[32px] hover:border-[#07b57e]/40 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#07b57e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex gap-6 items-start relative z-10 text-left">
                  <div className="bg-background border border-card-border p-4 rounded-2xl group-hover:bg-[#07b57e]/10 group-hover:border-[#07b57e]/30 transition-all duration-500 shadow-xl group-hover:scale-110">
                    <div className="text-[#07b57e]">{React.cloneElement(feature.icon as React.ReactElement<any>, { className: 'w-6 h-6 md:w-8 md:h-8' })}</div>
                  </div>
                  <div>
                    <h3 className="mb-2 group-hover:text-[#07b57e] transition-colors">{feature.title}</h3>
                    <p className="text-muted leading-relaxed font-bold text-sm">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
