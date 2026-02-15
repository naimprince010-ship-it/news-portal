import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6">
            <div className="container mx-auto px-4">
                {/* Top Section: Logo and Socials */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-8">
                    <div className="text-4xl font-bold text-white mb-4 md:mb-0">প্রথম আলো</div>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition"><Facebook className="w-5 h-5" /></a>
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-400 transition"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 transition"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition"><Youtube className="w-5 h-5" /></a>
                    </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-sm text-gray-400">
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase">খবর</h3>
                        <ul className="space-y-2">
                            <li><Link href="/bangladesh" className="hover:text-white transition">বাংলাদেশ</Link></li>
                            <li><Link href="/world" className="hover:text-white transition">বিশ্ব</Link></li>
                            <li><Link href="/sports" className="hover:text-white transition">খেলা</Link></li>
                            <li><Link href="/entertainment" className="hover:text-white transition">বিনোদন</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase">ফিচার</h3>
                        <ul className="space-y-2">
                            <li><Link href="/lifestyle" className="hover:text-white transition">জীবনযাপন</Link></li>
                            <li><Link href="/technology" className="hover:text-white transition">বিজ্ঞান ও প্রযুক্তি</Link></li>
                            <li><Link href="/opinion" className="hover:text-white transition">মতামত</Link></li>
                            <li><Link href="/cartoon" className="hover:text-white transition">কার্টুন</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase">অন্যান্য</h3>
                        <ul className="space-y-2">
                            <li><Link href="/videos" className="hover:text-white transition">ভিডিও</Link></li>
                            <li><Link href="/images" className="hover:text-white transition">ছবি</Link></li>
                            <li><Link href="/archive" className="hover:text-white transition">আর্কাইভ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase">যোগাযোগ</h3>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="hover:text-white transition">আমাদের সম্পর্কে</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition">যোগাযোগ করুন</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition">শর্তাবলী</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition">গোপনীয়তা নীতি</Link></li>
                            <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="text-center text-gray-500 text-xs border-t border-gray-800 pt-6">
                    © {new Date().getFullYear()} Prothom Alo Clone. All rights reserved. | Developed by Next.js
                </div>
            </div>
        </footer>
    );
}
