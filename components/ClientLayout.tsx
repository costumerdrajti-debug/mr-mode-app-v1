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
            <>
                {/* Static loading state that matches server render */}
                <div className="w-full bg-[#D4AF37] text-black text-center py-2 font-bold text-sm">
                    التوصيل بالمجان + الدفع عند الاستلام 🚚
                </div>
                <div className="max-w-5xl mx-auto px-4 py-2 flex flex-col items-end">
                    <div className="text-xs">درب التعاون زنقة 71 الحي الحسني الدار البيضاء</div>
                    <div className="text-xs text-right mt-1">
                        <span>ساعات العمل: السبت-الخميس (10h-23h)، الجمعة (15h-23h)</span>
                    </div>
                </div>
                <CartProvider>
                    <main className="min-h-screen pt-32">
                        {children}
                    </main>
                </CartProvider>
            </>
        );
    }

    return (
        <>
            {/* Language Switcher */}
            <div className="fixed top-2 left-2 z-50 flex gap-2">
                <button
                    onClick={() => handleLangChange('ar')}
                    className={`px-2 py-1 rounded ${lang === 'ar' ? 'bg-[#D4AF37] text-black' : 'bg-gray-800 text-white'}`}
                >
                    العربية
                </button>
                <button
                    onClick={() => handleLangChange('fr')}
                    className={`px-2 py-1 rounded ${lang === 'fr' ? 'bg-[#D4AF37] text-black' : 'bg-gray-800 text-white'}`}
                >
                    Français
                </button>
                <button
                    onClick={() => handleLangChange('en')}
                    className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-[#D4AF37] text-black' : 'bg-gray-800 text-white'}`}
                >
                    English
                </button>
            </div>

            {/* Announcement Bar */}
            <div className="w-full bg-[#D4AF37] text-black text-center py-2 font-bold text-sm">
                {t.announcement}
            </div>

            {/* Store Info */}
            <div className="max-w-5xl mx-auto px-4 py-2 flex flex-col items-end">
                <div className="text-xs">{t.address}</div>
                <WorkingHours t={t} />
            </div>

            <CartProvider>
                <SecurityBlocker />
                <Navbar lang={lang} t={t} />
                <CartDrawer />
                <main className="min-h-screen pt-32">
                    {children}
                </main>
                <Footer lang={lang} t={t} />
            </CartProvider>
        </>
    );
}

// ساعات العمل مع منطق "مفتوح الآن" متعدد اللغات
function WorkingHours({ t }: { t: Translation }) {
    const [open, setOpen] = useState<boolean | null>(null);

    useEffect(() => {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        // Saturday = 6, Sunday = 0, Mon-Thu = 1-4, Fri = 5
        const isSatToThu = (day >= 0 && day <= 4) || day === 6;
        const isFriday = day === 5;

        if ((isSatToThu && hour >= 10 && hour < 23) ||
            (isFriday && hour >= 15 && hour < 23)) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, []);

    return (
        <div className="text-xs text-right mt-1">
            <span>{t.workingHours}</span>
            {open !== null && (
                <span className={`ml-2 font-bold ${open ? 'text-green-500' : 'text-red-500'}`}>
                    {open ? t.openNow : t.closed}
                </span>
            )}
        </div>
    );
}
