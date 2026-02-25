import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { getPostBySlug, getAllPosts, markdownToHtml } from '../../../lib/api';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Calendar, Share2, AlertTriangle } from 'lucide-react';
import { PostBody } from '../../components/PostBody';
import { ShareButton } from '../../components/ShareButton';
import { ReadingProgress } from '../../components/ReadingProgress';
import '../../blog.css'; // We will create this for specific typography styles

export async function generateStaticParams() {
    const posts = getAllPosts(['slug']);
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const slug = (await params).slug;
    const post = getPostBySlug(slug, ['title', 'excerpt', 'coverImage']);

    return {
        title: `${post.title} | OddsMaster Blog`,
        description: post.excerpt,
        openGraph: {
            images: [post.coverImage || '/newsletter/bg1.png'],
        },
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const post = getPostBySlug(slug, [
        'title',
        'date',
        'slug',
        'author',
        'content',
        'coverImage',
        'tags'
    ]);

    const content = await markdownToHtml(post.content || '');

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.coverImage ? `https://oddsmaster.vip${post.coverImage}` : 'https://oddsmaster.vip/news1.png',
        datePublished: post.date,
        dateModified: post.date, // Updates in CMS should ideally track modified date, using publish date for now
        author: {
            '@type': 'Person',
            name: post.author || 'OddsMaster Quant Team',
        },
        publisher: {
            '@type': 'Organization',
            name: 'OddsMaster',
            logo: {
                '@type': 'ImageObject',
                url: 'https://oddsmaster.vip/icon.svg',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://oddsmaster.vip/blogs/${post.slug}`,
        },
        keywords: post.tags?.join(', '),
        articleSection: post.category || 'General',
    };

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-accent">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />
            <ReadingProgress />

            <main className="pt-32 pb-24">
                <article>
                    {/* Post Header */}
                    <header className="om-container px-4 md:px-6 mb-12 md:mb-16 text-center max-w-4xl mx-auto">
                        <Link href="/blogs" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors mb-12">
                            <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                        </Link>

                        <div className="flex items-center justify-center gap-3 mb-6">
                            {post.tags?.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-black uppercase tracking-wider text-accent">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8 leading-none blog-hero-heading">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center gap-8 text-xs font-bold text-muted uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-accent" />
                                {post.date}
                            </div>
                            {post.author && (
                                <div className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-[#058c62] flex items-center justify-center text-[8px] text-white">OM</span>
                                    {post.author}
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                5 Min Read
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.coverImage && (
                        <div className="om-container px-4 md:px-6 mb-10 md:mb-16">
                            <div className="relative aspect-video w-full max-w-5xl mx-auto rounded-2xl md:rounded-[2rem] overflow-hidden border border-card-border shadow-2xl">
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                            </div>
                        </div>
                    )}

                    {/* Content Body */}
                    <div className="om-container px-4 md:px-6 mb-16 md:mb-20">
                        <PostBody content={content} />
                    </div>

                    {/* Share / Tags Footer */}
                    <div className="om-container px-4 md:px-6 mb-20 md:mb-24 max-w-4xl mx-auto border-t border-card-border pt-12 flex flex-col md:flex-row gap-6 justify-between items-center">
                        <div className="text-sm font-bold text-muted">
                            Tagged: <span className="text-foreground">{post.tags?.join(', ')}</span>
                        </div>
                        <ShareButton title={post.title} />
                    </div>
                    <div className="om-container px-4 md:px-6 mb-24 max-w-4xl mx-auto">
                        <div className="bg-[#f7d849]/10 border border-[#f7d849]/20 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
                                <div className="w-12 h-12 rounded-full bg-[#f7d849] flex items-center justify-center shrink-0">
                                    <AlertTriangle className="w-6 h-6 text-black" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black uppercase text-[#f7d849] mb-2 tracking-tight">⚠️ The Public Alpha Paradox</h4>
                                    <p className="text-sm font-bold text-muted/80 leading-relaxed mb-4">
                                        What you just read is mathematically valid, but it is static. The market moves in milliseconds. Deploying this strategy without real-time adjustments is like driving blindfolded based on a map from 1999. You might win today, but you will bleed tomorrow.
                                    </p>
                                    <Link href="https://www.oddsmaster.vip/newsletter" className="inline-flex items-center text-xs font-black uppercase tracking-[0.2em] text-[#f7d849] hover:underline underline-offset-4">
                                        Get The Live Feed <ArrowRight className="w-3 h-3 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Similar to Listing Page CTA */}
                <section className="px-6">
                    <div className="om-container max-w-4xl mx-auto">
                        <div className="bg-card border border-card-border rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter mb-4">
                                    Operationalize This Strategy
                                </h3>
                                <p className="text-muted mb-8 max-w-lg mx-auto">
                                    Get this detailed data directly in your inbox. No fluff, just alpha.
                                </p>

                                <div className="flex justify-center">
                                    <Link href="https://www.oddsmaster.vip/newsletter">
                                        <button className="bg-accent text-foreground font-black uppercase tracking-[0.2em] text-sm px-10 py-4 rounded-xl hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(7,181,126,0.3)] hover:shadow-[0_15px_40px_rgba(7,181,126,0.5)]">
                                            Subscribe to Newsletter
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
