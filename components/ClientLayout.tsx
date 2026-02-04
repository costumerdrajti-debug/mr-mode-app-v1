"use client";

import { useState, useEffect, ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import SecurityBlocker from "@/components/SecurityBlocker";
import translations from "@/app/i18n";

type Lang = 'ar' | 'fr' | 'en';
type Translation = typeof translations['ar'];

interface ClientLayoutProps {
    children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const [lang, setLang] = useState<Lang>('ar');
    const [t, setT] = useState<Translation>(translations['ar']);
    const [mounted, setMounted] = useState(false);

    // تغيير اتجاه الصفحة حسب اللغة
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    // اختيار اللغة من المتصفح أو localStorage
    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem('lang');
        let initialLang: Lang = 'ar';
        if (stored && ['ar', 'fr', 'en'].includes(stored)) {
            initialLang = stored as Lang;
        } else {
            const navLang = navigator.language.slice(0, 2);
            if (['ar', 'fr', 'en'].includes(navLang)) {
                initialLang = navLang as Lang;
            }
        }
        setLang(initialLang);
        setT(translations[initialLang]);

        // Update html attributes
        document.documentElement.lang = initialLang;
        document.documentElement.dir = initialLang === 'ar' ? 'rtl' : 'ltr';
    }, []);

    // تغيير اللغة يدوياً
    const handleLangChange = (l: Lang) => {
        setLang(l);
        setT(translations[l]);
        localStorage.setItem('lang', l);
        document.documentElement.lang = l;
        document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    };

    // Prevent hydration mismatch by not rendering dynamic content until mounted
    if (!mounted) {
        return (
            <CartProvider>
                <main className="min-h-screen pt-24">
                    {children}
                </main>
            </CartProvider>
        );
    }

    return (
        <CartProvider>
            <SecurityBlocker />
            <Navbar lang={lang} t={t} />
            <CartDrawer />
            <main className="min-h-screen pt-24">
                {children}
            </main>
            <Footer />
        </CartProvider>
    );
}
