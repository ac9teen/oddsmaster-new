'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calendar, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Defined locally to match the structure we expect. 
// Ideally shared from a types file, but for a component this is fine.
interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    coverImage?: string;
    author?: string;
    tags?: string[];
    category?: string;
}

export function BlogSearch({ posts }: { posts: Post[] }) {
    const [query, setQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (query.trim() === '') {
            setFilteredPosts([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const results = posts.filter(post =>
            post.title.toLowerCase().includes(lowerQuery) ||
            post.excerpt.toLowerCase().includes(lowerQuery) ||
            post.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
            post.category?.toLowerCase().includes(lowerQuery)
        );
        setFilteredPosts(results);
    }, [query, posts]);

    return (
        <div className="relative w-full max-w-2xl mx-auto mb-12 z-20">
            <div className="relative group">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-md group-focus-within:bg-accent/40 transition-all duration-500"></div>
                <div className="relative flex items-center bg-card/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 shadow-2xl transition-all focus-within:border-accent/50 group-hover:border-white/20">
                    <Search className="w-5 h-5 text-muted group-focus-within:text-accent transition-colors" />
                    <input
                        type="text"
                        placeholder="Search for Strategy, NFL Models, Alpha..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted/50 ml-4 font-medium"
                    />
                    {query && (
                        <button onClick={() => setQuery('')}>
                            <X className="w-4 h-4 text-muted hover:text-foreground transition-colors" />
                        </button>
                    )}
                </div>
            </div>

            {/* Results Dropdown */}
            <AnimatePresence>
                {query && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-4 bg-[#0a0c14]/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 max-h-[60vh] overflow-y-auto"
                    >
                        {filteredPosts.length > 0 ? (
                            <div className="p-2">
                                {filteredPosts.map(post => (
                                    <Link key={post.slug} href={`/blogs/${post.slug}`}>
                                        <div className="flex items-start gap-4 p-4 hover:bg-white/5 rounded-2xl transition-colors cursor-pointer group">
                                            {post.coverImage && (
                                                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                                                    <img src={post.coverImage} alt={post.title} width={80} height={80} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                            )}
                                            <div>
                                                <h4 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2 mb-1">{post.title}</h4>
                                                <p className="text-xs text-muted line-clamp-1 mb-2">{post.excerpt}</p>
                                                <div className="flex items-center gap-2 text-[10px] text-muted uppercase tracking-wider">
                                                    <span>{post.date}</span>
                                                    {post.category && (
                                                        <>
                                                            <span className="w-1 h-1 bg-accent rounded-full"></span>
                                                            <span className="text-accent">{post.category}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-muted">
                                <p className="text-sm">No intelligence found matching "{query}"</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
