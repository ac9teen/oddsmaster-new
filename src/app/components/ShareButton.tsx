'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface ShareButtonProps {
    title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: `Check out this analysis on OddsMaster: ${title}`,
                    url: url,
                });
                return;
            } catch (error) {
                console.log('Error sharing:', error);
            }
        }

        // Fallback: Copy to clipboard
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-accent hover:bg-accent/10 px-4 py-2 rounded-full transition-colors"
        >
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            {copied ? 'Copied Link!' : 'Share Analysis'}
        </button>
    );
}
