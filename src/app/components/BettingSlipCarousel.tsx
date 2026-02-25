'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, TrendingUp, DollarSign, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import SwipeIndicator from './SwipeIndicator';
import Image from 'next/image';

interface BettingSlip {
    id: number;
    image: string;
    alt: string;
    platform: string;
    platformLogo: string;
    payout: string;
    return: string;
    stake: string;
    type: string;
    color: string;
}

const slips: BettingSlip[] = [
    {
        id: 1,
        image: '/Kalshi.png',
        alt: 'Kalshi Prediction Win',
        platform: 'Kalshi',
        platformLogo: '/kaalshinew.svg',
        payout: '$45,838.03',
        return: '330x ROI',
        stake: '$139',
        type: 'Prediction Market',
        color: '#00d588'
    },
    {
        id: 2,
        image: '/Polymarket.gif',
        alt: 'Polymarket Profit',
        platform: 'Polymarket',
        platformLogo: '/Polymarket.png',
        payout: '$35,500.10',
        return: 'Portfolio Growth',
        stake: 'Capital Allocation',
        type: 'Arbitrage Strategy',
        color: '#0066ff'
    },
    {
        id: 3,
        image: '/SLIP2LATEST.png',
        alt: 'Parimatch Winning Slip',
        platform: '1xBet',
        platformLogo: '/1x.svg',
        payout: '₹64,549',
        return: '22.0x ROI',
        stake: '₹2,800',
        type: 'High-Alpha Parlay',
        color: '#f7d849'
    },
    {
        id: 4,
        image: '/SLIP1LATEST.png',
        alt: 'Fanatics Sportsbook Win',
        platform: 'Fanatics',
        platformLogo: '/s1.png',
        payout: '$1,413.00',
        return: '14.1x ROI',
        stake: '$100',
        type: 'Multi-Leg Strategy',
        color: '#ff4b4b'
    },
    {
        id: 5,
        image: '/SLIP3LATEST.png',
        alt: 'Stake Winning Slip',
        platform: 'Stake',
        platformLogo: '/f3.png',
        payout: '$1,411.00',
        return: '3.3x ROI',
        stake: '$420',
        type: 'Market Signal',
        color: '#ffffff'
    }
];

export default function BettingSlipCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => (prev + newDirection + slips.length) % slips.length);
    }, []);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95,
        })
    };

    const SlipCard = ({ slip }: { slip: BettingSlip }) => (
        <div className="flex flex-col bg-[#050505] border border-white/5 rounded-[40px] overflow-hidden group shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] transition-all duration-700 hover:border-accent/20 h-full">
            {/* Image Container - Clean Mockup View */}
            <div className="relative pt-6 px-6 flex justify-center bg-transparent overflow-hidden h-[320px] md:h-[380px] shrink-0">
                <div className="relative w-full max-w-[320px] transition-transform duration-1000 group-hover:scale-105 group-hover:-rotate-1 h-full flex items-end">
                    <Image
                        src={slip.image}
                        alt={slip.alt}
                        width={320}
                        height={420}
                        className="w-full h-auto object-contain max-h-full select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
                    />
                </div>
                {/* Gradient Fades for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Area - Compact & Elegant */}
            <div className="p-6 md:p-8 flex flex-col gap-6 relative z-10 flex-grow justify-between">
                {/* Stats Header */}
                <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent/80">Net Extraction</span>
                        </div>
                        <div className="px-3 py-1.5 bg-accent/10 rounded-full border border-accent/10 flex items-center gap-2">
                            <TrendingUp className="w-3 h-3 text-accent" />
                            <span className="text-[10px] font-black text-accent uppercase tracking-wider">{slip.return}</span>
                        </div>
                    </div>

                    <div className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-black italic tracking-tighter text-[#f7d849] leading-none drop-shadow-[0_0_15px_rgba(247,216,73,0.3)]">
                        {slip.payout}
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/5" />

                {/* Validation Row */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-5">
                        {/* Logo - Free & Large */}
                        <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                            <Image
                                src={slip.platformLogo}
                                alt={slip.platform}
                                fill
                                className="object-contain opacity-80 group-hover:opacity-100 transition-opacity filter brightness-0 invert"
                                sizes="56px"
                            />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck className="w-3 h-3 text-accent" />
                                <span className="text-[9px] font-bold text-accent/70 uppercase tracking-wider leading-none">Verified</span>
                            </div>
                            <h4 className="text-sm md:text-base font-black uppercase tracking-tight text-foreground leading-none">
                                {slip.platform}
                            </h4>
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-bold text-foreground/30 uppercase tracking-wider mb-1">Strategy</span>
                        <span className="text-xs md:text-sm font-black italic text-[#f7d849] uppercase tracking-wide text-right">{slip.stake}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    if (isMobile) {
        return (
            <div className="w-full py-8 relative">
                <div className="flex items-center justify-between mb-8 px-4">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-[10px] font-black text-accent uppercase tracking-[0.4em]">Live Verification</span>
                        </div>
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter line-height-1">Validated <span className="text-accent">Returns</span></h3>
                    </div>
                </div>

                <div className="relative overflow-hidden px-4">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="w-full touch-pan-y"
                        >
                            <SlipCard slip={slips[currentIndex]} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <SwipeIndicator />

                <div className="flex justify-center gap-3 mt-6">
                    {slips.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setDirection(i > currentIndex ? 1 : -1);
                                setCurrentIndex(i);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-10 bg-accent' : 'w-3 bg-white/10'}`}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full py-12 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
                {slips.map((slip, i) => (
                    <motion.div
                        key={slip.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                        className="w-full h-full"
                    >
                        <SlipCard slip={slip} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
