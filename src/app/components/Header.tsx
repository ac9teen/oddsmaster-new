'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LogoGlyph } from './LogoGlyph';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 lg:p-8">
            <header className="relative w-full max-w-[1200px] bg-black/90 backdrop-blur-md h-[60px] md:h-[72px] flex items-center justify-between px-6 md:px-8 border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.5)] rounded-2xl md:rounded-[24px] transition-all duration-500 hover:border-[#07b57e]/30 group/header">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 md:gap-3 group">
                    <div className="relative flex items-center justify-center">
                        <LogoGlyph />
                    </div>
                    <div className="relative h-7 md:h-9 w-[140px] md:w-[180px]">
                        <Image
                            src="/oddmasterlogowhite_text.svg"
                            alt="ODDSMASTER"
                            fill
                            className="object-contain object-left"
                            priority
                            sizes="(max-width: 768px) 140px, 180px"
                        />
                    </div>
                </Link>

                <nav className="hidden lg:flex items-center gap-6 xl:gap-10 absolute left-1/2 -translate-x-1/2">
                    <Link href="/" className="text-foreground/60 hover:text-accent transition-all text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap relative group/link">
                        Home
                        <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover/link:w-full"></span>
                    </Link>
                    <Link href="https://www.oddsmaster.vip/newsletter" className="text-foreground/60 hover:text-accent transition-all text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap relative group/link">
                        Newsletter
                        <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover/link:w-full"></span>
                    </Link>
                    <Link href="/blogs" className="text-foreground/60 hover:text-accent transition-all text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap relative group/link">
                        Blogs
                        <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover/link:w-full"></span>
                    </Link>
                    <Link href="/#models" className="text-foreground/60 hover:text-accent transition-all text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap relative group/link">
                        AI Models
                        <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover/link:w-full"></span>
                    </Link>
                    <Link href="/#about" className="text-foreground/60 hover:text-accent transition-all text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap relative group/link">
                        Transparency
                        <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover/link:w-full"></span>
                    </Link>
                    <Link href="/contact" className="text-foreground/60 hover:text-accent transition-all text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap relative group/link">
                        Contact
                        <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover/link:w-full"></span>
                    </Link>
                </nav>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-6 xl:gap-8 ml-auto">
                    <Link href="/#pricing" onClick={(e) => {
                        if (typeof window !== 'undefined' && window.location.pathname === '/') {
                            e.preventDefault();
                            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}>
                        <button className="bg-[#07b57e] text-white px-8 h-12 font-black text-[11px] uppercase tracking-[0.2em] rounded-full shadow-[0_8px_16px_rgba(7,181,126,0.2)] hover:shadow-[0_12px_24px_rgba(7,181,126,0.4)] hover:-translate-y-0.5 transition-all">
                            View Plans
                        </button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden text-foreground p-1 flex items-center ml-auto" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-background border border-card-border p-6 flex flex-col gap-5 lg:hidden shadow-[6px_6px_0px_0px_#07b57e] rounded-2xl z-[100] animate-in fade-in zoom-in-95 duration-200">
                        <Link href="/" className="text-foreground text-lg font-black uppercase tracking-wider border-b border-card-border pb-3 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Home
                        </Link>
                        <Link href="https://www.oddsmaster.vip/newsletter" className="text-foreground text-lg font-black uppercase tracking-wider border-b border-card-border pb-3 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                            VIP Newsletter
                        </Link>
                        <Link href="/blogs" className="text-foreground text-lg font-black uppercase tracking-wider border-b border-card-border pb-3 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Blogs
                        </Link>
                        <Link href="/#models" className="text-foreground text-lg font-black uppercase tracking-wider border-b border-card-border pb-3 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                            AI Models
                        </Link>
                        <Link href="/#about" className="text-foreground text-lg font-black uppercase tracking-wider border-b border-card-border pb-3 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Transparency
                        </Link>
                        <Link href="/contact" className="text-foreground text-lg font-black uppercase tracking-wider border-b border-card-border pb-3 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Contact Us
                        </Link>
                        <div className="flex flex-col gap-3 pt-2">
                            <Link href="/#pricing" onClick={(e) => {
                                setIsMenuOpen(false);
                                if (typeof window !== 'undefined' && window.location.pathname === '/') {
                                    e.preventDefault();
                                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}>
                                <button className="w-full bg-[#07b57e] text-white py-4 px-6 font-black text-xs uppercase tracking-[0.2em] shadow-[3px_3px_0px_0px_black] dark:shadow-[3px_3px_0px_0px_white]">
                                    View Plans & Pricing
                                </button>
                            </Link>
                            <a href="https://t.me/oddsmasterwins" target="_blank" onClick={() => setIsMenuOpen(false)}>
                                <button className="w-full bg-[#f7d849] text-black py-4 px-6 font-black text-xs uppercase tracking-[0.2em] shadow-[3px_3px_0px_0px_black] dark:shadow-[3px_3px_0px_0px_white]">
                                    Join Telegram Group
                                </button>
                            </a>
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
}
