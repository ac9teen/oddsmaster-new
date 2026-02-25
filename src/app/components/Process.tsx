'use client';

import React from 'react';
import { MousePointer2, Settings2, Rocket } from 'lucide-react';

export function Process() {
  const steps = [
    {
      title: "Select Strategy",
      duration: "Start instantly",
      description: "Choose from our pre-built high-performance models or request a custom setup tailored to your specific bankroll and risk profile.",
      icon: <MousePointer2 className="w-8 h-8 text-white" />
    },
    {
      title: "Refine Parameters",
      duration: "1-2 days",
      description: "Work with our analysts to fine-tune your entry triggers and stake sizing. We ensure the model aligns with your betting philosophy.",
      icon: <Settings2 className="w-8 h-8 text-white" />
    },
    {
      title: "Go Live",
      duration: "Deployment",
      description: "Your strategy goes live on our infrastructure. Receive real-time signals via Discord, Telegram, or API with full performance tracking.",
      icon: <Rocket className="w-8 h-8 text-white" />
    }
  ];

  return (
    <section className="py-32 bg-[#000d08] text-white px-4 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#07b57e]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1300px] mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-24 max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#07b57e]/30 bg-[#07b57e]/10 text-[#07b57e] text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-6">
            Workflow
          </div>
          <h2 className="mb-8 italic">
            Go from data to <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#07b57e] to-[#058c62]">delivery</span> in days
          </h2>
          <p className="text-white/50 font-medium max-w-2xl mx-auto">
            Our streamlined onboarding process means you can start betting with an AI edge faster than building any tool from scratch.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative z-10 group">
              {/* Icon Container */}
              <div className="w-24 h-24 mb-10 bg-[#0a0a0a] border border-white/5 rounded-[32px] flex items-center justify-center transition-all duration-700 group-hover:border-[#07b57e]/50 group-hover:bg-[#07b57e]/10 shadow-2xl group-hover:-translate-y-2 relative">
                <div className="absolute inset-0 bg-[#07b57e]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-[#07b57e] to-[#058c62] rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(7,181,126,0.3)] relative z-10">
                  {step.icon}
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-3 mb-6">
                <h3 className="group-hover:text-[#07b57e] transition-colors">{step.title}</h3>
                <span className="text-[#07b57e] font-black text-[10px] md:text-xs tracking-[0.3em] uppercase">{step.duration}</span>
              </div>
              <p className="text-white/40 leading-relaxed max-w-sm font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
