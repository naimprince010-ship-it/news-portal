"use client";

import Link from "next/link";
import { X, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import { useState, useEffect } from "react";

const menuItems = [
    {
        category: "খবর",
        links: [
            { label: "বাংলাদেশ", href: "/bangladesh" },
            { label: "আন্তর্জাতিক", href: "/world" },
            { label: "করোনাভাইরাস", href: "/topic/coronavirus" },
            { label: "রাজধানী", href: "/topic/dhaka" },
        ]
    },
    {
        category: "খেলা",
        links: [
            { label: "ক্রিকেট", href: "/sports/cricket" },
            { label: "ফুটবল", href: "/sports/football" },
            { label: "টেনিস", href: "/sports/tennis" },
        ]
    },
    {
        category: "বিনোদন",
        links: [
            { label: "বলিউড", href: "/entertainment/bollywood" },
            { label: "হলিউড", href: "/entertainment/hollywood" },
            { label: "ঢালিউড", href: "/entertainment/dhallywood" },
            { label: "নাটক", href: "/entertainment/drama" },
        ]
    },
    {
        category: "ফিচার",
        links: [
            { label: "বিজ্ঞান ও প্রযুক্তি", href: "/technology" },
            { label: "জীবনযাপন", href: "/lifestyle" },
            { label: "শিক্ষা", href: "/education" },
            { label: "চাকরি", href: "/jobs" },
        ]
    },
    {
        category: "মতামত",
        links: [
            { label: " সম্পাদকীয়", href: "/opinion/editorial" },
            { label: "সাক্ষাৎকার", href: "/opinion/interview" },
        ]
    },
];

interface MegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}
                onClick={onClose}
            />

            {/* Menu Drawer */}
            <div className={cn(
                "fixed top-0 left-0 h-full w-[300px] md:w-[400px] bg-white dark:bg-slate-950 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-slate-900">
                    <span className="font-bold text-lg text-gray-800 dark:text-gray-100">সব ক্যাটালগ</span>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition"
                    >
                        <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-8">
                        {menuItems.map((section) => (
                            <div key={section.category}>
                                <h3 className="font-bold text-red-600 mb-3 border-b border-gray-100 dark:border-gray-800 pb-1">{section.category}</h3>
                                <ul className="grid grid-cols-1 gap-2">
                                    {section.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition flex items-center group"
                                                onClick={onClose}
                                            >
                                                <ChevronRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-red-600" />
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-slate-900">
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <Link href="/about" className="hover:underline">আমাদের সম্পর্কে</Link>
                        <Link href="/contact" className="hover:underline">যোগাযোগ</Link>
                        <Link href="/privacy" className="hover:underline">গোপনীয়তা নীতি</Link>
                        <Link href="/terms" className="hover:underline">শর্তাবলী</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
