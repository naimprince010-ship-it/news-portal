import Link from 'next/link';
import { reader } from '@/lib/reader';
import { Plus, User } from 'lucide-react';

export default async function AuthorsPage() {
    const authors = await reader.collections.authors.all();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Authors</h2>
                    <p className="text-slate-500">Manage your content creation team.</p>
                </div>
                <Link href="/dashboard/authors/create" className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-lg shadow-red-600/20">
                    <Plus size={18} />
                    <span className="font-medium">Add New Author</span>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {authors.length > 0 ? (
                    authors.map((author) => (
                        <div key={author.slug} className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800">
                                {author.entry.avatar ? (
                                    <img src={author.entry.avatar} alt={author.entry.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        <User size={24} />
                                    </div>
                                )}
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100 truncate">{author.entry.name}</h3>
                                {author.entry.email && <p className="text-sm text-slate-500 truncate">{author.entry.email}</p>}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-500 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
                        <User size={48} className="mb-4 opacity-50" />
                        <h3 className="text-lg font-medium">No Authors Yet</h3>
                        <p className="max-w-sm text-center mt-1">Get started by adding your first author to the team.</p>
                        <Link href="/dashboard/authors/create" className="mt-4 text-red-600 font-medium hover:underline">
                            Add Author
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
