'use server';

import { revalidatePath } from 'next/cache';
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

export async function createAuthor(formData: FormData) {
    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string;
    const email = formData.get('email') as string;
    const avatarFile = formData.get('avatar') as File;

    if (!name) {
        return { error: 'Name is required' };
    }

    const slug = slugify(name);

    // Handle Avatar Upload
    let avatarPath = '';
    if (avatarFile && avatarFile.size > 0) {
        const buffer = Buffer.from(await avatarFile.arrayBuffer());
        const fileName = `${slug}-${Date.now()}${path.extname(avatarFile.name)}`;
        const uploadDir = path.join(process.cwd(), 'public', 'images', 'authors');

        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, buffer);
        avatarPath = `/images/authors/${fileName}`;
    }

    // Construct JSON content
    const authorData = {
        name,
        bio,
        email,
        avatar: avatarPath
    };

    // Write JSON file
    const authorsDir = path.join(process.cwd(), 'content', 'authors');
    if (!fs.existsSync(authorsDir)) {
        fs.mkdirSync(authorsDir, { recursive: true });
    }

    const jsonFilePath = path.join(authorsDir, `${slug}.json`);
    fs.writeFileSync(jsonFilePath, JSON.stringify(authorData, null, 2), 'utf-8');

    revalidatePath('/dashboard/authors');

    return { success: true };
}
