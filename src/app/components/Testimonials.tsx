'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    quote: string;
    avatar: string;
}

const platformTestimonials: Testimonial[] = [
    {
        id: 1,
        name: "Michael R.",
        role: "Core System Member",
        quote: "ROI is up over 400% since joining. The AI models are scary accurate—it feels unfair to the books.",
        avatar: "/testimonials/male1.svg"
    },
    {
        id: 2,
        name: "Sarah J.",
        role: "Pro Edge Subscriber",
        quote: "Finally, a platform that treats betting like equities. No 'gut feelings', just cold, hard data.",
        avatar: "/testimonials/female1.svg"
    },
    {
        id: 3,
        name: "David K.",
        role: "Portfolio Manager",
        quote: "Access to prediction markets changed my entire strategy. The arbitrage plays alone paid for the subscription.",
        avatar: "/testimonials/male2.svg"
    },
    {
        id: 4,
        name: "Elena T.",
        role: "Quantitative Analyst",
        quote: "The variance neutralization engine is a game changer. I've never seen risk management this sophisticated.",
        avatar: "/testimonials/female2.svg"
    },
    {
        id: 5,
        name: "James P.",
        role: "High-Volume Bettor",
        quote: "I used to grind for hours. Now I just execute the signals. Efficiency is through the roof.",
        avatar: "/testimonials/male3.svg"
    }
];

const newsletterTestimonials: Testimonial[] = [
    {
        id: 1,
        name: "Michael R.",
        role: "Daily Reader",
        quote: "Clear, concise, and profitable. It’s the best 5 minutes of my morning routine.",
        avatar: "/testimonials/male1.svg"
    },
    {
        id: 2,
        name: "Sarah J.",
        role: "Subscriber",
        quote: "The only email I actually look forward to. Smarter than ESPN, sharper than my bookie.",
        avatar: "/testimonials/female1.svg"
    },
    {
        id: 3,
        name: "David K.",
        role: "finance Pro",
        quote: "The free alpha in here is worth thousands. It's rare to find this level of insight for free.",
        avatar: "/testimonials/male2.svg"
    },
    {
        id: 4,
        name: "Elena T.",
        role: "Data Scientist",
        quote: "No fluff, no hype. Just straight quantitative facts that help me beat the lines.",
        avatar: "/testimonials/female2.svg"
    },
    {
        id: 5,
        name: "James P.",
        role: "Sharps Community",
        quote: "Simple, data-driven, and no BS. If you aren't reading this, you're betting blind.",
        avatar: "/testimonials/male3.svg"
    }
];

interface TestimonialsProps {
    mode?: 'platform' | 'newsletter';
}

export function Testimonials({ mode = 'platform' }: TestimonialsProps) {
    const data = mode === 'platform' ? platformTestimonials : newsletterTestimonials;
    const title = mode === 'platform' ? "The Community Wins" : "Reader Love";
    const subtitle = mode === 'platform' ? "Results speak louder than words." : "Join the smartest inbox in betting.";

    return (
        <section className="py-12 md:py-20 bg-background relative overflow-hidden">
            <div className="om-container relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black italic mb-6 text-foreground tracking-tighter leading-none">
                        {mode === 'platform' ? (
                            <>
                                What the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7d849] via-[#fff5b8] to-[#f59e0b] bg-[length:200%_auto] animate-shimmer">Sharps</span> Say
                            </>
                        ) : (
                            <>
                                Love letters to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7d849] to-[#f59e0b]">OddsMaster</span>
                            </>
                        )}
                    </h2>
                    <p className="text-muted font-bold tracking-wide uppercase text-xs md:text-sm">{subtitle}</p>
                </div>

                {/* Marquee / Scroll Container */}
                <div className="relative w-full">
                    <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-6 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide px-4 md:px-0">
                        {data.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="min-w-[280px] md:min-w-0 snap-center flex flex-col items-center text-center p-6 md:p-8 bg-card border border-card-border rounded-[32px] hover:border-accent/30 transition-all duration-300 group"
                            >
                                <div className="relative w-16 h-16 mb-6 rounded-full overflow-hidden border-2 border-accent/20 group-hover:border-accent group-hover:scale-110 transition-all duration-500">
                                    <Image
                                        src={item.avatar}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <p className="text-foreground/90 font-medium italic leading-relaxed mb-6 text-sm md:text-base">
                                    &quot;{item.quote}&quot;
                                </p>

                                <div className="mt-auto">
                                    <div className="font-black text-foreground uppercase tracking-wider text-xs">{item.name}</div>
                                    <div className="text-[10px] text-accent font-bold uppercase tracking-widest mt-1">{item.role}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Fade Edges */}
                    <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent md:hidden pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent md:hidden pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
}
