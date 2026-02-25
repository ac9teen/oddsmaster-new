'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Flexibility() {
  const benefits = [
    {
      title: "Adaptive Scaling",
      description: "Increase or reduce strategy intensity based on market activity and your bankroll.",
      image: "/B1.svg"
    },
    {
      title: "Instant Adjustments",
      description: "Switch strategies or refine parameters anytime — no penalties.",
      image: "/B2.svg"
    },
    {
      title: "No long-term Pressure",
      description: "Stay month-to-month with full control and zero lock-ins.",
      image: "/B3.svg"
    },
    {
      title: "Direct Ownership",
      description: "If you want full control, we offer a buy-out option for exclusive strategy rights.",
      image: "/B4.svg"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-[#f7d849] text-black relative overflow-hidden transition-colors duration-300">
      <div className="om-container relative z-10">

        {/* Header - Left Aligned but centered on mobile */}
        <div className="max-w-4xl mb-8 md:mb-12 text-center md:text-left mx-auto md:mx-0">
          <h2 className="mb-6 italic text-black">
            Guaranteed flexibility for <br />
            your evolving <span className="text-black/80 decoration-black/30 underline decoration-4 underline-offset-4">betting goals</span>
          </h2>
          <p className="text-black/80 font-bold max-w-3xl leading-relaxed mx-auto md:mx-0">
            OddsMaster operates on a flexible monthly plan, ensuring you only pay for insights and tools you actively use.
          </p>
        </div>

        {/* Benefits Grid - Separated by lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 mb-8 border-t border-black/5">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`pt-12 pb-8 md:px-8 border-b lg:border-b-0 border-black/5 transition-all duration-300 group flex flex-col items-center md:items-start text-center md:text-left ${i < 3 ? 'lg:border-r lg:border-black/5' : ''
                }`}
            >
              <div className="mb-10 w-40 h-40 group-hover:scale-110 transition-transform duration-700 md:origin-left flex items-center justify-center">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-contain mix-blend-darken grayscale contrast-[5] brightness-[1.2]"
                />
              </div>
              <h3 className="mb-4 uppercase tracking-tight text-black">{benefit.title}</h3>
              <p className="text-black/80 leading-relaxed font-bold">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
