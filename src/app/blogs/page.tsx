
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getAllPosts } from '../../lib/api';
import { BlogSubnav } from '../components/BlogSubnav';
import { BlogSearch } from '../components/BlogSearch';
import Link from 'next/link';
import { ArrowRight, Calendar, User, TrendingUp } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'OddsMaster Sharps Intelligence | Blog',
    description: 'Daily betting insights, strategy guides, and mathematical analysis from the OddsMaster Quant Team.',
};

export default function BlogsPage() {
    const posts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt', 'tags', 'category']);

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-accent">
            <Header />

            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="relative px-6 mb-8">
                    <div className="om-container text-center relative z-10">
                        <div className="experts-header-tag mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">Sharps Intelligence</div>
                        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                            The Alpha <span className="text-[#f7d849]">Archive</span>
                        </h1>
                        <p className="text-xl text-muted font-medium max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 mb-8">
                            Daily insights, mathematical strategies, and market analysis to help you beat the closing line.
                        </p>

                        <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                            <BlogSearch posts={posts} />
                            <BlogSubnav />
                        </div>
                    </div>

                    {/* Dynamic Ambient Background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-slow"></div>
                </section>

                {/* Featured Post (Big Card) */}
                {posts.length > 0 && (
                    <section className="om-container px-6 mb-20 animate-in fade-in duration-1000 delay-500">
                        <Link href={`/blogs/${posts[0].slug}`} className="group relative block rounded-[3rem] overflow-hidden aspect-[16/9] md:aspect-[21/9] border border-white/10 hover:border-accent/40 hover:shadow-[0_20px_60px_-10px_rgba(7,181,126,0.3)] transition-all duration-500">
                            <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-500"></div>
                            {posts[0].coverImage && (
                                <img
                                    src={posts[0].coverImage}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    alt={posts[0].title}
                                />
                            )}
                            <div className="relative z-20 flex flex-col justify-end h-full p-8 md:p-16 bg-gradient-to-t from-black via-black/50 to-transparent">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-4 py-1 bg-accent text-black text-xs font-black uppercase tracking-widest rounded-full">New Intelligence</span>
                                    <span className="text-white/80 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                        <Calendar className="w-3 h-3" /> {posts[0].date}
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter text-white mb-4 group-hover:text-accent transition-colors duration-300">
                                    {posts[0].title}
                                </h2>
                                <p className="text-white/70 text-lg md:text-xl font-medium max-w-3xl line-clamp-2 mb-8 group-hover:text-white transition-colors duration-300">
                                    {posts[0].excerpt}
                                </p>
                                <div className="flex items-center text-accent font-black uppercase tracking-[0.2em] text-sm group-hover:translate-x-2 transition-transform duration-300">
                                    Read Analysis <ArrowRight className="ml-2 w-5 h-5" />
                                </div>
                            </div>
                        </Link>
                    </section>
                )}

                {/* Blog Grid (Skipping the first featured post) */}
                <section className="om-container px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.slice(1).map((post, index) => (
                            <Link
                                href={`/blogs/${post.slug}`}
                                key={post.slug}
                                className="group flex flex-col h-full bg-card border border-card-border rounded-[2rem] overflow-hidden hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(7,181,126,0.2)] animate-in fade-in slide-in-from-bottom-8"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden bg-muted/10">
                                    {post.coverImage && (
                                        <img
                                            src={post.coverImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}
                                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                        {post.category && (
                                            <span className="px-3 py-1 bg-accent text-black font-black uppercase tracking-wider text-[10px] rounded-full shadow-lg">
                                                {post.category}
                                            </span>
                                        )}
                                        {post.tags?.slice(0, 1).map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black uppercase tracking-wider text-white">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow relative">
                                    <div className="absolute right-8 top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <TrendingUp className="w-6 h-6 text-accent" />
                                    </div>

                                    <div className="flex items-center gap-4 text-xs font-bold text-muted uppercase tracking-wider mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3 text-accent" />
                                            {post.date}
                                        </div>
                                        {post.author && (
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-1 h-1 rounded-full bg-muted/50"></span>
                                                {post.author}
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-black uppercase italic tracking-tight mb-4 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-muted font-medium leading-relaxed mb-8 line-clamp-3 group-hover:text-muted/80 transition-colors">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center text-accent text-xs font-black uppercase tracking-[0.2em]">
                                        Read Analysis <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty State / Coming Soon placeholders to fill grid if needed */}
                    {posts.length <= 1 && (
                        <div className="col-span-full text-center py-20 animate-in fade-in">
                            <p className="text-muted text-xl font-medium">More intelligence incoming. Our models are running simulations.</p>
                        </div>
                    )}
                </section>

                {/* Lead Magnet / Newsletter CTA */}
                <section className="mt-32 px-6">
                    <div className="om-container">
                        <div className="bg-gradient-to-br from-card to-card/50 border border-card-border rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden group hover:border-accent/40 transition-colors duration-500">
                            <div className="relative z-10 max-w-3xl mx-auto">
                                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-6">
                                    Don't Miss the Next <span className="text-accent group-hover:text-[#f7d849] transition-colors duration-300">Edge</span>
                                </h2>
                                <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
                                    Join 10,000+ smart bettors receiving our weekly breakdown of model performance and upcoming high-value opportunities.
                                </p>

                                <div className="flex justify-center">
                                    <Link href="https://www.oddsmaster.vip/newsletter">
                                        <button className="bg-accent text-foreground font-black uppercase tracking-[0.2em] px-8 py-4 rounded-xl hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(7,181,126,0.2)] hover:shadow-[0_20px_60px_rgba(7,181,126,0.4)]">
                                            Subscribe to Newsletter
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-accent/20 transition-colors duration-500"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f7d849]/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#f7d849]/20 transition-colors duration-500"></div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
