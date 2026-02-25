import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function SwipeIndicator() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-8 animate-pulse opacity-80">
            <div className="flex items-center gap-6 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-foreground/70">
                <ArrowLeft className="w-4 h-4 text-accent" />
                <span className="whitespace-nowrap italic">Swipe to explore</span>
                <ArrowRight className="w-4 h-4 text-accent" />
            </div>
            <div className="w-24 h-1 bg-accent/20 rounded-full overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 w-1/3 bg-accent rounded-full animate-swipe-pill"></div>
            </div>
            <style jsx>{`
                @keyframes swipe-pill {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(300%); }
                }
                .animate-swipe-pill {
                    animation: swipe-pill 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

