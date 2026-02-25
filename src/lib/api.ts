import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    coverImage?: string;
    content: string;
    author?: string;
    category?: string;
    tags?: string[];
}

export function getPostSlugs() {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []): Post {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);

    // Safely check if file exists
    if (!fs.existsSync(fullPath)) {
        throw new Error(`Blog post not found: ${realSlug}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const items: any = {};

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug;
        }
        if (field === 'content') {
            items[field] = content;
        }
        if (typeof data[field] !== 'undefined') {
            // Gray-matter sometimes parses unquoted dates into Date objects. 
            // Convert them to ISO strings right away to prevent React rendering errors.
            if (data[field] instanceof Date) {
                items[field] = data[field].toISOString().split('T')[0];
            } else {
                items[field] = data[field];
            }
        }
    });

    return items;
}

export function getAllPosts(fields: string[] = []): Post[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug, fields))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}

export function getPostsByCategory(categorySlug: string, fields: string[] = []): Post[] {
    const allPosts = getAllPosts(['category', ...fields]);

    // Normalize category slug for comparison (e.g. "football-picks" -> matches "Football Picks" or "football-picks")
    const targetSlug = categorySlug.toLowerCase().replace(/-/g, ' ');
    const targetSlugDashed = categorySlug.toLowerCase().replace(/ /g, '-');

    return allPosts.filter(post => {
        if (!post.category) return false;
        const postCat = post.category.toLowerCase();
        // Check if category matches slug logic (allow loose matching)
        return postCat === targetSlug || postCat === targetSlugDashed || postCat.replace(/ /g, '-') === targetSlugDashed;
    });
}

export async function markdownToHtml(markdown: string) {
    const result = await remark().use(html).process(markdown);
    return result.toString();
}
