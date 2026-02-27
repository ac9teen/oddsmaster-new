'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function BettingIntelligence() {
  const steps = [
    {
      number: "01",
      title: "Data Integrity & Verification",
      stat: "100%",
      description: "Match data points manually verified across multiple official feeds to eliminate ghost outcomes.",
      tag: "Verification"
    },
    {
      number: "02",
      title: "Live Market Stress Testing",
      stat: "11%",
      description: "Strategies are deployed in real-time shadow markets to validate ROI stability before member access.",
      tag: "Stress Test"
    },
    {
      number: "03",
      title: "Proprietary Alpha Scoring",
      stat: "3.1%",
      description: "Our algorithmic scoring system filters out luck-driven variance, leaving only repeatable edge.",
      tag: "Analysis"
    },
    {
      number: "04",
      title: "Elite Network Deployment",
      stat: "1.5%",
      description: "Only the most resilient strategies are listed on our dashboard for institutional and private use.",
      tag: "Deployment"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-background text-foreground relative transition-colors duration-300">
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-30">
        <img src="/bg2.png" alt="" width={1920} height={1080} className="w-full h-full object-cover mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>

      <div className="om-container relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              Refinement Protocol
            </div>
            <h2 className="italic mb-6">
              How we ensure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#f7d849]">Top-Tier Intelligence</span>
            </h2>
          </div>
          <p className="text-muted max-w-md font-bold leading-relaxed border-l-2 border-accent/20 pl-6 pb-2 mx-auto md:mx-0">
            Institutional-grade betting isn&apos;t about picking numbers—it&apos;s about rigorous filtering. We discard 98.5% of strategies to find the ones that actually scale.
          </p>
        </div>

        {/* Sticky Stacking Cards */}
        <div className="flex flex-col gap-12 md:gap-8 relative">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="sticky top-20 md:top-32 w-full"
              style={{
                zIndex: i + 1,
              }}
            >
              <div className="om-card-premium p-8 md:p-12 min-h-[350px] md:min-h-[400px] flex flex-col justify-center border-accent/10 hover:border-accent/30 bg-card/98 backdrop-blur-2xl transition-all duration-700 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)] group">
                {/* Refined sweep animation */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>

                {/* Background Number Accent - INCREASED VISIBILITY */}
                <div className="absolute right-8 top-4 text-[120px] md:text-[200px] font-black text-white/5 pointer-events-none group-hover:text-accent/10 transition-all duration-1000">
                  {step.number}
                </div>

                <div className="relative z-10 max-w-2xl">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[11px] font-black text-accent uppercase tracking-[0.3em]">{step.tag}</span>
                    <div className="h-px w-12 bg-accent/20"></div>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-black italic mb-8 group-hover:text-accent transition-colors tracking-tighter">
                    {step.title}
                  </h3>

                  <div className="flex flex-col md:flex-row md:items-center gap-8 mb-8">
                    <div className="text-5xl md:text-7xl font-black text-foreground tracking-tighter">
                      {step.stat}
                    </div>
                    <p className="text-muted font-bold text-base md:text-xl leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </div>

                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: step.stat }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-accent shadow-[0_0_20px_#07b57e]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-24 md:mt-32 flex justify-center">
          <Link href="#pricing" className="w-full sm:w-auto">
            <button className="om-btn-primary w-full sm:w-auto group py-6 px-12 text-sm">
              View Plans & Pricing
              <ArrowRight className="w-5 h-5 ml-3 inline-block group-hover:translate-x-2 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
