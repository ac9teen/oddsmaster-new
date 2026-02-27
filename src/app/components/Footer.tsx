'use client';

import React from 'react';
import Link from 'next/link';
import { Twitter, Send, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground pt-12 md:pt-16 pb-8 px-4 border-t border-card-border relative overflow-hidden transition-colors duration-300">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none opacity-0 dark:opacity-100"></div>

      <div className="om-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-12">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="inline-block mb-10 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img
                    src="/Logo.svg"
                    width={40}
                    height={40}
                    alt="OddsMaster Logo"
                    className="w-full h-full object-contain swirl-logo brightness-0 invert dark:brightness-0 dark:invert"
                  />
                </div>
                <img src="/oddmasterlogowhite_text.svg" alt="ODDSMASTER" width={200} height={36} className="h-9 w-auto object-contain" />
              </div>
            </Link>
            <p className="text-muted font-medium mb-12 leading-relaxed">
              Empowering bettors with institutional-grade AI models and real-time predictive analytics.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Twitter, href: "#" },
                { Icon: Send, href: "https://t.me/oddsmasterwins" },
                { Icon: Linkedin, href: "#" },
                { Icon: Mail, href: "mailto:hello@oddsmaster.vip" }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="w-12 h-12 rounded-2xl bg-card border border-card-border flex items-center justify-center hover:bg-accent/10 hover:border-accent hover:text-accent transition-all duration-500 hover:-translate-y-1 shadow-lg"
                >
                  <item.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:ml-auto">
            <h4 className="font-black text-xs uppercase tracking-[0.3em] text-foreground/90 mb-10">Navigation</h4>
            <ul className="space-y-6">
              {[
                { name: 'Home', href: '/' },
                { name: 'VIP Newsletter', href: 'https://www.oddsmaster.vip/newsletter' },
                { name: 'AI Models', href: '/#models' },
                { name: 'Transparency', href: '/#about' },
                { name: 'Contact Us', href: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-muted hover:text-accent transition-all font-bold text-sm tracking-wide inline-block hover:translate-x-1">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:ml-auto">
            <h4 className="font-black text-xs uppercase tracking-[0.3em] text-foreground/90 mb-10">Support</h4>
            <ul className="space-y-6">
              {[
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Privacy Policy', href: '/privacy' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-muted hover:text-accent transition-all font-bold text-sm tracking-wide inline-block hover:translate-x-1">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Form */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] text-foreground/90 mb-10">Stay Updated</h4>
            <p className="text-muted mb-10 font-medium leading-relaxed">Get the latest betting insights and model updates directly in your inbox.</p>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="email@example.com"
                className="om-input"
              />
              <button className="om-btn-primary w-full py-5 text-xs">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-card-border flex flex-col md:flex-row justify-between items-center gap-8 text-muted text-[10px] font-black uppercase tracking-[0.2em]">
          <p>© {currentYear} OddsMaster Intelligence. All rights reserved.</p>
          <div className="flex gap-10">
            <Link href="/privacy" className="hover:text-accent transition-all">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent transition-all">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
