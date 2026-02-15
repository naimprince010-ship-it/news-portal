import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticles, getArticle } from '@/lib/data';
import { Clock, User, Share2, Printer, Bookmark } from 'lucide-react';
import { DocumentRenderer } from '@keystatic/core/renderer';

export async function generateStaticParams() {
    const articles = await getArticles();
    return articles.map((post) => ({
        id: post.id,
    }));
}

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    // Note: 'id' here corresponds to the SLUG in Keystatic logic we set up
    const article = await getArticle(id);

    if (!article) {
        notFound();
    }

    const allArticles = await getArticles();
    const relatedNews = allArticles.filter(a => a.id !== article.id).slice(0, 4);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Article Content - 8 Columns */}
            <article className="lg:col-span-8">
                <div className="mb-4">
                    <Link href={`/${article.category}`} className="text-red-600 font-bold uppercase text-sm hover:underline">
                        {article.category}
                    </Link>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-gray-900 dark:text-gray-100">
                    {article.title}
                </h1>

                <div className="flex items-center justify-between border-y border-gray-100 dark:border-gray-800 py-3 mb-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{article.publishedAt}</span>
                        </div>
                    </div>
                    <div className="flex gap-3 text-gray-400">
                        <button className="hover:text-blue-600 transition"><Share2 className="w-5 h-5" /></button>
                        <button className="hover:text-green-600 transition"><Bookmark className="w-5 h-5" /></button>
                        <button className="hover:text-gray-800 transition"><Printer className="w-5 h-5" /></button>
                    </div>
                </div>

                <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-6 bg-gray-100 dark:bg-gray-800">
                    {article.image && (
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed">
                    <DocumentRenderer document={article.content} />
                </div>

                {/* Tags / Topics (Mock) */}
                <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-2 flex-wrap">
                    <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">বাংলাদেশ</span>
                </div>
            </article>

            {/* Sidebar - 4 Columns */}
            <aside className="lg:col-span-4 space-y-8">
                {/* Related News */}
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                    <h2 className="text-xl font-bold border-l-4 border-red-600 pl-3 mb-4">আরও পড়ুন</h2>
                    <div className="space-y-4">
                        {relatedNews.map((item) => (
                            <Link key={item.id} href={`/news/${item.id}`} className="group block">
                                <div className="flex gap-3">
                                    <div className="relative w-24 h-16 shrink-0 overflow-hidden rounded bg-gray-200 dark:bg-gray-800">
                                        {item.image && (
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition"
                                            />
                                        )}
                                    </div>
                                    <h3 className="text-sm font-medium leading-snug group-hover:text-red-600 dark:group-hover:text-red-500 transition">
                                        {item.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Ad Placeholder */}
                <div className="bg-gray-200 dark:bg-gray-800 h-64 w-full flex items-center justify-center text-gray-500 rounded">
                    বিজ্ঞাপন
                </div>
            </aside>
        </div>
    );
}
