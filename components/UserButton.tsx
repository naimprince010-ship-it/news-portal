"use client";

import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { handleSignOut } from "@/lib/actions";

export default function UserButton({ user }: { user?: any }) {
    if (!user) {
        return (
            <Link
                href="/login"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium ml-2"
            >
                <User size={18} />
                Login
            </Link>
        );
    }

    return (
        <div className="flex items-center gap-4 ml-4">
            <Link href="/dashboard" className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-red-600 transition">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                    {user.name?.[0] || "U"}
                </div>
                <span className="hidden lg:block">{user.name}</span>
            </Link>
            <form action={handleSignOut}>
                <button className="p-2 text-slate-400 hover:text-red-600 transition" title="Sign Out">
                    <LogOut size={20} />
                </button>
            </form>
        </div>
    );
}
