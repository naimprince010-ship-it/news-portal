"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    BarChart3,
    Globe
} from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: FileText, label: "Posts", href: "/keystatic/collection/posts" }, // Direct link to CMS
    { icon: Users, label: "Authors", href: "/dashboard/authors" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "bg-slate-900 text-white min-h-screen transition-all duration-300 flex flex-col relative z-20",
                collapsed ? "w-20" : "w-64"
            )}
        >
            {/* Brand */}
            <div className="h-16 flex items-center justify-center border-b border-slate-800">
                <div className={cn("flex items-center gap-2 font-bold text-xl transition-all overflow-hidden", collapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
                    <span className="text-red-500">PA</span>
                    <span>Admin</span>
                </div>
                {collapsed && <span className="font-bold text-red-500 text-xl">PA</span>}
            </div>

            {/* Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-20 bg-red-600 text-white p-1 rounded-full shadow-lg hover:bg-red-700 transition"
            >
                {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-2">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group",
                                isActive
                                    ? "bg-red-600 text-white shadow-md shadow-red-900/20"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon size={20} className={cn("shrink-0 transition", isActive && "text-white")} />
                            <span className={cn("whitespace-nowrap transition-all duration-300 origin-left", collapsed && "scale-0 w-0 opacity-0")}>
                                {item.label}
                            </span>

                            {/* Tooltip for collapsed state */}
                            {collapsed && (
                                <div className="absolute left-16 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-800 space-y-2">
                <Link href="/" className={cn("flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition", collapsed && "justify-center")}>
                    <Globe size={20} />
                    {!collapsed && <span>View Site</span>}
                </Link>
                <button className={cn("flex items-center gap-3 px-3 py-2 w-full rounded-lg text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors", collapsed && "justify-center")}>
                    <LogOut size={20} />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
}
