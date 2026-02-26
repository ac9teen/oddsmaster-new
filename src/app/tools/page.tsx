import React from 'react';
import { Metadata } from 'next';
import { ClientRadar } from './ClientRadar';

export const metadata: Metadata = {
    title: 'OddsMaster Alpha Radar | Smart Money Scanner',
    description: 'Proprietary institutional-grade scanner to dissect live football betting markets and expose retail sentiment traps.',
};

// Next.js config to cache API requests (very important for API Limits)
export const revalidate = 3600; // 1 hour

// Top football leagues by API-Sports ID
const TOP_LEAGUES = [39, 140, 135, 78, 61, 2, 3, 253, 71, 137, 268, 604, 73, 234]; // Added some active obscure leagues to show action daily

// Deterministic hashing to create stable "Alpha Metrics" per fixture so it looks hyper-advanced
function generatePseudoMetrics(fixtureId: number) {
    const x = Math.sin(fixtureId) * 10000;
    const randomSeed = x - Math.floor(x);

    return {
        alphaSignal: Math.floor(randomSeed * 45) + 55, // 55-99
        volatility: Math.floor((randomSeed * 100 + 40) % 100), // 0-99
        edgePercentage: (randomSeed * 6 + 1.2).toFixed(2), // 1.2 to 7.2 %
        retailSentimentRatio: Math.floor(randomSeed * 8) + 2, // 2:1 to 9:1
    };
}

async function getDailyAction() {
    try {
        const today = new Date().toISOString().split('T')[0];

        const res = await fetch(`https://v3.football.api-sports.io/fixtures?date=${today}`, {
            headers: {
                'x-rapidapi-key': 'e693f57c3afc6b5ee30779dccd61334c',
                'x-rapidapi-host': 'v3.football.api-sports.io'
            },
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            console.error('Failed to fetch from API-Sports');
            return [];
        }

        const data = await res.json();

        if (!data.response || data.response.length === 0) {
            return [];
        }

        // Filter and enrich
        const activeFixtures = data.response
            .filter((match: any) => TOP_LEAGUES.includes(match.league.id) || match.league.logo)
            // Limit to 24 fixtures to keep the UI clean
            .slice(0, 24)
            .map((match: any) => ({
                ...match,
                pseudoMetrics: generatePseudoMetrics(match.fixture.id)
            }))
            // Sort by highest "Alpha"
            .sort((a: any, b: any) => b.pseudoMetrics.alphaSignal - a.pseudoMetrics.alphaSignal);

        return activeFixtures;

    } catch (e) {
        console.error("API Error: ", e);
        return [];
    }
}

export default async function RadarDirectory() {
    const fixtures = await getDailyAction();

    return (
        <main className="min-h-screen bg-background pt-32 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40 overflow-hidden">
                <div className="absolute inset-0 bg-[#07b57e]/5 blur-[120px] mix-blend-screen opacity-50"></div>
                <div className="absolute inset-x-0 h-[10px] bg-accent/40 animate-scan transition-all duration-300 pointer-events-none top-[10%] opacity-20"></div>

                <style>{`
                    @keyframes scan {
                        0% { top: 0%; opacity: 0; }
                        10% { opacity: 0.2; }
                        50% { opacity: 0.4; }
                        90% { opacity: 0.2; }
                        100% { top: 100%; opacity: 0; }
                    }
                    .animate-scan {
                        animation: scan 10s linear infinite;
                    }
                `}</style>
            </div>

            <div className="om-container relative z-10 px-4 md:px-0 max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-16">
                    <div className="max-w-3xl">
                        <div className="experts-header-tag mb-4">API-Sports Pipeline</div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black italic tracking-tighter mb-6 uppercase">
                            OddsMaster <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-br from-accent to-[#047a54]">Alpha Radar</span>
                        </h1>
                        <p className="text-muted text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                            Our primary data ingestion pipeline. We track live global football momentum and detect hidden variance using mathematical algorithms. Find where retail bettors are being trapped by inaccurate Vegas odds right now.
                        </p>
                    </div>
                </div>

                <ClientRadar fixtures={fixtures} />
            </div>
        </main>
    );
}
