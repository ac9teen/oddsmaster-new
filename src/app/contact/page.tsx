'use client';

import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Send, Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
            <Header />

            <main className="flex-grow pt-32 pb-24 px-4 overflow-hidden">
                <div className="om-container max-w-6xl relative">
                    {/* Background Ambience */}
                    <div className="absolute top-0 -left-1/4 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
                        {/* Left: Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="experts-header-tag mb-8 uppercase tracking-widest">Connect with Intelligence</div>
                            <h1 className="mb-8 italic leading-none text-4xl md:text-5xl lg:text-6xl tracking-tighter">
                                Institutional <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#f7d849] to-[#f59e0b]">Support</span> & Inquiries
                            </h1>
                            <p className="text-muted font-bold text-lg leading-relaxed mb-12 max-w-xl">
                                Whether you're looking for custom strategy integration, institutional capital deployment, or technical support, our specialized team is ready to assist.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { icon: Send, label: 'Official Telegram', value: '@oddsmasterwins', href: 'https://t.me/oddsmasterwins' },
                                    { icon: Mail, label: 'Email Support', value: 'hello@oddsmaster.vip', href: 'mailto:hello@oddsmaster.vip' },
                                    { icon: MapPin, label: 'Headquarters', value: 'Dubai International Financial Centre', href: '#' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-6 group">
                                        <div className="w-14 h-14 rounded-2xl bg-card border border-card-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-xl">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-muted mb-1 opacity-50">{item.label}</div>
                                            <a href={item.href} className="text-xl font-black italic hover:text-accent transition-colors">{item.value}</a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-16 p-8 rounded-[32px] bg-accent/5 border border-accent/20 relative overflow-hidden">
                                <div className="relative z-10 flex gap-4 items-center">
                                    <MessageSquare className="w-8 h-8 text-accent shrink-0" />
                                    <p className="text-sm font-bold leading-relaxed italic text-muted/80">
                                        "Our priority is capital preservation and strategic scaling. Expect a response from our institutional desk within 12–24 business hours."
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="om-card-premium p-8 md:p-12 bg-card/60 backdrop-blur-2xl">
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted pl-4">Full Name</label>
                                            <input type="text" placeholder="John Doe" className="om-input" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted pl-4">Email Address</label>
                                            <input type="email" placeholder="john@example.com" className="om-input" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted pl-4">Subject</label>
                                        <select className="om-input appearance-none bg-card">
                                            <option>General Inquiry</option>
                                            <option>Institutional Access</option>
                                            <option>Technical Support</option>
                                            <option>Partnership Proposal</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted pl-4">Message</label>
                                        <textarea rows={5} placeholder="How can we assist your deployment?" className="om-input resize-none pt-4"></textarea>
                                    </div>

                                    <button className="om-btn-primary w-full py-5 text-xs tracking-[0.3em] mt-4 shadow-[0_15px_30px_rgba(7,181,126,0.3)] hover:shadow-[0_20px_40px_rgba(7,181,126,0.5)] flex items-center justify-center gap-3 relative overflow-hidden group/btn">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-sweep"></div>
                                        <Send className="w-5 h-5 opacity-70" />
                                        Send Transmission
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
