'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search as SearchIcon, X } from 'lucide-react';

export default function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setIsOpen(false);
        }
    };

    return (
        <div className="relative">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                    <SearchIcon className="w-5 h-5 text-gray-600" />
                </button>
            ) : (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white border border-gray-300 rounded-full pl-4 pr-2 py-1 shadow-lg w-[200px] md:w-[300px]">
                    <form onSubmit={handleSearch} className="flex-1">
                        <input
                            type="text"
                            placeholder="খুঁজুন..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full focus:outline-none text-sm"
                            autoFocus
                        />
                    </form>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 hover:bg-gray-100 rounded-full ml-1"
                    >
                        <X className="w-4 h-4 text-gray-500" />
                    </button>
                </div>
            )}
        </div>
    );
}
