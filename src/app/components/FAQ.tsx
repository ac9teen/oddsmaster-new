'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function FAQ() {
  const faqs = [
    {
      question: "How accurate are OddsMaster predictions?",
      answer: "Our models combine historical data, live odds, and AI forecasting to deliver high-probability insights. While no betting system can guarantee wins, our goal is to maximise long-term profitability and reduce risk."
    },
    {
      question: "Is OddsMaster suitable for beginners?",
      answer: "Yes. Our Starter Edge plan is designed for new users with simplified insights and guided recommendations to help you make smarter betting decisions confidently."
    },
    {
      question: "Do you support live betting?",
      answer: "Absolutely. OddsMaster provides real-time signals and live market analysis for supported sports, helping you react quickly to changing odds."
    },
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, all plans are flexible and can be upgraded, downgraded, or cancelled at any time with no long-term commitments."
    },
    {
      question: "Is my data secure?",
      answer: "Yes. We use industry-standard encryption and secure data protocols to ensure your betting data and account information remain protected at all times."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-12 md:py-20 bg-background text-foreground relative overflow-hidden transition-colors duration-300">
      {/* Background Texture with Warp Drift */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 dark:opacity-20 overflow-hidden">
        <img src="/bg5.png" alt="" className="w-full h-full object-cover mix-blend-overlay animate-warp-drift" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>

      <div className="om-container relative z-10">
        <div className="text-center mb-12">
          <div className="experts-header-tag">Common Questions</div>
          <h2 className="mb-8 italic">
            Everything you <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#f7d849] to-[#f59e0b]">need to know</span>
          </h2>
          <p className="text-muted font-bold max-w-2xl mx-auto px-4 md:px-0">
            Common questions about our AI models and how to get started with smarter betting decisions.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-card/80 backdrop-blur-xl border rounded-[24px] overflow-hidden transition-all duration-500 ${openIndex === i ? 'border-accent/50 shadow-[0_0_30px_rgba(7,181,126,0.1)]' : 'border-card-border'
                }`}
            >
              <button
                className="w-full p-6 md:p-8 text-left flex items-center justify-between hover:bg-foreground/[0.02] transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${openIndex === i ? 'bg-accent shadow-[0_0_10px_#07b57e]' : 'bg-foreground/20'
                    }`}></div>
                  <span className={`font-black uppercase tracking-tight transition-colors text-[11px] md:text-sm ${openIndex === i ? 'text-accent' : 'text-foreground'
                    }`}>{faq.question}</span>
                </div>
                <div className={`transition-transform duration-500 ${openIndex === i ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-muted/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 pt-0 ml-8 text-muted font-bold leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
