import { createReader } from '@keystatic/core/reader';
import config from '../keystatic.config';

export const reader = createReader(process.cwd(), config);

export async function getPosts() {
    const posts = await reader.collections.posts.all();
    return Promise.all(posts.map(async (post) => ({
        id: post.slug,
        title: post.entry.title,
        excerpt: post.entry.excerpt,
        content: await post.entry.content(), // This will need processing
        category: post.entry.category,
        image: post.entry.coverImage || '',
        author: post.entry.author,
        publishedAt: post.entry.publishedAt,
    })));
}

export async function getPost(slug: string) {
    const post = await reader.collections.posts.read(slug);
    if (!post) return null;
    return {
        id: slug,
        title: post.title,
        excerpt: post.excerpt,
        content: await post.content(),
        category: post.category,
        image: post.coverImage || '',
        author: post.author,
        publishedAt: post.publishedAt,
    };
}
