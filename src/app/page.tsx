'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Critical components loaded immediately
import { Header } from './components/Header';
import { Hero } from './components/Hero';

// Dynamic imports for below-the-fold content
// SSR: true ensures SEO content is present in initial HTML, but hydration code is split
const PartnerBar = dynamic(() => import('./components/PartnerBar').then(mod => mod.PartnerBar), { ssr: true });
const BettingIntelligence = dynamic(() => import('./components/BettingIntelligence').then(mod => mod.BettingIntelligence), { ssr: true });
const HumanAiSynergy = dynamic(() => import('./components/HumanAiSynergy').then(mod => mod.HumanAiSynergy), { ssr: true });
const StrategyModels = dynamic(() => import('./components/StrategyModels').then(mod => mod.StrategyModels), { ssr: true });
const ExpertiseSection = dynamic(() => import('./components/ExpertiseSection').then(mod => mod.ExpertiseSection), { ssr: true });
const MissionSection = dynamic(() => import('./components/MissionSection').then(mod => mod.MissionSection), { ssr: true });
const GettingStarted = dynamic(() => import('./components/GettingStarted').then(mod => mod.GettingStarted), { ssr: true });
const Testimonials = dynamic(() => import('./components/Testimonials').then(mod => mod.Testimonials), { ssr: true });
const Pricing = dynamic(() => import('./components/Pricing').then(mod => mod.Pricing), { ssr: true });
const Flexibility = dynamic(() => import('./components/Flexibility').then(mod => mod.Flexibility), { ssr: true });
const FAQ = dynamic(() => import('./components/FAQ').then(mod => mod.FAQ), { ssr: true });
const Footer = dynamic(() => import('./components/Footer').then(mod => mod.Footer), { ssr: true });
const ParlayAssembly = dynamic(() => import('./components/ParlayAssembly').then(mod => mod.ParlayAssembly), { ssr: true });
const RevealOnScroll = dynamic(() => import('./components/RevealOnScroll'), { ssr: false }); // Client-side logic only

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <RevealOnScroll />
      <Header />
      <main>
        <div className="reveal"><Hero /></div>
        <div className="reveal"><PartnerBar /></div>
        <div className="reveal"><BettingIntelligence /></div>
        <div className="reveal"><HumanAiSynergy /></div>
        <div className="reveal"><StrategyModels /></div>
        <div className="reveal"><ParlayAssembly /></div>
        <div className="reveal"><ExpertiseSection /></div>
        <div className="reveal"><MissionSection /></div>
        <div className="reveal"><GettingStarted /></div>

        <div className="reveal"><Testimonials mode="platform" /></div>
        <div className="reveal"><Pricing /></div>

        <div className="reveal"><Flexibility /></div>
        <div className="reveal"><FAQ /></div>
      </main>
      <Footer />
    </div>
  );
}
