'use client';

import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
            <Header />

            <main className="flex-grow pt-32 pb-24 px-4 overflow-hidden">
                <div className="om-container max-w-3xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="mb-12 italic text-center">Terms of <span className="text-secondary">Service</span></h1>

                        <div className="om-card-premium p-8 md:p-12 space-y-8 text-muted font-bold leading-relaxed">
                            <section className="space-y-4">
                                <h2 className="text-xl text-foreground italic uppercase">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing the OddsMaster Intelligence platform, you agree to be bound by these terms. Our software is designed for strategic capital allocation and predictive modeling in sports markets.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl text-foreground italic uppercase">2. Use License</h2>
                                <p>
                                    Permission is granted to access the models and data for personal or institutional use according to your subscription tier. This is a license, not a transfer of title, and usage must strictly follow professional auditing standards.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl text-foreground italic uppercase">3. Risk Disclosure</h2>
                                <p>
                                    Predictive modeling involves secondary market risk. OddsMaster is a data tool; ultimate capital deployment decisions and risk management remain the responsibility of the operator. Institutional compounding requires strict adherence to sizing protocols.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl text-foreground italic uppercase">4. Strategic Integrity</h2>
                                <p>
                                    Reverse engineering of proprietary AI models or unauthorized distribution of private signals is strictly prohibited and will result in immediate termination of institutional access.
                                </p>
                            </section>

                            <div className="pt-8 border-t border-white/5 text-[10px] uppercase tracking-widest text-center">
                                Governing Jurisdiction: Dubai DIFC
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
