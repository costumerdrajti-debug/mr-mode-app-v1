// app/[lang]/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import translations from '@/lib/translations';
import ProductCard from '@/components/product/ProductCard';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import FadeIn from '@/components/animations/FadeIn';
import { StaggerItem } from '@/components/animations/StaggerChildren';
import { getProducts } from '@/lib/products';

// ============================================
// 🌐 دعم اللغة الآمن
// ============================================
const SUPPORTED_LANGUAGES = ['ar', 'en'] as const;
type Locale = (typeof SUPPORTED_LANGUAGES)[number];

function getValidLocale(lang: string | undefined): Locale {
    if (!lang || !SUPPORTED_LANGUAGES.includes(lang as Locale)) {
        return 'ar';
    }
    return lang as Locale;
}

// ============================================
// 📊 Metadata ديناميكية (لتحسين SEO)
// ============================================
export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const locale = getValidLocale(lang);
    const t = translations[locale] || translations.ar;

    return {
        title: `MR. MODE | ${t.ramadanTitle}`,
        description: t.ramadanSubtitle,
        alternates: {
            canonical: `/${locale}`,
            languages: {
                ar: '/ar',
                en: '/en',
            },
        },
    };
}

// ============================================
// 🏠 الصفحة الرئيسية
// ============================================
export default async function HomePage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const locale = getValidLocale(lang);
    const t = translations[locale] || translations.ar;
    const isRTL = locale === 'ar';

    // Fetch products from Sanity
    const products = await getProducts({ limit: 8 });

    return (
        <div
            className="min-h-screen bg-[#0A1628] text-[#F5F5DC]"
            dir={isRTL ? 'rtl' : 'ltr'}
            lang={locale}
        >
            {/* 🟡 Top Banner */}
            <div className="bg-gradient-to-r from-[#C9A55C] via-[#D4AF37] to-[#C9A55C] text-[#0A1628] text-center py-3 text-sm font-bold tracking-wide">
                {t.topBar.freeShipping}
            </div>

            {/* 🔵 Header */}
            <header className="sticky top-0 z-50 bg-[#0F1F3D] border-b border-[#D4AF37]/30 shadow-2xl backdrop-blur-md">
                <div className="container mx-auto px-6 py-5 flex items-center justify-between">
                    {/* Logo */}
                    <Link href={`/${locale}`} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#C9A55C] rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-[#0A1628] font-black text-xl">M</span>
                        </div>
                        <h1 className="text-2xl font-black tracking-tight text-[#F5F5DC]">
                            MR. <span className="bg-gradient-to-r from-[#D4AF37] to-[#C9A55C] bg-clip-text text-transparent">MODE</span>
                        </h1>
                    </Link>

                    {/* Nav Icons */}
                    <div className="flex items-center gap-6">
                        {/* Search */}
                        <button className="p-2 hover:bg-[#D4AF37]/20 rounded-full transition text-[#D4AF37]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        {/* Wishlist */}
                        <button className="p-2 hover:bg-[#D4AF37]/20 rounded-full transition text-[#D4AF37]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        {/* Cart */}
                        <button className="p-2 hover:bg-[#D4AF37]/20 rounded-full transition relative text-[#D4AF37]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* 🌄 Hero Section */}
            <FadeIn>
                <section className="relative h-screen flex items-center bg-gradient-to-br from-[#0A1628] via-[#0F1F3D] to-[#1A2942]">
                    <Image
                        src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1920&q=90"
                        alt={isRTL ? 'أزياء رجالية فاخرة' : 'Men in stylish outfits'}
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 via-transparent to-[#0A1628]/80"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D4AF37_0%,_transparent_70%)] opacity-10"></div>
                    <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
                        <div className="inline-block px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C9A55C] text-[#0A1628] rounded-full text-sm font-black mb-10 shadow-2xl uppercase tracking-wider">
                            ✨ {isRTL ? 'تشكيلة حصرية' : 'Exclusive Line'}
                        </div>
                        <h2 className="text-7xl md:text-9xl font-black mb-8 leading-tight text-[#F5F5DC] drop-shadow-2xl">
                            {t.hero.title1}<br />
                            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4E4A6] to-[#D4AF37] bg-clip-text text-transparent animate-shimmer">{t.hero.title2}</span>
                        </h2>
                        <p className="text-xl md:text-2xl mb-14 max-w-2xl mx-auto text-[#C4C4B8] font-light leading-relaxed">
                            {t.hero.subtitle}
                        </p>
                        <a
                            href="#products"
                            className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#C9A55C] text-[#0A1628] px-14 py-6 font-black text-lg rounded-full hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all transform hover:scale-110 shadow-2xl uppercase tracking-wide"
                        >
                            {t.hero.cta}
                        </a>
                    </div>
                </section>
            </FadeIn>

            {/* 📦 Featured Products */}
            <section id="products" className="py-24 bg-gradient-to-b from-[#0A1628] to-[#0F1F3D]">
                <div className="container mx-auto px-6">
                    <div className="mb-16 text-center">
                        <div className="inline-block w-24 h-1.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8 rounded-full"></div>
                        <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[#F5F5DC] to-[#C4C4B8] bg-clip-text text-transparent">{t.latestArrivals}</h2>
                        <p className="text-xl text-[#C4C4B8]">{t.latestArrivalsDesc}</p>
                    </div>
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    t={t}
                                    lang={locale}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-[#666666]">
                            <p className="text-xl">{t.noProducts}</p>
                            <p className="text-sm mt-2">{t.noProductsDesc}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* 💡 Why MR. MODE? */}
            <section className="py-24 bg-[#0F1F3D] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#D4AF37_0%,_transparent_50%)] opacity-5"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <FadeIn delay={0.2}>
                        <div className="mb-16 text-center">
                            <div className="inline-block w-24 h-1.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8 rounded-full"></div>
                            <h2 className="text-5xl md:text-6xl font-black mb-6 text-[#F5F5DC]">
                                {t.features.title}
                            </h2>
                        </div>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: '🎯',
                                title: t.features.quality,
                                desc: t.features.qualityDesc,
                            },
                            {
                                icon: '⏱️',
                                title: t.features.delivery,
                                desc: t.features.deliveryDesc,
                            },
                            {
                                icon: '👔',
                                title: t.features.style,
                                desc: t.features.styleDesc,
                            },
                            {
                                icon: '🤝',
                                title: t.features.support,
                                desc: t.features.supportDesc,
                            },
                        ].map((item, i) => (
                            <StaggerItem key={i}>
                                <div className="text-center bg-gradient-to-br from-[#1A2942] to-[#0F1F3D] p-8 rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500 border border-[#D4AF37]/30 hover:border-[#D4AF37] group">
                                    <div className="text-7xl mb-6 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                    <h3 className="text-xl font-bold mb-4 text-[#D4AF37]">{item.title}</h3>
                                    <p className="text-[#C4C4B8] leading-relaxed">{item.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </div>
                </div>
            </section>

            {/* WhatsApp Float Button */}
            <WhatsAppFloat
                phoneNumber="212653421432"
                message={t.whatsappMessage}
            />

            {/* 📬 Footer */}
            <footer className="bg-gradient-to-b from-[#0A1628] to-[#050B14] text-[#F5F5DC] pt-20 pb-8 border-t border-[#D4AF37]/30">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#C9A55C] rounded-full flex items-center justify-center shadow-xl">
                                    <span className="text-[#0A1628] font-black text-2xl">M</span>
                                </div>
                                <h2 className="text-2xl font-black">
                                    MR. <span className="bg-gradient-to-r from-[#D4AF37] to-[#C9A55C] bg-clip-text text-transparent">MODE</span>
                                </h2>
                            </div>
                            <p className="text-[#C4C4B8] text-sm leading-relaxed">
                                {isRTL
                                    ? 'وجهتك الأولى للأزياء الرجالية الفاخرة في المغرب'
                                    : 'Your destination for luxury menswear in Morocco'}
                            </p>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h4 className="font-black mb-6 text-sm uppercase tracking-widest text-[#D4AF37]">{t.footer.shop}</h4>
                            <ul className="space-y-4 text-[#C4C4B8] text-sm">
                                <li><Link href={`/${locale}`} className="hover:text-[#D4AF37] transition-colors">{t.footer.home}</Link></li>
                                <li><Link href={`/${locale}#products`} className="hover:text-[#D4AF37] transition-colors">{t.footer.products}</Link></li>
                                <li><Link href={`/${locale}/about`} className="hover:text-[#D4AF37] transition-colors">{t.footer.about}</Link></li>
                            </ul>
                        </div>

                        {/* Help */}
                        <div>
                            <h4 className="font-black mb-6 text-sm uppercase tracking-widest text-[#D4AF37]">{t.footer.help}</h4>
                            <ul className="space-y-4 text-[#C4C4B8] text-sm">
                                <li><Link href={`/${locale}/faq`} className="hover:text-[#D4AF37] transition-colors">{t.footer.faq}</Link></li>
                                <li><Link href={`/${locale}/returns`} className="hover:text-[#D4AF37] transition-colors">{t.footer.returns}</Link></li>
                                <li><Link href={`/${locale}/contact`} className="hover:text-[#D4AF37] transition-colors">{t.footer.contactUs}</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-black mb-6 text-sm uppercase tracking-widest text-[#D4AF37]">{t.footer.contact}</h4>
                            <ul className="space-y-4 text-[#C4C4B8] text-sm">
                                <li className="flex items-center gap-2">
                                    <span className="text-[#D4AF37]">📧</span>
                                    mr.modeshop@gmail.com
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[#D4AF37]">📱</span>
                                    +212 653 421 432
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-[#D4AF37]">📍</span>
                                    {t.footer.location}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="pt-8 border-t border-[#D4AF37]/20 text-center text-[#9A9A8A] text-sm">
                        © {new Date().getFullYear()} MR. MODE. {t.footer.rights}
                    </div>
                </div>
            </footer>
        </div>
    );
}