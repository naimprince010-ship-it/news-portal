import Image from 'next/image';
import Link from 'next/link';
import { getArticles } from '@/lib/data';

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q: string }>
}) {
    const { q } = await searchParams;
    const query = q?.toLowerCase() || '';

    const allArticles = await getArticles();

    const results = allArticles.filter(
        (item) =>
            item.title.toLowerCase().includes(query) ||
            item.excerpt.toLowerCase().includes(query)
    );

    return (
        <div>
            <div className="flex items-center justify-between mb-6 border-b-2 border-gray-200 pb-2">
                <h1 className="text-2xl font-bold text-gray-800">
                    অনুসন্ধান ফলাফল: <span className="text-red-600">"{q}"</span>
                </h1>
                <span className="text-gray-500 text-sm">{results.length} টি ফলাফল পাওয়া গেছে</span>
            </div>

            {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {results.map((item) => (
                        <Link key={item.id} href={`/news/${item.id}`} className="card group block">
                            <div className="relative aspect-[3/2] w-full overflow-hidden rounded mb-3">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition"
                                />
                            </div>
                            <h3 className="font-bold text-lg group-hover:text-red-600 transition leading-snug mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {item.excerpt}
                            </p>
                            <span className="text-xs text-gray-400 mt-2 block">{item.publishedAt}</span>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-xl">কোনো ফলাফল পাওয়া যায়নি</p>
                    <p className="text-sm mt-2">অন্য কোনো শব্দ দিয়ে খুঁজুন</p>
                </div>
            )}
        </div>
    );
}
