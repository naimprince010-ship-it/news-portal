'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/app/actions/create-post';
import { Upload, X, Loader2, Save, Bold, Italic, List, ListOrdered, Link as LinkIcon, Quote, Code, Heading1, Heading2, Heading3 } from 'lucide-react';

const CATEGORIES = [
    { label: 'Bangladesh', value: 'bangladesh' },
    { label: 'International', value: 'world' },
    { label: 'Sports', value: 'sports' },
    { label: 'Entertainment', value: 'entertainment' },
    { label: 'Lifestyle', value: 'lifestyle' },
    { label: 'Politics', value: 'politics' },
];

export function CreatePostForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [content, setContent] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Helper to insert markdown at cursor position
    const insertMarkdown = (prefix: string, suffix: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const selection = text.substring(start, end);
        const after = text.substring(end);

        const newText = before + prefix + selection + suffix + after;
        setContent(newText);

        // Reset cursor/selection
        setTimeout(() => {
            textarea.focus();
            const newCursorPos = start + prefix.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos + selection.length);
        }, 0);
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const excerpt = formData.get('excerpt') as string;

        // Basic validation
        if (!excerpt) {
            // If excerpt is empty, take first 150 chars of content
            const content = formData.get('content') as string;
            formData.set('excerpt', content.substring(0, 150) + '...');
        }

        try {
            await createPost(formData);
            router.push('/dashboard');
            router.refresh();
        } catch (error) {
            console.error('Failed to create post:', error);
            alert('Failed to create post. Please try again.');
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
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
                {/* Title */}
                <div className="md:col-span-2 space-y-2">
                    <label htmlFor="title" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Post Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        className="flex h-12 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-red-900"
                        placeholder="Enter an engaging title..."
                    />
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="category"
                        id="category"
                        required
                        className="flex h-12 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-red-900"
                    >
                        <option value="" disabled selected>Select a category</option>
                        {CATEGORIES.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>
                </div>

                {/* Author */}
                <div className="space-y-2">
                    <label htmlFor="author" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Author Name
                    </label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        defaultValue="Admin"
                        className="flex h-12 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-red-900"
                    />
                </div>

                {/* Cover Image Upload */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Cover Image
                    </label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-center cursor-pointer relative group">
                        <input
                            type="file"
                            name="coverImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {imagePreview ? (
                            <div className="relative w-full h-64 rounded-lg overflow-hidden">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImagePreview(null);
                                    }}
                                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full backdrop-blur-sm transition"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                                <Upload size={40} />
                                <p className="font-medium">Click or drag image to upload</p>
                                <p className="text-xs">SVG, PNG, JPG or GIF (max. 5MB)</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Excerpt */}
                <div className="md:col-span-2 space-y-2">
                    <label htmlFor="excerpt" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Excerpt (Short Summary)
                    </label>
                    <textarea
                        name="excerpt"
                        id="excerpt"
                        rows={3}
                        className="flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base ring-offset-background placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-red-900 resize-none"
                        placeholder="Brief summary of the post..."
                    />
                </div>

                {/* Content */}
                <div className="md:col-span-2 space-y-2">
                    <label htmlFor="content" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Content <span className="text-red-500">*</span>
                    </label>

                    <div className="border border-slate-300 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-950 focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 dark:focus-within:ring-red-900 ring-offset-background transition-shadow">
                        {/* Toolbar */}
                        <div className="flex items-center gap-1 p-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 overflow-x-auto">
                            <ToolbarButton
                                icon={<Heading1 size={18} />}
                                label="Heading 1"
                                onClick={() => insertMarkdown('# ', '')}
                            />
                            <ToolbarButton
                                icon={<Heading2 size={18} />}
                                label="Heading 2"
                                onClick={() => insertMarkdown('## ', '')}
                            />
                            <ToolbarButton
                                icon={<Heading3 size={18} />}
                                label="Heading 3"
                                onClick={() => insertMarkdown('### ', '')}
                            />
                            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1" />
                            <ToolbarButton
                                icon={<Bold size={18} />}
                                label="Bold"
                                onClick={() => insertMarkdown('**', '**')}
                            />
                            <ToolbarButton
                                icon={<Italic size={18} />}
                                label="Italic"
                                onClick={() => insertMarkdown('*', '*')}
                            />
                            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1" />
                            <ToolbarButton
                                icon={<List size={18} />}
                                label="Bullet List"
                                onClick={() => insertMarkdown('- ', '')}
                            />
                            <ToolbarButton
                                icon={<ListOrdered size={18} />}
                                label="Numbered List"
                                onClick={() => insertMarkdown('1. ', '')}
                            />
                            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1" />
                            <ToolbarButton
                                icon={<LinkIcon size={18} />}
                                label="Link"
                                onClick={() => insertMarkdown('[', '](url)')}
                            />
                            <ToolbarButton
                                icon={<Quote size={18} />}
                                label="Quote"
                                onClick={() => insertMarkdown('> ', '')}
                            />
                            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1" />
                            <ToolbarButton
                                icon={<Code size={18} />}
                                label="Code Block"
                                onClick={() => insertMarkdown('```\n', '\n```')}
                            />
                        </div>

                        <textarea
                            name="content"
                            id="content"
                            required
                            rows={20}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            ref={textareaRef}
                            className="flex w-full px-4 py-3 text-base bg-transparent placeholder:text-slate-400 focus:outline-none font-mono text-slate-800 dark:text-slate-200 resize-y min-h-[400px]"
                            placeholder="# Write your amazing article here..."
                        />
                    </div>
                    <p className="text-xs text-slate-500 text-right">Markdown supported</p>
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
                    {isLoading ? 'Publishing...' : 'Publish Post'}
                </button>
            </div>
        </form>
    );
}

function ToolbarButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={label}
            className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
        >
            {icon}
        </button>
    );
}
