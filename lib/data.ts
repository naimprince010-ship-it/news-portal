import { createReader } from '@keystatic/core/reader';
import config from '../keystatic.config';

const reader = createReader(process.cwd(), config);

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: any; // Keystatic document type
  category: string;
  image: string;
  author: string;
  publishedAt: string;
}

export async function getArticles(): Promise<Article[]> {
  const posts = await reader.collections.posts.all();
  return Promise.all(posts.map(async (post) => ({
    id: post.slug,
    title: post.entry.title,
    excerpt: post.entry.excerpt,
    content: await post.entry.content(),
    category: post.entry.category,
    image: post.entry.coverImage || '',
    author: post.entry.author,
    publishedAt: post.entry.publishedAt || '',
  })));
}

export async function getArticle(slug: string): Promise<Article | null> {
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
    publishedAt: post.publishedAt || '',
  };
}

// Fallback empty array for initial build/static gen if needed, 
// but we should use getArticles() everywhere now.
export const articles: Article[] = [];
