"use client"

import React from "react"
import { motion } from "framer-motion"

type BarDatum = {
  id: string
  label: string
  value: number
  color: "green" | "grey"
}

/**
 * Minimal two-bar chart (mobile-first).
 * Animates on scroll using the existing `.reveal`/`.reveal-visible` classes.
 */
export default function MinimalBarChart() {
  const data: BarDatum[] = [
    {
      id: "bets",
      label: "Global Bets Placed",
      value: 1.6, // Trillion USD
      color: "green",
    },
    {
      id: "ggr",
      label: "Global Losses / GGR",
      value: 0.25, // Trillion USD
      color: "grey",
    },
  ]

  return (
    <div className="py-12 px-4">
      <div className="flex justify-center items-end gap-6 md:gap-12 h-[300px] mb-8">
        {data.map((item) => (
          <div key={item.id} className="flex flex-col items-center flex-1 max-w-[150px] h-full">
            <div className="flex-grow w-full flex flex-col justify-end">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${(item.value / 1.6) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`w-full rounded-2xl relative group overflow-hidden ${item.color === 'green'
                  ? 'bg-accent shadow-[0_0_30px_rgba(7,181,126,0.2)]'
                  : 'bg-muted/20 border border-white/10'
                  }`}
              >
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent"></div>
              </motion.div>
            </div>
            <div className="mt-6 text-center">
              <div className="text-sm font-black text-foreground mb-1">
                {item.id === "bets" ? "~$1.6 Trillion" : "~$250 Billion"}
              </div>
              <div className="text-[10px] font-black text-muted uppercase tracking-widest leading-tight">
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-8 mt-12 pt-8 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_#07b57e]"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-muted">Bets Placed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-muted/30"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-muted">Losses / GGR</span>
        </div>
      </div>
    </div>
  )
}


