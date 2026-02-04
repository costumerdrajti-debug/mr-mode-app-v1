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
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [itemCount, setItemCount] = useState(0); // من الـ Cart Context

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
            <div className="bg-white text-black border-b border-gray-100 hidden lg:block">
                <div className="max-w-7xl mx-auto px-6 py-2.5 flex justify-between items-center text-[10px] uppercase tracking-widest font-medium">
                    {/* Left Side */}
                    <div className="flex gap-4 items-center">
                        <a
                            href={`https://wa.me/${PHONE_NUMBER}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 hover:text-luxury-gold transition-colors"
                        >
                            <Phone size={10} />
                            <span>+212 653 421 432</span>
                        </a>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-600">{t.topBar.freeShipping}</span>
                    </div>

                    {/* Right Side - Language Switcher */}
                    <div className="flex items-center gap-3">
                        <Globe size={12} className="text-gray-400" />
                        <div className="flex items-center gap-2">
                            {LANGUAGES.map((language, index) => (
                                <div key={language.code} className="flex items-center gap-2">
                                    <Link
                                        href={`/${language.code}${getCurrentPath()}`}
                                        className={`transition-colors ${lang === language.code
                                            ? 'text-luxury-gold font-bold'
                                            : 'text-gray-500 hover:text-luxury-dark'
                                            }`}
                                    >
                                        {language.label}
                                    </Link>
                                    {index < LANGUAGES.length - 1 && (
                                        <span className="text-gray-300">/</span>
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
                    ? 'bg-white/95 backdrop-blur-md shadow-lg'
                    : 'bg-white'
                    } border-b border-gray-100`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-20">

                        {/* Left Icons */}
                        <div className="flex items-center gap-2 lg:flex-1">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 hover:bg-gray-50 rounded-full transition-colors text-luxury-dark"
                                aria-label="Search"
                            >
                                <Search size={20} strokeWidth={1.5} />
                            </button>
                            <button
                                className="hidden sm:block p-2 hover:bg-gray-50 rounded-full transition-colors text-luxury-dark"
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
                                <Crown className="w-6 h-6 text-luxury-gold transition-transform group-hover:scale-110" />
                                <span className="text-3xl font-serif font-black tracking-tighter text-luxury-dark">
                                    MR. <span className="text-luxury-gold italic">MODE</span>
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
                                        ? 'text-luxury-gold'
                                        : 'text-gray-600 hover:text-luxury-gold'
                                        }`}
                                >
                                    {t.nav.home}
                                </Link>
                                <Link
                                    href={`/${lang}/shop`}
                                    className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${pathname.includes('/shop')
                                        ? 'text-luxury-gold'
                                        : 'text-gray-600 hover:text-luxury-gold'
                                        }`}
                                >
                                    {t.nav.shop}
                                </Link>
                                <Link
                                    href={`/${lang}/about`}
                                    className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${pathname.includes('/about')
                                        ? 'text-luxury-gold'
                                        : 'text-gray-600 hover:text-luxury-gold'
                                        }`}
                                >
                                    {t.nav.about}
                                </Link>
                                <Link
                                    href={`/${lang}/contact`}
                                    className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${pathname.includes('/contact')
                                        ? 'text-luxury-gold'
                                        : 'text-gray-600 hover:text-luxury-gold'
                                        }`}
                                >
                                    {t.nav.contact}
                                </Link>
                            </div>

                            {/* Cart Button */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2.5 bg-luxury-dark text-white rounded-full hover:bg-luxury-gold transition-colors duration-300 shadow-lg"
                                aria-label="Shopping Cart"
                            >
                                <ShoppingBag size={20} strokeWidth={1.5} />
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-luxury-gold text-white rounded-full text-[10px] flex items-center justify-center font-bold border-2 border-white">
                                        {itemCount}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden p-2 text-luxury-dark"
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
                <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-32">
                    <div className="bg-white w-full max-w-2xl mx-4 rounded-lg shadow-2xl p-8">
                        <div className="flex items-center gap-4">
                            <Search className="text-gray-400" size={24} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="flex-1 text-lg outline-none"
                                autoFocus
                            />
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full"
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
                <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
                    <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="font-serif text-2xl">Menu</h3>
                                <button onClick={() => setIsMobileMenuOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="space-y-4">
                                <Link
                                    href={`/${lang}`}
                                    className="block py-3 text-lg font-semibold border-b"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t.nav.home}
                                </Link>
                                <Link
                                    href={`/${lang}/shop`}
                                    className="block py-3 text-lg font-semibold border-b"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t.nav.shop}
                                </Link>
                                <Link
                                    href={`/${lang}/about`}
                                    className="block py-3 text-lg font-semibold border-b"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t.nav.about}
                                </Link>
                                <Link
                                    href={`/${lang}/contact`}
                                    className="block py-3 text-lg font-semibold border-b"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t.nav.contact}
                                </Link>
                            </nav>

                            {/* Mobile Language Switcher */}
                            <div className="mt-8 pt-8 border-t">
                                <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                                    <Globe size={16} /> Language
                                </p>
                                <div className="space-y-2">
                                    {LANGUAGES.map((language) => (
                                        <Link
                                            key={language.code}
                                            href={`/${language.code}${getCurrentPath()}`}
                                            className={`block py-2 px-4 rounded ${lang === language.code
                                                ? 'bg-luxury-gold text-white'
                                                : 'bg-gray-100 text-gray-700'
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