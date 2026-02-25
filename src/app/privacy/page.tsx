'use client';

import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
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
                        <h1 className="mb-12 italic text-center">Privacy <span className="text-accent">Policy</span></h1>

                        <div className="om-card-premium p-8 md:p-12 space-y-8 text-muted font-bold leading-relaxed">
                            <section className="space-y-4">
                                <h2 className="text-xl text-foreground italic uppercase">1. Information Collection</h2>
                                <p>
                                    OddsMaster Intelligence collects minimal personal data necessary to provide institutional-grade predictive analytics. This includes information provided during registration and configuration of model access.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl text-foreground italic uppercase">2. Use of Data</h2>
                                <p>
                                    Your data is used exclusively to maintain your account, personalize your dashboard experience, and deliver high-precision market alerts. We do not sell user data to third-party sportsbooks or marketing agencies.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl text-foreground italic uppercase">3. Security Framework</h2>
                                <p>
                                    We implement institutional-grade encryption and security protocols to protect your strategic data and account integrity. Our systems are designed to ensure maximum uptime and data privacy.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl text-foreground italic uppercase">4. Cookies & Analytics</h2>
                                <p>
                                    OddsMaster uses technical cookies to ensure the proper functionality of the dynamic UI and to monitor model performance metrics. No identifying data is sold to advertising networks.
                                </p>
                            </section>

                            <div className="pt-8 border-t border-white/5 text-[10px] uppercase tracking-widest text-center">
                                Last Updated: January 2026
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
