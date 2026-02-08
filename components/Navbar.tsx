// ============================================
// 📁 components/Navbar.tsx - Complete Version
// ============================================

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Search,
    User,
    ShoppingBag,
    Menu,
    Phone,
    Globe,
    Crown,
    X
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

// ============================================
// 📊 TYPES
// ============================================
interface NavbarProps {
    lang: string;
    t: {
        nav: {
            home: string;
            shop: string;
            about: string;
            contact: string;
        };
        topBar: {
            freeShipping: string;
        };
    };
}

// ============================================
// 🔧 CONFIG
// ============================================
const PHONE_NUMBER = '212653421432';

const LANGUAGES = [
    { code: 'ar', label: 'العربية', dir: 'rtl' },
    { code: 'fr', label: 'Français', dir: 'ltr' },
    { code: 'en', label: 'English', dir: 'ltr' },
];

// ============================================
// 🧭 NAVBAR COMPONENT
// ============================================
export default function Navbar({ lang, t }: NavbarProps) {
    const pathname = usePathname();
    const { setIsCartOpen, getItemCount } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const itemCount = getItemCount();

    // Scroll Detection
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Get current path without lang prefix
    const getCurrentPath = () => {
        return pathname.replace(/^\/(ar|fr|en)/, '') || '/';
    };

    return (
        <>
            {/* ============================================
          🔝 TOP BAR - Language Switcher
      ============================================ */}
            <div className="bg-slate-950 text-slate-300 border-b border-white/5 hidden lg:block">
                <div className="max-w-7xl mx-auto px-6 py-2.5 flex justify-between items-center text-[10px] uppercase tracking-widest font-medium">
                    {/* Left Side */}
                    <div className="flex gap-4 items-center">
                        <a
                            href={`https://wa.me/${PHONE_NUMBER}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
                        >
                            <Phone size={10} />
                            <span>+212 653 421 432</span>
                        </a>
                        <span className="text-white/20">|</span>
                        <span className="text-slate-400">{t.topBar.freeShipping}</span>
                    </div>

                    {/* Right Side - Language Switcher */}
                    <div className="flex items-center gap-3">
                        <Globe size={12} className="text-slate-500" />
                        <div className="flex items-center gap-2">
                            {LANGUAGES.map((language, index) => (
                                <div key={language.code} className="flex items-center gap-2">
                                    <Link
                                        href={`/${language.code}${getCurrentPath()}`}
                                        className={`transition-colors ${lang === language.code
                                            ? 'text-emerald-300 font-bold'
                                            : 'text-slate-500 hover:text-white'
                                            }`}
                                    >
                                        {language.label}
                                    </Link>
                                    {index < LANGUAGES.length - 1 && (
                                        <span className="text-white/20">/</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================
          🧭 MAIN NAVIGATION
      ============================================ */}
            <nav
                className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-slate-950/95 backdrop-blur-md shadow-lg shadow-black/20'
                    : 'bg-slate-950'
                    } border-b border-white/5`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-20">

                        {/* Left Icons */}
                        <div className="flex items-center gap-2 lg:flex-1">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-300"
                                aria-label="Search"
                            >
                                <Search size={20} strokeWidth={1.5} />
                            </button>
                            <button
                                className="hidden sm:block p-2 hover:bg-white/5 rounded-full transition-colors text-slate-300"
                                aria-label="Account"
                            >
                                <User size={20} strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Center Logo */}
                        <Link
                            href={`/${lang}`}
                            className="lg:flex-none group"
                        >
                            <div className="flex items-center gap-2">
                                <Crown className="w-6 h-6 text-emerald-300 transition-transform group-hover:scale-110" />
                                <span className="text-3xl font-serif font-black tracking-tighter text-white">
                                    MR. <span className="text-emerald-300 italic">MODE</span>
                                </span>
                            </div>
                        </Link>

                        {/* Right Menu & Cart */}
                        <div className="flex items-center gap-2 lg:flex-1 justify-end">
                            {/* Desktop Menu */}
                            <div className="hidden lg:flex items-center gap-1 mr-4">
                                <Link
                                    href={`/${lang}`}
                                    className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${pathname === `/${lang}` || pathname === `/${lang}/`
                                        ? 'text-emerald-300'
                                        : 'text-slate-400 hover:text-emerald-300'
                                        }`}
                                >
                                    {t.nav.home}
                                </Link>
                                <Link
                                    href={`/${lang}#products`}
                                    className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors text-slate-400 hover:text-emerald-300`}
                                >
                                    {t.nav.shop}
                                </Link>
                                <Link
                                    href={`/${lang}/about`}
                                    className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${pathname.includes('/about')
                                        ? 'text-emerald-300'
                                        : 'text-slate-400 hover:text-emerald-300'
                                        }`}
                                >
                                    {t.nav.about}
                                </Link>
                                <Link
                                    href={`/${lang}/contact`}
                                    className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${pathname.includes('/contact')
                                        ? 'text-emerald-300'
                                        : 'text-slate-400 hover:text-emerald-300'
                                        }`}
                                >
                                    {t.nav.contact}
                                </Link>
                            </div>

                            {/* Cart Button */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2.5 bg-emerald-400 text-slate-900 rounded-full hover:bg-emerald-300 transition-colors duration-300 shadow-lg"
                                aria-label="Shopping Cart"
                            >
                                <ShoppingBag size={20} strokeWidth={1.5} />
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold border-2 border-slate-950">
                                        {itemCount}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden p-2 text-slate-300"
                                onClick={() => setIsMobileMenuOpen(true)}
                                aria-label="Menu"
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ============================================
          🔍 SEARCH OVERLAY (Optional)
      ============================================ */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-32">
                    <div className="bg-slate-900 border border-white/10 w-full max-w-2xl mx-4 rounded-2xl shadow-2xl p-8">
                        <div className="flex items-center gap-4">
                            <Search className="text-emerald-300" size={24} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="flex-1 text-lg outline-none bg-transparent text-white placeholder-slate-500"
                                autoFocus
                            />
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full text-slate-400"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ============================================
          📱 MOBILE MENU (Optional)
      ============================================ */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/70 z-50 lg:hidden">
                    <div className="absolute right-0 top-0 h-full w-80 bg-slate-900 border-l border-white/10 shadow-2xl">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="font-serif text-2xl text-white">Menu</h3>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="space-y-4">
                                <Link
                                    href={`/${lang}`}
                                    className="block py-3 text-lg font-semibold border-b border-white/10 text-slate-200 hover:text-emerald-300 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t.nav.home}
                                </Link>
                                <Link
                                    href={`/${lang}#products`}
                                    className="block py-3 text-lg font-semibold border-b border-white/10 text-slate-200 hover:text-emerald-300 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t.nav.shop}
                                </Link>
                                <Link
                                    href={`/${lang}/about`}
                                    className="block py-3 text-lg font-semibold border-b border-white/10 text-slate-200 hover:text-emerald-300 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t.nav.about}
                                </Link>
                                <Link
                                    href={`/${lang}/contact`}
                                    className="block py-3 text-lg font-semibold border-b border-white/10 text-slate-200 hover:text-emerald-300 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t.nav.contact}
                                </Link>
                            </nav>

                            {/* Mobile Language Switcher */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <p className="text-sm text-slate-400 mb-4 flex items-center gap-2">
                                    <Globe size={16} /> Language
                                </p>
                                <div className="space-y-2">
                                    {LANGUAGES.map((language) => (
                                        <Link
                                            key={language.code}
                                            href={`/${language.code}${getCurrentPath()}`}
                                            className={`block py-2 px-4 rounded-lg ${lang === language.code
                                                ? 'bg-emerald-400 text-slate-900 font-bold'
                                                : 'bg-white/5 text-slate-300 hover:bg-white/10'
                                                }`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {language.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}