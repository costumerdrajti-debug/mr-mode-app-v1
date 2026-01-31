'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ChevronDown, ShoppingBag, Heart, User, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

// بيانات القوائم الفرعية (ستُنقل لاحقاً إلى ملف الترجمة)
const getMenuData = (t: any) => ({
    clothing: {
        title: t.menuClothing,
        icon: '👕',
        slug: 'clothing',
        featured: {
            title: t.featuredClothingTitle,
            subtitle: t.featuredClothingSubtitle,
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
            link: '/category/clothing/bestsellers'
        },
        columns: [
            {
                title: t.shirts,
                items: [
                    { name: t.classicShirts, link: '/category/shirts', isNew: false },
                    { name: t.tshirts, link: '/category/tshirts', isNew: true },
                    { name: t.polo, link: '/category/polo', isNew: false },
                ]
            },
            {
                title: t.jackets,
                items: [
                    { name: t.jackets, link: '/category/jackets', isNew: true },
                    { name: t.hoodies, link: '/category/hoodies', isNew: false },
                    { name: t.blazers, link: '/category/blazers', isNew: false },
                ]
            },
            {
                title: t.pants,
                items: [
                    { name: t.jeans, link: '/category/jeans', isNew: false },
                    { name: t.formalPants, link: '/category/formal-pants', isNew: false },
                    { name: t.shorts, link: '/category/shorts', isNew: true },
                ]
            },
        ]
    },
    shoes: {
        title: t.menuShoes,
        icon: '👟',
        slug: 'shoes',
        featured: {
            title: t.featuredShoesTitle,
            subtitle: t.featuredShoesSubtitle,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
            link: '/category/shoes/new'
        },
        columns: [
            {
                title: t.sportShoes,
                items: [
                    { name: t.sneakers, link: '/category/sneakers', isNew: false },
                    { name: t.runningShoes, link: '/category/running', isNew: true },
                    { name: t.footballShoes, link: '/category/football', isNew: false },
                ]
            },
            {
                title: t.classicShoes,
                items: [
                    { name: t.leatherShoes, link: '/category/leather-shoes', isNew: false },
                    { name: t.loafers, link: '/category/loafers', isNew: true },
                    { name: t.formalShoes, link: '/category/formal-shoes', isNew: false },
                ]
            },
        ]
    },
    accessories: {
        title: t.menuAccessories,
        icon: '⌚',
        slug: 'accessories',
        featured: {
            title: t.featuredAccessoriesTitle,
            subtitle: t.featuredAccessoriesSubtitle,
            image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=500&fit=crop',
            link: '/category/accessories/featured'
        },
        columns: [
            {
                title: t.watches,
                items: [
                    { name: t.classicWatches, link: '/category/watches-classic', isNew: false },
                    { name: t.sportWatches, link: '/category/watches-sport', isNew: true },
                ]
            },
            {
                title: t.otherAccessories,
                items: [
                    { name: t.sunglasses, link: '/category/sunglasses', isNew: true },
                    { name: t.belts, link: '/category/belts', isNew: false },
                    { name: t.wallets, link: '/category/wallets', isNew: false },
                ]
            },
        ]
    },
});

// منتجات للبحث
const searchableProducts = [
    { id: '1', name: 'قميص كلاسيكي أبيض', category: 'ملابس', price: 299 },
    { id: '2', name: 'بدلة رسمية سوداء', category: 'ملابس', price: 1299 },
    { id: '3', name: 'حذاء جلد إيطالي', category: 'أحذية', price: 599 },
    { id: '4', name: 'ساعة يد فاخرة', category: 'إكسسوارات', price: 899 },
];


const PHONE_NUMBER = "212653421432";

interface NavbarProps {
    lang: string;
    t: any;
}

export default function Navbar({ lang, t }: NavbarProps) {
    const menuData = getMenuData(t);
    const { getItemCount, setIsCartOpen } = useCart();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<typeof searchableProducts>([]);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showPromo, setShowPromo] = useState(true);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            setSearchResults(searchableProducts.filter(p =>
                p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
            ));
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) searchInputRef.current.focus();
    }, [isSearchOpen]);


    const itemCount = getItemCount();

    return (
        <>
            {/* شريط الإعلانات - Free Shipping */}
            <AnimatePresence>
                {showPromo && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black overflow-hidden"
                    >
                        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
                            <div className="flex-1 text-center">
                                <p className="text-sm font-bold">
                                    🚚 توصيل مجاني للطلبات فوق 500 درهم | 💳 الدفع عند الاستلام | 📍 توصيل لجميع مدن المغرب 🇲🇦
                                </p>
                            </div>
                            <button onClick={() => setShowPromo(false)} className="p-1 hover:bg-black/10 rounded-full mr-2">
                                <X size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation */}
            <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-lg shadow-2xl' : 'bg-black'} border-b border-white/10`}>
                <div className="hidden lg:block border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-4">
                            <a href={`https://wa.me/${PHONE_NUMBER}`} className="flex items-center gap-1 hover:text-[#D4AF37]" dir="ltr">
                                <Phone size={12} /><span>+212 653 421 432</span>
                            </a>
                            <span className="text-white/20">|</span>
                            <span>🚚 توصيل لجميع مدن المغرب</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/track" className="hover:text-[#D4AF37]">تتبع طلبك</Link>
                            <span className="text-white/20">|</span>
                            <Link href="/help" className="hover:text-[#D4AF37]">مساعدة</Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        <button className="lg:hidden p-2.5 hover:bg-white/10 rounded-xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        <Link href="/">
                            <span className="text-2xl sm:text-3xl font-black tracking-tighter bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                                MR. MODE
                            </span>
                        </Link>

                        <div className="hidden lg:flex items-center gap-1">
                            {Object.entries(menuData).map(([key, menu]) => (
                                <div key={key} className="relative" onMouseEnter={() => setActiveMenu(key)} onMouseLeave={() => setActiveMenu(null)}>
                                    <button className={`flex items-center gap-2 px-4 py-3 font-bold text-sm uppercase rounded-lg ${activeMenu === key ? 'text-[#D4AF37] bg-white/5' : 'hover:text-[#D4AF37]'}`}>
                                        <span className="text-lg">{menu.icon}</span>
                                        <span>{menu.title}</span>
                                        <ChevronDown size={14} className={`transition-transform ${activeMenu === key ? 'rotate-180' : ''}`} />
                                    </button>
                                </div>
                            ))}
                            <Link href="/sale" className="px-4 py-2.5 font-bold text-sm uppercase bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/25">
                                🔥 تخفيضات %
                            </Link>
                        </div>

                        <div className="flex items-center gap-1 sm:gap-2">
                            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={`p-2.5 rounded-xl ${isSearchOpen ? 'bg-[#D4AF37] text-black' : 'hover:bg-white/10'}`}>
                                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                            </button>
                            <button className="hidden sm:flex p-2.5 hover:bg-white/10 rounded-xl"><Heart size={20} /></button>
                            <button className="hidden sm:flex p-2.5 hover:bg-white/10 rounded-xl"><User size={20} /></button>
                            <button onClick={() => setIsCartOpen(true)} className="p-2.5 bg-[#D4AF37] text-black rounded-xl relative hover:bg-[#F4D03F]">
                                <ShoppingBag size={20} />
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold">{itemCount}</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="border-t border-white/10 overflow-hidden">
                            <div className="max-w-2xl mx-auto px-4 py-4">
                                <div className="relative">
                                    <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        placeholder="ابحث عن منتج..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-white/10 rounded-xl py-3 px-12 outline-none border border-white/20 focus:border-[#D4AF37] text-white"
                                    />
                                </div>
                                {searchResults.length > 0 && (
                                    <div className="mt-4 bg-[#111] rounded-xl border border-white/10 overflow-hidden">
                                        {searchResults.map((product) => (
                                            <Link key={product.id} href={`/product/${product.id}`} onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                                                className="flex items-center justify-between p-4 hover:bg-white/5 border-b border-white/5 last:border-0">
                                                <div>
                                                    <p className="font-medium text-white">{product.name}</p>
                                                    <p className="text-sm text-gray-500">{product.category}</p>
                                                </div>
                                                <span className="text-[#D4AF37] font-bold">{product.price} درهم</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mega Menu */}
                <AnimatePresence>
                    {activeMenu && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-white/10 hidden lg:block z-50"
                            onMouseEnter={() => setActiveMenu(activeMenu)} onMouseLeave={() => setActiveMenu(null)}>
                            <div className="max-w-7xl mx-auto px-6 py-8">
                                <div className="grid grid-cols-12 gap-8">
                                    <div className="col-span-7 grid grid-cols-3 gap-8">
                                        {menuData[activeMenu as keyof typeof menuData].columns.map((column, idx) => (
                                            <div key={idx}>
                                                <h4 className="text-[#D4AF37] font-bold mb-4 text-sm uppercase">{column.title}</h4>
                                                <ul className="space-y-3">
                                                    {column.items.map((item, i) => (
                                                        <li key={i}>
                                                            <Link href={item.link} className="text-gray-400 hover:text-white text-sm flex items-center gap-2">
                                                                {item.name}
                                                                {item.isNew && <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">جديد</span>}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="col-span-5">
                                        <Link href={menuData[activeMenu as keyof typeof menuData].featured.link} className="block relative group overflow-hidden rounded-2xl">
                                            <div className="aspect-[16/10] relative">
                                                <Image src={menuData[activeMenu as keyof typeof menuData].featured.image} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                                    <span className="px-3 py-1 bg-[#D4AF37] text-black text-xs font-bold rounded-full w-fit mb-2">مميز ✨</span>
                                                    <h3 className="text-white font-black text-xl">{menuData[activeMenu as keyof typeof menuData].featured.title}</h3>
                                                    <p className="text-gray-300 text-sm">{menuData[activeMenu as keyof typeof menuData].featured.subtitle}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }}
                            className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-[#0a0a0a] z-50 lg:hidden flex flex-col">
                            <div className="p-5 border-b border-white/10 flex items-center justify-between">
                                <span className="text-xl font-black text-[#D4AF37]">MR. MODE</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/10 rounded-xl"><X size={22} /></button>
                            </div>
                            <div className="flex-1 overflow-y-auto py-2">
                                {Object.entries(menuData).map(([key, menu]) => (
                                    <div key={key} className="border-b border-white/5">
                                        <button className="w-full flex items-center justify-between p-4 hover:bg-white/5" onClick={() => setMobileActiveSubmenu(mobileActiveSubmenu === key ? null : key)}>
                                            <ChevronDown size={18} className={`text-gray-500 ${mobileActiveSubmenu === key ? 'rotate-180 text-[#D4AF37]' : ''}`} />
                                            <span className="flex items-center gap-2 font-bold"><span>{menu.title}</span><span className="text-xl">{menu.icon}</span></span>
                                        </button>
                                        <AnimatePresence>
                                            {mobileActiveSubmenu === key && (
                                                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="bg-black/40 overflow-hidden">
                                                    {menu.columns.map((col, i) => (
                                                        <div key={i} className="px-4 py-2">
                                                            <h5 className="text-[#D4AF37] text-sm font-bold mb-2 text-right">{col.title}</h5>
                                                            <ul className="space-y-1">
                                                                {col.items.map((item, j) => (
                                                                    <li key={j}>
                                                                        <Link href={item.link} className="block text-gray-400 text-sm py-2 text-right hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{item.name}</Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                                <Link href="/sale" className="block p-4 text-red-500 font-bold text-right" onClick={() => setIsMobileMenuOpen(false)}>🔥 تخفيضات %</Link>
                            </div>
                            <div className="p-4 border-t border-white/10 bg-black flex justify-around">
                                <Link href="/account" className="flex flex-col items-center text-gray-400 hover:text-[#D4AF37]"><User size={20} /><span className="text-xs">حسابي</span></Link>
                                <Link href="/wishlist" className="flex flex-col items-center text-gray-400 hover:text-[#D4AF37]"><Heart size={20} /><span className="text-xs">المفضلة</span></Link>
                                <button onClick={() => { setIsMobileMenuOpen(false); setIsCartOpen(true); }} className="flex flex-col items-center text-[#D4AF37] relative">
                                    <ShoppingBag size={20} /><span className="text-xs">السلة</span>
                                    {itemCount > 0 && <span className="absolute -top-1 right-0 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">{itemCount}</span>}
                                </button>
                                <a href={`https://wa.me/${PHONE_NUMBER}`} className="flex flex-col items-center text-green-500"><Phone size={20} /><span className="text-xs">تواصل</span></a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
