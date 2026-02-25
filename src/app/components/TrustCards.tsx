'use client';

import React from 'react';
import LottieIcon from './LottieIcon';
import { motion } from 'framer-motion';

export function TrustCards() {
    const cards = [
        {
            title: "Smart Assets",
            description: "Turn bets into a portfolio.",
            lottie: "/lottie/Dollar Symbol.json"
        },
        {
            title: "AI Advantage",
            description: "Machine learning finds your edge.",
            lottie: "/lottie/Multi Cluster.json"
        },
        {
            title: "No Secrets",
            description: "Straight facts. No fluff.",
            lottie: "/lottie/Partnership.json"
        },
        {
            title: "Safe Accounts",
            description: "Protection against bans & limits.",
            lottie: "/lottie/Shield.json"
        }
    ];

    return (
        <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-lg mx-auto mb-12 md:mb-16 px-4 md:px-0">
            {cards.map((card, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-accent rounded-[24px] md:rounded-[32px] p-5 md:p-8 text-center flex flex-col items-center justify-center shadow-xl border border-white/20 group hover:translate-y-[-8px] transition-all duration-500 relative overflow-hidden"
                >
                    {/* Subtle Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="mb-4 relative z-10 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                        <LottieIcon
                            src={card.lottie}
                            width={80}
                            height={80}
                            className="group-hover:scale-110 transition-transform duration-700 filter brightness-0 invert"
                        />
                    </div>

                    <div className="relative z-10">
                        <h4 className="text-white font-black text-sm md:text-base uppercase tracking-tight mb-2">
                            {card.title}
                        </h4>
                        <p className="text-white/90 text-[10px] md:text-sm font-bold leading-tight max-w-[140px] mx-auto opacity-80 group-hover:opacity-100 transition-opacity">
                            {card.description}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
