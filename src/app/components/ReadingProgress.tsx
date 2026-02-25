'use client';

import { useEffect, useState } from 'react';

export function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const currentScrollY = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            const windowHeight = scrollHeight - clientHeight;
            if (windowHeight <= 0) {
                setProgress(100);
                return;
            }

            const currentProgress = (currentScrollY / windowHeight) * 100;
            setProgress(Math.min(100, Math.max(0, currentProgress)));
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();

        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-[4px] z-[100] bg-transparent pointer-events-none">
            <div
                className="h-full bg-accent transition-all duration-150 ease-out shadow-[0_0_15px_rgba(7,181,126,0.8)]"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
