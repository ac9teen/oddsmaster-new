'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export function CallToAction() {
    return (
        <section id="cta" className="py-12 md:py-20 px-4 relative overflow-hidden bg-background">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent"></div>

            <div className="om-container relative z-10 text-center">
                <div className="mb-12 md:mb-20">
                    <h2 className="text-4xl md:text-8xl font-black italic mb-4 tracking-tighter leading-none text-foreground uppercase">
                        It&apos;s Not A <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#f7d849] to-[#f59e0b]">Gamble</span>
                    </h2>
                    <h3 className="text-lg md:text-3xl text-accent font-black uppercase tracking-[0.3em] italic">
                        if you know what we know 😉
                    </h3>
                </div>

                <div className="max-w-2xl mx-auto">
                    <p className="text-muted text-lg md:text-xl font-bold mb-12 leading-relaxed">
                        Stop guessing. Start executing institutional-grade models. Join the elite community of sharps who treat betting like a business.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="#pricing" className="om-btn-primary px-10 py-6 text-xs flex items-center justify-center gap-3">
                            <Terminal className="w-5 h-5" />
                            VIEW ACCESS TIERS
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
