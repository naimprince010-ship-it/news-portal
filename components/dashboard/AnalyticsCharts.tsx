'use client';

export function AnalyticsCharts() {
    return (
        <div className="grid lg:grid-cols-3 gap-6">
            {/* Traffic Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                <div className="mb-6">
                    <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">Traffic Overview</h3>
                    <p className="text-sm text-slate-500">Daily unique visitors over the past 30 days</p>
                </div>

                {/* Custom CSS Bar Chart */}
                <div className="h-[300px] w-full flex items-end justify-between gap-1 sm:gap-2">
                    {Array.from({ length: 14 }).map((_, i) => {
                        const height = Math.floor(Math.random() * (100 - 20) + 20);
                        return (
                            <div key={i} className="w-full bg-slate-100 dark:bg-slate-900 rounded-t-sm relative group hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-red-500 rounded-t-sm transition-all duration-500 group-hover:bg-red-600"
                                    style={{ height: `${height}%` }}
                                ></div>
                                {/* Tooltip */}
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                    {height * 12} Visitors
                                    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-between mt-4 text-xs text-slate-400 border-t border-slate-100 dark:border-slate-900 pt-2">
                    <span>Oct 1</span>
                    <span>Oct 8</span>
                    <span>Oct 15</span>
                    <span>Oct 22</span>
                    <span>Oct 29</span>
                </div>
            </div>

            {/* Device Stats */}
            <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                <div className="mb-6">
                    <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">Devices</h3>
                    <p className="text-sm text-slate-500">Visitors by device type</p>
                </div>

                <div className="space-y-6">
                    <DeviceItem label="Desktop" percent={58} color="bg-red-500" />
                    <DeviceItem label="Mobile" percent={32} color="bg-blue-500" />
                    <DeviceItem label="Tablet" percent={8} color="bg-green-500" />
                    <DeviceItem label="Other" percent={2} color="bg-slate-500" />
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-900">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Most used OS</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200">Windows 11</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DeviceItem({ label, percent, color }: { label: string, percent: number, color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
                <span className="text-slate-500">{percent}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    );
}
