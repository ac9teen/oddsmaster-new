'use client';

import React, { useState } from 'react';
import { HelpCircle, Send, Shield, Sparkles, AlertCircle, TrendingUp, Info, Zap, ShieldCheck, Target, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const PricingCard = ({ plan, i }: { plan: any, i: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      className={`flex flex-col w-full rounded-[32px] lg:rounded-[40px] transition-all duration-500 relative group overflow-hidden ${plan.highlight
        ? 'bg-card/60 backdrop-blur-2xl border-2 border-accent shadow-[0_0_50px_rgba(7,181,126,0.15)] z-20 scale-[1.02] lg:scale-105'
        : 'bg-card/30 backdrop-blur-xl border border-card-border hover:bg-card/40'
        }`}
    >
      {/* Vibrant Gradient Back-glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-40 group-hover:opacity-70 transition-opacity duration-700`}></div>

      {plan.popular && (
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_20px_rgba(7,181,126,1)]"></div>
      )}

      <div className="p-8 md:p-10 flex flex-col h-full relative z-10">
        {/* Card Type Header */}
        <div className="text-left mb-8">
          <div className="flex justify-between items-start mb-4">
            <div className="inline-flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${plan.highlight ? 'bg-accent animate-pulse shadow-[0_0_8px_#07b57e]' : 'bg-muted/30'}`}></span>
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${plan.highlight ? 'text-accent' : 'text-muted'}`}>
                {plan.type}
              </span>
            </div>
            {plan.tag && (
              <span className={`text-[8px] font-black uppercase tracking-widest bg-white/5 px-2 py-1 rounded border border-white/10 ${plan.highlight ? 'text-accent border-accent/20' : 'text-muted'}`}>
                {plan.tag}
              </span>
            )}
          </div>
          <h3 className="text-3xl font-black italic mb-2 text-foreground tracking-tighter uppercase">{plan.name}</h3>
          <div className={`h-1 w-16 transition-all duration-700 ${plan.highlight ? 'w-full bg-accent/40' : 'bg-card-border group-hover:w-full group-hover:bg-white/10'}`}></div>
        </div>

        {/* Price Section */}
        <div className="text-left mb-6">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#f7d849] via-[#fff5b8] to-[#f59e0b] bg-[length:200%_auto] animate-shimmer">
              {plan.price}
            </span>
            {plan.oldPrice && (
              <span className="text-muted/50 text-xl font-black line-through">{plan.oldPrice}</span>
            )}
            <span className="text-muted text-[12px] font-black uppercase tracking-widest opacity-40">{plan.period}</span>
          </div>

          {/* Multiplier/Target Badge */}
          <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl border-2 transition-all duration-500 ${plan.highlight
            ? 'bg-accent text-white border-accent/20 shadow-[0_0_30px_rgba(7,181,126,0.2)]'
            : 'bg-white/5 border-white/5 text-muted group-hover:border-white/10 group-hover:bg-white/10'
            }`}>
            <TrendingUp className={`w-4 h-4 ${plan.highlight ? 'text-white' : 'text-accent'}`} />
            <div className="flex flex-col items-start translate-y-[1px]">
              <span className="text-[14px] font-black leading-none tracking-tight">{plan.multiplier}</span>
              <span className="text-[7px] font-black tracking-[0.2em] opacity-60 uppercase">Expected Outcome</span>
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden w-full flex items-center justify-between text-xs font-black uppercase tracking-widest text-muted/70 hover:text-accent transition-colors mb-6 py-2 border-b border-white/5"
        >
          <span>{isExpanded ? 'Hide Details' : 'See all features'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Collapsible Content */}
        <div className={`${isExpanded ? 'block' : 'hidden'} lg:block lg:h-full lg:flex lg:flex-col`}>
          {/* Caveat Alert */}
          <div className={`mb-8 p-4 rounded-2xl border text-left flex gap-3 ${plan.highlight ? 'bg-accent/5 border-accent/20' : 'bg-white/5 border-white/5'}`}>
            <AlertCircle className={`w-5 h-5 shrink-0 ${plan.highlight ? 'text-accent' : 'text-muted'}`} />
            <p className="text-[10px] font-bold leading-relaxed text-muted/80 italic">
              {plan.caveat}
            </p>
          </div>

          {/* Expectation / Who it For */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-background/40 rounded-xl p-4 border border-white/5">
              <div className="text-[7px] font-black text-muted uppercase tracking-[0.2em] mb-1 opacity-50">Expectation</div>
              <div className="text-[11px] font-black text-[#f7d849] italic">{plan.expectation}</div>
            </div>
            <div className="bg-background/40 rounded-xl p-4 border border-white/5">
              <div className="text-[7px] font-black text-muted uppercase tracking-[0.2em] mb-1 opacity-50">Ideal For</div>
              <div className="text-[9px] font-black text-foreground italic leading-tight">{plan.forWhom}</div>
            </div>
          </div>

          {/* Features List */}
          <div className="flex-grow space-y-3 mb-8 text-left">
            {plan.features.map((feature: any, idx: number) => (
              <div key={idx} className="flex items-start gap-3 group/feature cursor-default">
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${feature.startsWith('❌')
                  ? 'bg-red-500/10 text-red-500/50'
                  : plan.highlight ? 'bg-accent/20 text-accent' : 'bg-white/5 text-muted'
                  }`}>
                  {feature.startsWith('❌') ? <Info className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                </div>
                <span className={`text-[12px] font-bold leading-snug transition-colors ${feature.startsWith('❌') ? 'text-muted/40' : 'text-muted/70 group-hover/feature:text-foreground'}`}>
                  {feature.replace('❌ ', '')}
                </span>
              </div>
            ))}
          </div>

          {/* Supported Venues Small Icons */}
          <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/5">
            <div className="text-[7px] font-black text-muted uppercase tracking-[0.2em] mb-3 opacity-40">Supported Execution Venues</div>
            <div className="flex flex-wrap gap-4 items-center">
              {i === 0 && (
                <>
                  <div className="relative w-10 h-4 transition-all opacity-60 hover:opacity-100 grayscale hover:grayscale-0 brightness-0 invert"><Image src="/bet365.png" alt="365" fill className="object-contain" /></div>
                  <div className="relative w-10 h-4 transition-all opacity-60 hover:opacity-100 brightness-0 invert"><Image src="/fanduel.svg" alt="FD" fill className="object-contain" /></div>
                  <div className="relative w-10 h-4 transition-all opacity-60 hover:opacity-100 grayscale hover:grayscale-0 brightness-0 invert"><Image src="/Polymarket.png" alt="Poly" fill className="object-contain" /></div>
                </>
              )}
              {i === 1 && (
                <>
                  <div className="relative w-10 h-4 transition-all opacity-60 hover:opacity-100 grayscale hover:grayscale-0 brightness-0 invert"><Image src="/bet365.png" alt="365" fill className="object-contain" /></div>
                  <div className="relative w-10 h-4 transition-all opacity-60 hover:opacity-100 brightness-0 invert"><Image src="/stake.svg" alt="Stake" fill className="object-contain" /></div>
                  <div className="text-[10px] font-black opacity-30 italic">+ Select Hardbooks</div>
                </>
              )}
              {i === 2 && (
                <>
                  <div className="relative w-10 h-4 transition-all opacity-60 hover:opacity-100 brightness-0 invert"><Image src="/stake.svg" alt="Stake" fill className="object-contain" /></div>
                  <div className="relative w-10 h-4 transition-all opacity-60 hover:opacity-100 grayscale hover:grayscale-0 brightness-0 invert"><Image src="/Polymarket.png" alt="Poly" fill className="object-contain" /></div>
                  <div className="relative w-10 h-4 transition-all opacity-60 hover:opacity-100 brightness-0 invert"><Image src="/kaalshinew.svg" alt="Kalshi" fill className="object-contain" /></div>
                  <div className="text-[10px] font-black opacity-30 italic">Full Suite</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Button - Always Visible */}
        <a
          href="https://t.me/oddsmasterwins"
          target="_blank"
          className={`w-full py-5 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] transition-all rounded-[20px] flex items-center justify-center gap-3 relative overflow-hidden group/btn mt-auto ${plan.highlight
            ? 'bg-accent text-white shadow-[0_15px_30px_rgba(7,181,126,0.3)] hover:shadow-[0_20px_50px_rgba(7,181,126,0.6)] hover:-translate-y-1'
            : 'bg-white/10 text-white border border-white/10 hover:bg-white/20 hover:border-white/30'
            }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-sweep"></div>
          <Send className="w-5 h-5 opacity-70" />
          {plan.cta}
        </a>
      </div>
    </motion.div>
  );
};

export function Pricing() {
  const plans = [
    {
      name: "Core System",
      price: "$299",
      oldPrice: null,
      multiplier: "10x Target",
      period: "per month",
      type: "Aggressive Growth",
      expectation: "$1k–$3k+ Cap Expectation",
      caveat: "High variance. Outcome depends entirely on how you size & rotate capital.",
      books: "Softbooks + Prediction Markets",
      features: [
        "3 Exclusive Daily Card Plays (Low/High Risk)",
        "Exclusive Parlay Drops & Alerts",
        "Market Timing & Entry Triggers",
        "Softbook & Prediction Market Focused Plays",
        "❌ No Bankroll / Risk Optimization",
        "❌ No Hand-Holding / Customization"
      ],
      highlight: false,
      cta: "Get Core Access",
      tag: "Best for Upside",
      color: "from-blue-500/10 to-transparent",
      borderColor: "group-hover:border-blue-500/50",
      forWhom: "Aggressive users who want upside and manage risk themselves"
    },
    {
      name: "Pro Edge",
      price: "$999",
      oldPrice: "$1,299",
      multiplier: "Consistent Scaling",
      period: "per month",
      type: "Professional Structure",
      expectation: "$5k–$15k Cap Expectation",
      caveat: "Lower variance. Drawdowns controlled. Upside reduced for stability.",
      books: "Softbooks + Select Hardbooks",
      features: [
        "Everything in Core System",
        "Capital Allocation Logic Guidance",
        "Market Selection (What NOT to play)",
        "Softbooks + Select Hardbooks Access",
        "Risk-Adjusted Alpha Exposure",
        "❌ No 1-on-1 Personalized Reviews"
      ],
      highlight: true,
      popular: true,
      cta: "Scale Your Edge",
      tag: "Most Popular",
      color: "from-accent/20 via-accent/5 to-transparent",
      borderColor: "border-accent/40 group-hover:border-accent",
      forWhom: "Serious bettors who want structure and consistency, not chaos"
    },
    {
      name: "Private Consultancy",
      price: "$4,999",
      oldPrice: null,
      multiplier: "Capital Protection",
      period: "per month",
      type: "Institutional Strategy",
      expectation: "$25k+ Cap Expectation",
      caveat: "Focus on capital efficiency over raw ROI. Goal is survival + long-term compounding.",
      books: "Full Access (Soft, Hard & Prediction)",
      features: [
        "Full Platform Access & Integration",
        "Personalized Strategy Development",
        "Capital Protection & Compounding Focus",
        "Periodic 1-on-1 Performance Reviews",
        "Institutional Sentiment Tracking",
        "❌ Not built for 'Fast Flips'"
      ],
      highlight: false,
      cta: "Secure Allocation",
      tag: "Portfolio Only",
      color: "from-purple-500/10 to-transparent",
      borderColor: "group-hover:border-purple-500/50",
      forWhom: "High-capital users who care more about not losing than flexing wins"
    }
  ];

  return (
    <section id="pricing" className="py-12 md:py-20 bg-background text-foreground relative transition-colors duration-300 overflow-hidden">
      {/* Dynamic Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-accent/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-[#f7d849]/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-full lg:om-container relative z-10 text-center">
        <div className="mb-16">
          <div className="experts-header-tag">Strategic Execution Tiers</div>
          <h2 className="mb-6 italic">
            Deploy Your <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#f7d849] to-[#f59e0b]">Winning Protocol</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto font-bold leading-relaxed px-6 md:px-0">
            Precision-engineered entry tiers tailored to specific bankroll volumes and risk tolerances.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8 items-start max-w-[1250px] mx-auto px-6 md:px-0 mb-8">
          {plans.map((plan, i) => (
            <PricingCard key={i} plan={plan} i={i} />
          ))}
        </div>

        {/* US Pricing Disclaimer */}
        <div className="mb-20 px-6 max-w-2xl mx-auto">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
            <p className="text-[11px] font-bold text-muted/60 leading-relaxed uppercase tracking-wide">
              These prices are for our US customers who form our customer base 🇺🇸.
              <br className="hidden md:block" />
              Please contact us via email or Telegram to know country specific prices.
            </p>
          </div>
        </div>

        {/* Venue Distinction Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[1000px] mx-auto px-4 md:px-0"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-black italic mb-4 uppercase tracking-tight">Wait, what&apos;s the actual difference between Softbooks, Prediction Markets & Hardbooks?</h3>
            <p className="text-muted text-sm font-bold uppercase tracking-widest opacity-60">Understanding Your Execution Environment</p>
          </div>

          {/* Desktop View: Clean Matrix */}
          <div className="hidden md:block overflow-hidden rounded-[40px] border border-white/5 bg-[#050505] shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-accent">Venue Category</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted">Platform Integration</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted text-center">Efficiency Rating</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted text-right">Strategic Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  {
                    name: 'Softbooks',
                    icon: <Zap className="w-4 h-4 text-accent" />,
                    platforms: ['/bet365.png', '/fanduel.svg'],
                    efficiency: 'Inefficient Pricing',
                    role: 'Asymmetric Edge',
                    color: 'accent'
                  },
                  {
                    name: 'Prediction Mkts',
                    icon: <Target className="w-4 h-4 text-accent" />,
                    platforms: ['/Polymarket.png', '/kaalshinew.svg'],
                    efficiency: 'Market Transparent',
                    role: 'Zero-Edge Alpha',
                    color: 'accent'
                  },
                  {
                    name: 'Hardbooks',
                    icon: <ShieldCheck className="w-4 h-4 text-accent" />,
                    platforms: ['/stake.svg', '/1x.svg'],
                    efficiency: 'Hyper Efficient',
                    role: 'Volume Execution',
                    color: 'accent',
                    hasPinnacle: true
                  }
                ].map((row, idx) => (
                  <tr key={idx} className="group hover:bg-accent/[0.02] transition-colors duration-500">
                    <td className="p-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent/30 transition-all">
                          {row.icon}
                        </div>
                        <span className="text-lg font-black italic uppercase text-foreground leading-none">{row.name}</span>
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex gap-6 items-center opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                        {row.platforms.map((p, pIdx) => (
                          <div key={pIdx} className="relative w-16 h-6 transition-all brightness-0 invert opacity-60 hover:opacity-100">
                            <Image src={p} alt="Platform" fill className="object-contain" />
                          </div>
                        ))}
                        {row.hasPinnacle && (
                          <div className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[8px] font-black">PINNACLE</div>
                        )}
                      </div>
                    </td>
                    <td className="p-8 text-center">
                      <span className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 bg-accent/10 text-accent rounded-full border border-accent/20">
                        {row.efficiency}
                      </span>
                    </td>
                    <td className="p-8 text-right">
                      <span className="text-sm font-black italic text-[#f7d849]">{row.role}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View: Surgical Card Layout (No Shabby Slider) */}
          <div className="md:hidden flex flex-col gap-4">
            {[
              {
                name: 'Softbooks',
                icon: <Zap className="w-5 h-5 text-accent" />,
                efficiency: 'Inefficient Pricing',
                role: 'Asymmetric Edge',
                platforms: ['/bet365.png', '/fanduel.svg']
              },
              {
                name: 'Prediction Mkts',
                icon: <Target className="w-5 h-5 text-accent" />,
                efficiency: 'Market Transparent',
                role: 'Zero-Edge Alpha',
                platforms: ['/Polymarket.png', '/kaalshinew.svg']
              },
              {
                name: 'Hardbooks',
                icon: <ShieldCheck className="w-5 h-5 text-accent" />,
                efficiency: 'Hyper Efficient',
                role: 'Volume Execution',
                platforms: ['/stake.svg', '/1x.svg'],
                hasPinnacle: true
              }
            ].map((row, idx) => (
              <div key={idx} className="bg-[#050505] border border-white/5 rounded-[32px] p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                      {row.icon}
                    </div>
                    <span className="text-xl font-black italic uppercase">{row.name}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#f7d849] italic">{row.role}</span>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex gap-4">
                    {row.platforms.map((p, pIdx) => (
                      <div key={pIdx} className="relative w-14 h-5 opacity-60 brightness-0 invert">
                        <Image src={p} alt="Platform" fill className="object-contain" />
                      </div>
                    ))}
                    {row.hasPinnacle && (
                      <div className="px-2 py-0.5 bg-white/5 rounded border border-white/10 text-[7px] font-black self-center">PINNACLE</div>
                    )}
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-accent/10 text-accent rounded-full border border-accent/20">
                    {row.efficiency}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted/30 text-center">
            <Info className="w-4 h-4 text-accent" />
            <span className="max-w-[300px] md:max-w-none">Multi-venue switching is required for institutional compounding</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
