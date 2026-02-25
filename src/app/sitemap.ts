import { MetadataRoute } from 'next';
import { getAllPosts } from '../lib/api';

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts(['slug', 'date']);
    const baseUrl = 'https://www.oddsmaster.vip'; // Adjust to real domain

    const blogPosts = posts.map((post) => ({
        url: `${baseUrl}/blogs/${post.slug}`,
        lastModified: post.date,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const categories = ['atp', 'wta', 'football-picks', 'basketball-picks'];
    const categoryPages = categories.map((cat) => ({
        url: `${baseUrl}/blogs/category/${cat}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...categoryPages,
        ...blogPosts,
    ];
}
