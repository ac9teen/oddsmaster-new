import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Calculator, PieChart, TrendingUp, Zap } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Betting Tools | OddsMaster',
    description: 'Professional-grade sports betting calculators and tools. Expected Value, Arbitrage, Kelly Criterion, and Odds Converters used by institutional bettors.',
};

const tools = [
    {
        title: 'Expected Value (+EV) Calculator',
        description: 'Calculate the true mathematical edge of your bets against the vig-free implied probability.',
        icon: <TrendingUp className="w-8 h-8" />,
        link: '/tools/ev-calculator',
        tag: 'Most Popular',
        color: 'from-accent to-[#047a54]'
    },
    {
        title: 'Arbitrage Calculator',
        description: 'Spot risk-free returns. Calculate exactly how much to stake on both sides of a line to guarantee profit.',
        icon: <PieChart className="w-8 h-8" />,
        link: '/tools/arbitrage-calculator',
        tag: 'Coming Soon',
        color: 'from-blue-500 to-indigo-600',
        disabled: true
    },
    {
        title: 'Kelly Criterion Sizer',
        description: 'Optimize your bankroll compounding using the same mathematical formula employed by hedge funds.',
        icon: <Calculator className="w-8 h-8" />,
        link: '/tools/kelly-criterion',
        tag: 'Coming Soon',
        color: 'from-yellow-400 to-orange-500',
        disabled: true
    },
    {
        title: 'Odds Converter',
        description: 'Instantly convert between American, Decimal, Fractional odds, and true implied probabilities.',
        icon: <Zap className="w-8 h-8" />,
        link: '/tools/odds-converter',
        tag: 'Coming Soon',
        color: 'from-purple-500 to-pink-600',
        disabled: true
    }
];

export default function ToolsDirectory() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/bg7.png')] bg-cover mix-blend-screen opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
            </div>

            <div className="om-container relative z-10 px-4 md:px-0">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="experts-header-tag mb-4">Quantitative Arsenal</div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tighter mb-6 uppercase">
                        Institutional <span className="text-accent">Betting</span> Tools
                    </h1>
                    <p className="text-muted text-lg md:text-xl font-medium leading-relaxed">
                        Stop guessing. Start mathing. Access the same free quantitative tools and calculators we use internally to structure our multi-million dollar betting syndicates.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-20">
                    {tools.map((tool, idx) => {
                        const Content = (
                            <div className={`om-card-premium p-8 h-full bg-card/40 border-white/5 backdrop-blur-md relative overflow-hidden group ${tool.disabled ? 'opacity-70 grayscale-[50%]' : 'hover:border-accent/40 transition-all duration-500 cursor-pointer'}`}>
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tool.color}`}></div>

                                <div className="flex justify-between items-start mb-8">
                                    <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex flex-shrink-0 items-center justify-center ${!tool.disabled && 'group-hover:scale-110 group-hover:bg-accent/10 group-hover:text-accent transition-all duration-500'}`}>
                                        {tool.icon}
                                    </div>
                                    <div className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                        {tool.tag}
                                    </div>
                                </div>

                                <h3 className={`text-xl md:text-2xl font-black mb-3.5 tracking-tight flex items-center gap-2 ${!tool.disabled && 'group-hover:text-accent transition-colors'}`}>
                                    {tool.title}
                                    {!tool.disabled && <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />}
                                </h3>
                                <p className="text-muted font-medium leading-relaxed">
                                    {tool.description}
                                </p>
                            </div>
                        );

                        if (tool.disabled) {
                            return <div key={idx}>{Content}</div>;
                        }

                        return (
                            <Link href={tool.link} key={idx} className="block w-full">
                                {Content}
                            </Link>
                        );
                    })}
                </div>

                {/* Call To Action Box */}
                <div className="max-w-4xl mx-auto bg-accent/5 border border-accent/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    {/* Pulsing background effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[500px] max-h-[500px] bg-accent/20 blur-[100px] rounded-full pointer-events-none"></div>

                    <h2 className="text-2xl md:text-3xl font-black italic tracking-tighter mb-4 relative z-10">
                        WANT TO SKIP THE MANUAL MATH?
                    </h2>
                    <p className="text-muted font-medium md:text-lg max-w-2xl mx-auto mb-8 relative z-10">
                        Why calculate edge manually when our algorithmic bots do it automatically 24/7 across every market? Join OddsMaster to get active +EV plays delivered straight to you.
                    </p>
                    <Link href="/#pricing" className="inline-block relative z-10">
                        <button className="om-btn-primary">
                            UNLOCK PRO SETUPS
                            <ArrowUpRight className="w-5 h-5 ml-2 inline-block" />
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
