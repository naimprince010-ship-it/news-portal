'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAuthor } from '@/app/actions/create-author';
import { Upload, X, Loader2, Save } from 'lucide-react';

export function CreateAuthorForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);

        try {
            await createAuthor(formData);
            router.push('/dashboard/authors');
            router.refresh();
        } catch (error) {
            console.error('Failed to create author:', error);
            alert('Failed to create author. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
            <div className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Author Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="flex h-12 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-red-900"
                        placeholder="e.g. John Doe"
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="flex h-12 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-red-900"
                        placeholder="john@example.com"
                    />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                    <label htmlFor="bio" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Bio
                    </label>
                    <textarea
                        name="bio"
                        id="bio"
                        rows={4}
                        className="flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base ring-offset-background placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-red-900 resize-none"
                        placeholder="Short biography..."
                    />
                </div>

                {/* Avatar Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Profile Picture
                    </label>
                    <div className="flex items-center gap-6">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <Upload size={24} />
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 dark:file:bg-red-900/30 dark:file:text-red-400 transition"
                            />
                            <p className="mt-1 text-xs text-slate-500">JPG, GIF or PNG. Max 1MB.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded-lg font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded-lg font-medium shadow-lg shadow-red-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    {isLoading ? 'Saving...' : 'Create Author'}
                </button>
            </div>
        </form>
    );
}
