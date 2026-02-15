import Link from 'next/link';
import { getArticles } from '@/lib/data';
import {
    Users,
    FileText,
    Eye,
    TrendingUp,
    ArrowUpRight,
    MoreHorizontal,
    Plus
} from 'lucide-react';

import { StatsCard } from '@/components/dashboard/StatsCard';

export default async function DashboardPage() {
    const articles = await getArticles();
    const totalPosts = articles.length;
    // Mock data for other stats
    const totalViews = 125430;
    const activeUsers = 342;

    // Mock recent activity based on real articles
    const recentArticles = articles.slice(0, 5);

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Overview</h2>
                    <p className="text-slate-500">Welcome back, here's what's happening today.</p>
                </div>
                <Link href="/dashboard/create-post" className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-lg shadow-red-600/20">
                    <Plus size={18} />
                    <span className="font-medium">Create New Post</span>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Posts"
                    value={totalPosts.toString()}
                    icon={FileText}
                    trend="+2.5%"
                    trendUp={true}
                />
                <StatsCard
                    title="Total Views"
                    value={totalViews.toLocaleString()}
                    icon={Eye}
                    trend="+12%"
                    trendUp={true}
                />
                <StatsCard
                    title="Active Users"
                    value={activeUsers.toString()}
                    icon={Users}
                    trend="+4%"
                    trendUp={true}
                />
                <StatsCard
                    title="Engagement Rate"
                    value="58.3%"
                    icon={TrendingUp}
                    trend="-1.2%"
                    trendUp={false}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-7">
                {/* Simple Chart Placeholder (Custom CSS/SVG) */}
                <div className="col-span-4 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                    <div className="mb-4">
                        <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">Traffic Overview</h3>
                        <p className="text-sm text-slate-500">Daily visitors over the last 7 days</p>
                    </div>
                    <div className="h-[300px] w-full flex items-end justify-between gap-2 px-2">
                        {[65, 40, 80, 55, 90, 70, 85].map((height, i) => (
                            <div key={i} className="w-full bg-red-100 dark:bg-red-900/20 rounded-t-md relative group hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors cursor-pointer">
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-red-500 rounded-t-md transition-all duration-500"
                                    style={{ height: `${height}%` }}
                                ></div>
                                {/* Tooltip */}
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {height * 100}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-slate-400">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="col-span-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">Recent Posts</h3>
                        <Link href="/keystatic/collection/posts" className="text-sm text-red-600 hover:underline flex items-center gap-1">
                            View All <ArrowUpRight size={14} />
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentArticles.length > 0 ? recentArticles.map((article) => (
                            <div key={article.id} className="flex items-start gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition group">
                                <div className="w-10 h-10 rounded bg-slate-200 dark:bg-slate-800 shrink-0 overflow-hidden">
                                    {/* Placeholder for image if needed, or use next/image */}
                                    {article.image ? <img src={article.image} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-400"><FileText size={16} /></div>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-slate-800 dark:text-slate-100 truncate group-hover:text-red-600 transition">{article.title}</p>
                                    <p className="text-xs text-slate-500">{article.publishedAt} • {article.author}</p>
                                </div>
                                <button className="text-slate-400 hover:text-slate-600">
                                    <MoreHorizontal size={16} />
                                </button>
                            </div>
                        )) : (
                            <div className="text-center py-10 text-slate-400">No posts yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

