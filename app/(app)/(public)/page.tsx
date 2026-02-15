import Image from 'next/image';
import Link from 'next/link';
import { getArticles } from '@/lib/data';

export default async function Home() {
  const articles = await getArticles();

  // Handling empty state if no articles exist yet
  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">No articles found.</h1>
        <p>Please visit <Link href="/keystatic" className="text-blue-600 underline">/keystatic</Link> to create some content.</p>
      </div>
    );
  }

  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1, 4);
  const bangladeshArticles = articles.filter(a => a.category === 'bangladesh').slice(0, 6);
  const latestArticles = articles.slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Content Area (Left/Center) - 9 Columns */}
      <div className="lg:col-span-9 space-y-8">
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
          <Link href={`/news/${featuredArticle.id}`} className="md:col-span-8 group block">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4 bg-gray-100 dark:bg-gray-800">
              {featuredArticle.image && (
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  priority
                />
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight group-hover:text-red-600 dark:group-hover:text-red-500 transition mb-2">
              {featuredArticle.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
              {featuredArticle.excerpt}
            </p>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-2 block">{featuredArticle.publishedAt}</span>
          </Link>

          {/* Sub-featured side items */}
          <div className="md:col-span-4 flex flex-col gap-6 border-l border-gray-100 dark:border-gray-800 pl-6">
            {sideArticles.map((item) => (
              <Link key={item.id} href={`/news/${item.id}`} className="group block">
                <div className="relative aspect-video w-full overflow-hidden rounded mb-2 bg-gray-100 dark:bg-gray-800">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition"
                    />
                  )}
                </div>
                <h3 className="font-semibold text-lg leading-snug group-hover:text-red-600 dark:group-hover:text-red-500 transition">
                  {item.title}
                </h3>
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 block">{item.publishedAt}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Category Section: Bangladesh */}
        {bangladeshArticles.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4 border-b-2 border-red-600 pb-2">
              <h2 className="text-xl font-bold text-red-600">বাংলাদেশ</h2>
              <Link href="/bangladesh" className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500">সব খবর &rarr;</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bangladeshArticles.map((item) => (
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
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sidebar (Right) - 3 Columns */}
      <aside className="lg:col-span-3 border-l border-gray-200 dark:border-gray-800 pl-0 lg:pl-8">
        {/* Latest News Tab */}
        <div className="mb-8">
          <div className="flex border-b border-gray-200 dark:border-gray-800 mb-4">
            <button className="flex-1 py-2 font-bold text-red-600 border-b-2 border-red-600">সর্বশেষ</button>
            <button className="flex-1 py-2 font-bold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">জনপ্রিয়</button>
          </div>
          <div className="space-y-4">
            {latestArticles.map((item, index) => (
              <Link key={item.id} href={`/news/${item.id}`} className="flex gap-4 group border-b border-gray-100 dark:border-gray-800 pb-3 last:border-0">
                <span className="text-xl font-bold text-gray-200 dark:text-gray-700 group-hover:text-red-600 dark:group-hover:text-red-500">{index + 1}</span>
                <div>
                  <h4 className="font-medium group-hover:text-red-600 dark:group-hover:text-red-500 transition leading-snug">
                    {item.title}
                  </h4>
                  <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 block">{item.publishedAt}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className='mt-4 text-center'>
            <Link href="/latest" className="inline-block px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-full text-sm font-medium hover:bg-red-600 hover:text-white transition">আরও খবর</Link>
          </div>
        </div>

        {/* Ad Placeholder */}
        <div className="bg-gray-100 dark:bg-gray-800 h-64 w-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm mb-8 rounded">
          বিজ্ঞাপন (Ad Space)
        </div>
      </aside>
    </div>
  );
}
