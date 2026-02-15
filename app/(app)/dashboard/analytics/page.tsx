import { StatsCard } from '@/components/dashboard/StatsCard';
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts';
import { TopPostsTable } from '@/components/dashboard/TopPostsTable';
import { Users, Eye, TrendingUp, Clock } from 'lucide-react';

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Analytics</h2>
                <p className="text-slate-500">In-depth analysis of your content performance.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Views"
                    value="125,430"
                    icon={Eye}
                    trend="+12%"
                    trendUp={true}
                    description="vs last month"
                />
                <StatsCard
                    title="Active Users"
                    value="842"
                    icon={Users}
                    trend="+5.4%"
                    trendUp={true}
                    description="currently online"
                />
                <StatsCard
                    title="Bounce Rate"
                    value="42.3%"
                    icon={TrendingUp}
                    trend="-2.1%"
                    trendUp={true}
                    description="lower is better"
                />
                <StatsCard
                    title="Avg. Read Time"
                    value="4m 32s"
                    icon={Clock}
                    trend="+12s"
                    trendUp={true}
                    description="per session"
                />
            </div>

            {/* Charts Section */}
            <AnalyticsCharts />

            {/* Top Posts */}
            <TopPostsTable />
        </div>
    );
}
