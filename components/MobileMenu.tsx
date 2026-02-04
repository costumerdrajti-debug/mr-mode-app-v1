'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, Menu, Home, ShoppingBag, Phone, Info, HelpCircle, Package } from 'lucide-react';

interface MobileMenuProps {
    lang: string;
    isRTL: boolean;
}

const translations = {
    ar: {
        home: 'الرئيسية',
        products: 'المنتجات',
        about: 'من نحن',
        contact: 'اتصل بنا',
        faq: 'الأسئلة الشائعة',
        trackOrder: 'تتبع الطلب',
        returns: 'سياسة الإرجاع',
        menu: 'القائمة',
    },
    en: {
        home: 'Home',
        products: 'Products',
        about: 'About',
        contact: 'Contact',
        faq: 'FAQ',
        trackOrder: 'Track Order',
        returns: 'Returns',
        menu: 'Menu',
    },
    fr: {
        home: 'Accueil',
        products: 'Produits',
        about: 'À propos',
        contact: 'Contact',
        faq: 'FAQ',
        trackOrder: 'Suivre',
        returns: 'Retours',
        menu: 'Menu',
    },
};

export default function MobileMenu({ lang, isRTL }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const t = translations[lang as keyof typeof translations] || translations.ar;

    const menuItems = [
        { icon: Home, label: t.home, href: `/${lang}` },
        { icon: ShoppingBag, label: t.products, href: `/${lang}#products` },
        { icon: Info, label: t.about, href: `/${lang}/about` },
        { icon: Phone, label: t.contact, href: `/${lang}/contact` },
        { icon: HelpCircle, label: t.faq, href: `/${lang}/faq` },
        { icon: Package, label: t.trackOrder, href: `/${lang}/track-order` },
    ];

    return (
        <>
            {/* Menu Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-800 rounded-full transition"
                aria-label={t.menu}
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/80 z-50 lg:hidden"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: isRTL ? 300 : -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: isRTL ? 300 : -300 }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-80 bg-gray-900 z-50 lg:hidden overflow-y-auto`}
                            dir={isRTL ? 'rtl' : 'ltr'}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                                        <span className="font-bold text-black text-lg">M</span>
                                    </div>
                                    <span className="text-xl font-black">MR. MODE</span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-gray-800 rounded-full transition"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Menu Items */}
                            <nav className="p-4">
                                <ul className="space-y-2">
                                    {menuItems.map((item, index) => (
                                        <motion.li
                                            key={item.href}
                                            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800 transition group"
                                            >
                                                <item.icon className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition" />
                                                <span className="font-medium">{item.label}</span>
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Footer */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800 bg-gray-900">
                                <a
                                    href="https://wa.me/212653421432"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full bg-green-600 text-white py-3 font-bold rounded-lg hover:bg-green-500 transition"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
