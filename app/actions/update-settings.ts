'use server';

import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

const SETTINGS_FILE_PATH = path.join(process.cwd(), 'content', 'settings.json');

export async function updateSettings(formData: FormData) {
    const settings: Record<string, any> = {};

    formData.forEach((value, key) => {
        // Exclude system fields if any
        if (!key.startsWith('$')) {
            settings[key] = value;
        }
    });

    // Ensure content directory exists
    const contentDir = path.dirname(SETTINGS_FILE_PATH);
    if (!fs.existsSync(contentDir)) {
        fs.mkdirSync(contentDir, { recursive: true });
    }

    // Read existing settings to merge
    let existingSettings = {};
    if (fs.existsSync(SETTINGS_FILE_PATH)) {
        try {
            const fileContent = fs.readFileSync(SETTINGS_FILE_PATH, 'utf-8');
            existingSettings = JSON.parse(fileContent);
        } catch (e) {
            console.error("Error reading existing settings", e);
        }
    }

    const newSettings = { ...existingSettings, ...settings };

    fs.writeFileSync(SETTINGS_FILE_PATH, JSON.stringify(newSettings, null, 2), 'utf-8');

    revalidatePath('/dashboard/settings');
    revalidatePath('/'); // Revalidate root in case site name changes affects layout

    return { success: true };
}

export async function getSettings() {
    if (fs.existsSync(SETTINGS_FILE_PATH)) {
        try {
            const fileContent = fs.readFileSync(SETTINGS_FILE_PATH, 'utf-8');
            return JSON.parse(fileContent);
        } catch (e) {
            console.error("Error reading settings", e);
            return {};
        }
    }
    return {};
}
