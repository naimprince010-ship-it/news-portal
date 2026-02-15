"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DashboardSearch() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            // Redirect to public search for now, as it visualizes the content.
            // In a real app, this might search the CMS API directly and show a table.
            window.open(`/search?q=${encodeURIComponent(query)}`, '_blank');
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative hidden md:block w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
                type="text"
                placeholder="Search content..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border-none rounded-lg focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </form>
    );
}
