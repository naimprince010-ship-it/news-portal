import Image from 'next/image';
import Link from 'next/link';
import { getArticles } from '@/lib/data';

export async function generateStaticParams() {
    const articles = await getArticles();
    const categories = Array.from(new Set(articles.map((post) => post.category)));
    return categories.map((category) => ({
        category,
    }));
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>
}) {
    const { category } = await params
    const allArticles = await getArticles();
    const categoryArticles = allArticles.filter((p) => p.category === category);

    return (
        <div>
            <div className="flex items-center justify-between mb-6 border-b-2 border-gray-200 pb-2">
                <h1 className="text-3xl font-bold text-red-600 capitalize">{category}</h1>
            </div>

            {categoryArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoryArticles.map((item) => (
                        <Link key={item.id} href={`/news/${item.id}`} className="card group block">
                            <div className="relative aspect-[3/2] w-full overflow-hidden rounded mb-3 bg-gray-100 dark:bg-gray-800">
                                {item.image && (
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition"
                                    />
                                )}
                            </div>
                            <h3 className="font-bold text-lg group-hover:text-red-600 dark:group-hover:text-red-500 transition leading-snug mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                {item.excerpt}
                            </p>
                            <span className="text-xs text-gray-400 dark:text-gray-500 mt-2 block">{item.publishedAt}</span>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center text-gray-500">
                    This category has no posts yet.
                </div>
            )}
        </div>
    );
}
