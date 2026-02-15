import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    description?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, trendUp, description }: StatsCardProps) {
    return (
        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-500">{title}</h3>
                <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg">
                    <Icon className="text-slate-500 dark:text-slate-400" size={20} />
                </div>
            </div>
            <div className="space-y-1">
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</div>
                {(trend || description) && (
                    <div className="flex items-center gap-2 text-xs">
                        {trend && (
                            <span className={cn("font-medium px-2 py-0.5 rounded-full", trendUp ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400')}>
                                {trend}
                            </span>
                        )}
                        {description && <span className="text-slate-400">{description}</span>}
                    </div>
                )}
            </div>
        </div>
    );
}
