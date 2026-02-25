'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function GettingStarted() {
  const steps = [
    {
      number: "01",
      title: "Select Your Plan",
      badge: "Market Entry",
      description: "Choose the performance tier that matches your current bankroll and risk appetite.",
      image: "/A1.svg"
    },
    {
      number: "02",
      title: "Secure Verification",
      badge: "Quality Control",
      description: "Join our private network and gain access to real-time consolidated machine intelligence.",
      image: "/A2.svg"
    },
    {
      number: "03",
      title: "Scale Your Capital",
      badge: "Alpha Generation",
      description: "Deploy our high-conviction strategies and watch your portfolio reach institutional levels.",
      image: "/A3.svg"
    }
  ];

  return (
    <section id="getting-started" className="py-12 md:py-20 bg-[#f7d849] text-black relative overflow-hidden transition-colors duration-300">
      <div className="om-container relative z-10">
        {/* Heading */}
        <div className="text-center mb-12 px-4 md:px-0">
          <h2 className="mb-4 italic text-black">
            Getting started with <span className="text-black/80 decoration-black/30 underline decoration-4 underline-offset-4">OddsMaster</span> takes days, not weeks
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4 mb-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center text-center w-full max-w-[400px] md:max-w-[300px] relative group"
            >
              {/* Illustration with Number Overlay */}
              <div className="relative mb-8 md:mb-12 w-full aspect-square max-w-[280px] md:max-w-none flex items-center justify-center">
                <span className="absolute top-0 md:-top-6 left-0 md:-left-12 text-7xl md:text-[180px] font-black text-black/10 select-none z-0 transition-all duration-700 group-hover:text-black/20 group-hover:-translate-y-2">
                  {step.number}
                </span>
                <div className="relative z-10 transition-transform duration-700 group-hover:scale-110 w-40 h-40 md:w-56 md:h-56 flex items-center justify-center">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-contain mix-blend-darken grayscale contrast-[5] brightness-[1.2]"
                  />
                </div>
              </div>

              {/* Text Content */}
              <h3 className="mb-2 uppercase tracking-tight text-black">{step.title}</h3>
              <span className="text-black/90 font-black text-[10px] md:text-xs mb-4 uppercase tracking-widest">{step.badge}</span>
              <p className="text-black/70 font-bold leading-relaxed px-4 md:px-0">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
