"use client";
import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import SecurityBlocker from "@/components/SecurityBlocker";

import translations from "./i18n";
import { useState, useEffect } from "react";

type Lang = 'ar' | 'fr' | 'en';
type Translation = typeof translations['ar'];

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

// سيتم توليد الميتاداتا ديناميكياً حسب اللغة



export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('ar');
  const [t, setT] = useState<Translation>(translations['ar']);

  // تغيير اتجاه الصفحة حسب اللغة
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  // اختيار اللغة من المتصفح أو localStorage
  useEffect(() => {
    const stored = typeof window !== 'undefined' && localStorage.getItem('lang');
    let initialLang: Lang = 'ar';
    if (stored && ['ar', 'fr', 'en'].includes(stored)) initialLang = stored as Lang;
    else if (typeof window !== 'undefined') {
      const navLang = navigator.language.slice(0, 2);
      if (['ar', 'fr', 'en'].includes(navLang)) initialLang = navLang as Lang;
    }
    setLang(initialLang);
    setT(translations[initialLang]);
  }, []);

  // تغيير اللغة يدوياً
  const handleLangChange = (l: Lang) => {
    setLang(l);
    setT(translations[l]);
    if (typeof window !== 'undefined') localStorage.setItem('lang', l);
  };

  return (
    <html lang={lang} dir={dir}>
      <head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        {/* Facebook Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${tajawal.variable} font-sans antialiased bg-black text-white`}>
        {/* Language Switcher */}
        <div className="fixed top-2 left-2 z-50 flex gap-2">
          <button onClick={() => handleLangChange('ar')} className={`px-2 py-1 rounded ${lang === 'ar' ? 'bg-[#D4AF37] text-black' : 'bg-gray-800 text-white'}`}>العربية</button>
          <button onClick={() => handleLangChange('fr')} className={`px-2 py-1 rounded ${lang === 'fr' ? 'bg-[#D4AF37] text-black' : 'bg-gray-800 text-white'}`}>Français</button>
          <button onClick={() => handleLangChange('en')} className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-[#D4AF37] text-black' : 'bg-gray-800 text-white'}`}>English</button>
        </div>
        {/* Announcement Bar */}
        <div className="w-full bg-[#D4AF37] text-black text-center py-2 font-bold text-sm">
          {t.announcement}
        </div>
        {/* Store Info */}
        <div className="max-w-5xl mx-auto px-4 py-2 flex flex-col items-end">
          <div className="text-xs">{t.address}</div>
          <WorkingHours t={t} lang={lang as Lang} />
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
      </body>
    </html>
  );
}

// ساعات العمل مع منطق "مفتوح الآن" متعدد اللغات
function WorkingHours({ t, lang }: { t: Translation, lang: Lang }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    if ((day >= 1 && day <= 4 && hour >= 10 && hour < 23) || // Sat-Thu
      (day === 5 && hour >= 15 && hour < 23)) { // Fri
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, []);
  return (
    <div className="text-xs text-right mt-1">
      <span>{t.workingHours}</span>
      <span className={`ml-2 font-bold ${open ? 'text-green-500' : 'text-red-500'}`}>{open ? t.openNow : t.closed}</span>
    </div>
  );
}
