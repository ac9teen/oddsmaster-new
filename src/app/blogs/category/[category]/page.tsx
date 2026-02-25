import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { getPostsByCategory, getAllPosts } from '../../../../lib/api';
import { BlogSubnav } from '../../../components/BlogSubnav';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Metadata } from 'next';

export async function generateStaticParams() {
    return [
        { category: 'atp' },
        { category: 'wta' },
        { category: 'football-picks' },
        { category: 'basketball-picks' },
    ];
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const category = (await params).category;
    const title = category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return {
        title: `${title} Insights | OddsMaster Intelligence`,
        description: `Expert ${title} analysis, betting picks, and strategy from the OddsMaster Quant Team.`,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const category = (await params).category;
    const posts = getPostsByCategory(category, ['title', 'date', 'slug', 'author', 'coverImage', 'excerpt', 'tags', 'category']);

    // Format category title for display
    const categoryTitle = category.replace(/-/g, ' ').toUpperCase();

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-accent">
            <Header />

            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="relative px-6 mb-12">
                    <div className="om-container text-center relative z-10">
                        <div className="experts-header-tag mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">Sharps Intelligence</div>
                        <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                            {categoryTitle} <span className="text-accent">intel</span>
                        </h1>
                        <p className="text-xl text-muted font-medium max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                            Filtered analysis for {categoryTitle.toLowerCase()}.
                        </p>
                    </div>

                    {/* Background Ambient Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
                </section>

                <div className="mb-16">
                    <BlogSubnav />
                </div>

                {/* Blog Grid */}
                <section className="om-container px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link
                                href={`/blogs/${post.slug}`}
                                key={post.slug}
                                className="group flex flex-col h-full bg-card border border-card-border rounded-[2rem] overflow-hidden hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(7,181,126,0.2)]"
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
                                        {post.tags?.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black uppercase tracking-wider text-white">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
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

                                    <h3 className="text-2xl font-black uppercase italic tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
                                        {post.title}
                                    </h3>

                                    <p className="text-muted font-medium leading-relaxed mb-8 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center text-accent text-xs font-black uppercase tracking-[0.2em]">
                                        Read Analysis <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {/* Empty State */}
                        {posts.length === 0 && (
                            <div className="col-span-full text-center py-20">
                                <p className="text-muted text-xl">No analysis found for {categoryTitle}. Check back soon.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Lead Magnet / Newsletter CTA */}
                <section className="mt-32 px-6">
                    <div className="om-container">
                        <div className="bg-gradient-to-br from-card to-card/50 border border-card-border rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
                            <div className="relative z-10 max-w-3xl mx-auto">
                                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-6">
                                    Don't Miss the Next <span className="text-accent">Edge</span>
                                </h2>
                                <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
                                    Join 10,000+ smart bettors receiving our weekly breakdown of model performance and upcoming {categoryTitle.toLowerCase()} opportunities.
                                </p>

                                <div className="flex justify-center">
                                    <Link href="https://www.oddsmaster.vip/newsletter">
                                        <button className="bg-accent text-foreground font-black uppercase tracking-[0.2em] px-8 py-4 rounded-xl hover:scale-105 transition-transform">
                                            Subscribe to Newsletter
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f7d849]/10 blur-[80px] rounded-full pointer-events-none"></div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
