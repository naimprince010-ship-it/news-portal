'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'fs';
import path from 'path';

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-')   // Replace multiple - with single -
        .replace(/^-+/, '')       // Trim - from start of text
        .replace(/-+$/, '');      // Trim - from end of text
}

export async function createPost(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string; // Markdown content
    const excerpt = formData.get('excerpt') as string;
    const category = formData.get('category') as string;
    const author = formData.get('author') as string || 'Admin';
    const coverImageFile = formData.get('coverImage') as File;

    if (!title || !content || !category) {
        return { error: 'Missing required fields' };
    }

    const slug = slugify(title); // Simple slug generation, might collide but ok for now
    const date = new Date().toISOString().split('T')[0];

    // Handle Image Upload
    let coverImagePath = '';
    if (coverImageFile && coverImageFile.size > 0) {
        const buffer = Buffer.from(await coverImageFile.arrayBuffer());
        const fileName = `${slug}-${Date.now()}${path.extname(coverImageFile.name)}`;
        const uploadDir = path.join(process.cwd(), 'public', 'images', 'posts');

        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, buffer);
        coverImagePath = `/images/posts/${fileName}`;
    }

    // Construct .mdoc file content
    const mdocContent = `---
title: ${title}
excerpt: ${excerpt}
coverImage: ${coverImagePath}
author: ${author}
publishedAt: ${date}
category: ${category}
---

${content}
`;

    // Write .mdoc file
    const postsDir = path.join(process.cwd(), 'content', 'posts');
    if (!fs.existsSync(postsDir)) {
        fs.mkdirSync(postsDir, { recursive: true });
    }

    const mdocFilePath = path.join(postsDir, `${slug}.mdoc`);
    fs.writeFileSync(mdocFilePath, mdocContent, 'utf-8');

    revalidatePath('/dashboard');
    revalidatePath('/');

    return { success: true };
}
