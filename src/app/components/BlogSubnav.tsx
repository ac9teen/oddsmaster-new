'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = [
    { name: 'All', href: '/blogs', slug: null },
    { name: 'ATP', href: '/blogs/category/atp', slug: 'atp' },
    { name: 'WTA', href: '/blogs/category/wta', slug: 'wta' },
    { name: 'Football Picks', href: '/blogs/category/football-picks', slug: 'football-picks' },
    { name: 'Basketball Picks', href: '/blogs/category/basketball-picks', slug: 'basketball-picks' },
];

export function BlogSubnav() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center justify-center gap-2 md:gap-4 py-8 overflow-x-auto no-scrollbar mask-gradient w-full max-w-4xl mx-auto">
            {categories.map((cat) => {
                const isActive = cat.href === '/blogs'
                    ? pathname === '/blogs'
                    : pathname.startsWith(cat.href);

                return (
                    <Link
                        key={cat.name}
                        href={cat.href}
                        className={`
                            px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.1em] transition-all duration-300
                            whitespace-nowrap border
                            ${isActive
                                ? 'bg-accent text-foreground border-accent shadow-[0_0_20px_rgba(7,181,126,0.4)]'
                                : 'bg-card border-card-border text-muted hover:border-accent/50 hover:text-foreground'
                            }
                        `}
                    >
                        {cat.name}
                    </Link>
                );
            })}
        </nav>
    );
}
