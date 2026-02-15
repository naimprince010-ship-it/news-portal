"use client";

import Link from 'next/link';
import { Menu, User } from 'lucide-react';
import SearchInput from './Search';
import { ModeToggle } from './mode-toggle';
import { useState } from 'react';
import MegaMenu from './MegaMenu';
import UserButton from './UserButton';

export default function Header({ user }: { user?: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentDate = new Date().toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Top Bar (Date, Socials, Edition) */}
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 hidden md:flex">
          <div>{currentDate}</div>
          <div className="flex gap-4">
            <Link href="/english" className="hover:text-red-600 transition">English</Link>
            <Link href="/epaper" className="hover:text-red-600 transition">ই-পেপার</Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Mobile Menu & Logo */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="text-3xl font-bold text-red-600 font-serif">
              প্রথম আলো
              {/* Ideally replace with actual SVG logo */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 font-medium text-gray-800 dark:text-gray-200">
            <Link href="/latest" className="hover:text-red-600 dark:hover:text-red-500 transition">সর্বশেষ</Link>
            <Link href="/bangladesh" className="hover:text-red-600 dark:hover:text-red-500 transition">বাংলাদেশ</Link>
            <Link href="/politics" className="hover:text-red-600 dark:hover:text-red-500 transition">রাজনীতি</Link>
            <Link href="/world" className="hover:text-red-600 dark:hover:text-red-500 transition">বিশ্ব</Link>
            <Link href="/sports" className="hover:text-red-600 dark:hover:text-red-500 transition">খেলা</Link>
            <Link href="/entertainment" className="hover:text-red-600 dark:hover:text-red-500 transition">বিনোদন</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <SearchInput />
            <ModeToggle />
            <UserButton user={user} />
            <button className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>
      <MegaMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
