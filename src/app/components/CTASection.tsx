'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Zap, Terminal } from 'lucide-react';
import KlaviyoForm from './KlaviyoForm';
import { TrustCards } from './TrustCards';

interface CTASectionProps {
    mode?: 'platform' | 'newsletter';
}

export function CTASection({ mode = 'platform' }: CTASectionProps) {
    return (
        <section id="cta" className="py-12 md:py-20 px-4 relative overflow-hidden bg-background">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent"></div>

            <div className="om-container relative z-10 text-center">


                <TrustCards />

                {mode === 'newsletter' ? (
                    <div className="max-w-xl mx-auto">
                        <div className="om-card-premium p-8 md:p-12 shadow-2xl relative overflow-hidden border-white/10">
                            {/* Trust Badge */}
                            <div className="flex items-center justify-center gap-4 mb-10">
                                <div className="flex -space-x-3 pointer-events-none">
                                    {['/newsletter/testimonials/female2.svg', '/newsletter/testimonials/male3.svg', '/newsletter/testimonials/female3.svg'].map((src, i) => (
                                        <div key={i} className="relative w-8 h-8 rounded-full border-2 border-[#121212] overflow-hidden bg-gray-800">
                                            <Image
                                                src={src}
                                                alt="Member"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-left flex flex-col justify-center">
                                    <div className="flex items-center gap-1 mb-0.5">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <svg key={s} className="w-2.5 h-2.5 text-[#f7d849] fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                        ))}
                                        <span className="text-[10px] text-muted/60 font-bold ml-1">Elite Community</span>
                                    </div>
                                    <p className="text-xs font-medium text-muted/80">
                                        Join <span className="text-white font-bold">34,000+</span> Winners
                                    </p>
                                </div>
                            </div>

                            <KlaviyoForm
                                buttonText="Stay Ahead - Join Now"
                                successMessage="✅ Welcome to the inner circle!"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto">
                        <p className="text-muted text-lg md:text-xl font-bold mb-12 leading-relaxed">
                            Stop guessing. Start executing institutional-grade models. Join the elite community of sharps who treat betting like a business.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="#pricing" className="om-btn-primary px-10 py-6 text-xs flex items-center justify-center gap-3 w-full sm:w-auto">
                                <Terminal className="w-5 h-5" />
                                VIEW ACCESS TIERS
                            </Link>
                            <Link href="/contact" className="bg-white/5 hover:bg-white/10 border border-white/10 px-10 py-6 rounded-2xl text-[10px] font-black uppercase tracking-widest text-foreground transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                                <Zap className="w-5 h-5 text-accent" />
                                GET CUSTOM QUOTE
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
