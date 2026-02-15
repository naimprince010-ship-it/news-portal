import { Eye, Clock, ArrowUpRight } from 'lucide-react';

const TOP_POSTS = [
    { id: 1, title: 'Bangladesh Win Historical Series', views: '24.5k', time: '4m 32s', trend: '+12%' },
    { id: 2, title: 'New Metro Rail Schedule Announced', views: '18.2k', time: '3m 15s', trend: '+8%' },
    { id: 3, title: 'Global Tech Summit Highlights', views: '12.4k', time: '5m 45s', trend: '+5%' },
    { id: 4, title: 'Top 10 Travel Destinations for 2026', views: '9.8k', time: '2m 50s', trend: '-2%' },
    { id: 5, title: 'Economic Review: Q3 Report', views: '8.1k', time: '6m 10s', trend: '+1%' },
];

export function TopPostsTable() {
    return (
        <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">Top Performing Posts</h3>
                <p className="text-sm text-slate-500">Most viewed articles this week</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-3">Article Title</th>
                            <th className="px-6 py-3">Views</th>
                            <th className="px-6 py-3">Avg. Time</th>
                            <th className="px-6 py-3">Trend</th>
                            <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {TOP_POSTS.map((post) => (
                            <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group">
                                <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">{post.title}</td>
                                <td className="px-6 py-4 flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <Eye size={14} /> {post.views}
                                </td>
                                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                    <span className="flex items-center gap-2">
                                        <Clock size={14} /> {post.time}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${post.trend.startsWith('+') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                        {post.trend}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-red-600 transition">
                                        <ArrowUpRight size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
