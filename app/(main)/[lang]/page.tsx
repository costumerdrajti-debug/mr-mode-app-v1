// app/[lang]/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import translations from '@/lib/translations';
import ProductCard from '@/components/product/ProductCard';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import FadeIn from '@/components/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/animations/StaggerChildren';
import { getProducts } from '@/lib/products';

const SUPPORTED_LANGUAGES = ['ar', 'en', 'fr'] as const;
type Locale = (typeof SUPPORTED_LANGUAGES)[number];

function getValidLocale(lang: string | undefined): Locale {
    if (!lang || !SUPPORTED_LANGUAGES.includes(lang as Locale)) return 'ar';
    return lang as Locale;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const locale = getValidLocale(lang);
    const t = translations[locale] || translations.ar;
    return {
        title: `MR. MODE | ${t.hero.title1} ${t.hero.title2}`,
        description: t.hero.subtitle,
        alternates: {
            canonical: `/${locale}`,
            languages: { ar: '/ar', en: '/en', fr: '/fr' },
        },
    };
}

export default async function HomePage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const locale = getValidLocale(lang);
    const t = translations[locale] || translations.ar;
    const isRTL = locale === 'ar';
    const products = await getProducts({ limit: 8 });

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100" dir={isRTL ? 'rtl' : 'ltr'} lang={locale}>

            {/* ═══════════════════════════════════════════
                HERO — Full‑screen cinematic
            ═══════════════════════════════════════════ */}
            <section className="relative h-[100dvh] min-h-[700px] flex items-center justify-center overflow-hidden">
                {/* Background image */}
                <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=85"
                    alt={isRTL ? 'أزياء رجالية فاخرة' : 'Luxury menswear'}
                    fill
                    className="object-cover scale-105"
                    priority
                />
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-transparent" />

                {/* Content */}
                <FadeIn>
                    <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                        <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.4em] text-emerald-300 border border-emerald-300/40 px-6 py-2 rounded-full mb-8 backdrop-blur-sm bg-white/5">
                            Collection 2026
                        </span>

                        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tight mb-8">
                            <span className="block text-white">{t.hero.title1}</span>
                            <span className="block bg-gradient-to-r from-emerald-300 via-cyan-200 to-emerald-300 bg-clip-text text-transparent">
                                {t.hero.title2}
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto mb-12 font-light leading-relaxed">
                            {t.hero.subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="#products"
                                className="group inline-flex items-center justify-center gap-3 bg-emerald-400 hover:bg-emerald-300 text-slate-900 px-10 py-4 text-sm font-black uppercase tracking-widest rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(52,211,153,0.3)] hover:shadow-[0_0_50px_rgba(52,211,153,0.5)]"
                            >
                                {t.hero.cta}
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </a>
                            <a
                                href={`https://wa.me/212653421432?text=${encodeURIComponent(t.whatsappMessage)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 border border-white/20 hover:border-emerald-300/50 text-white px-10 py-4 text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 backdrop-blur-sm hover:bg-white/5"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </FadeIn>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <div className="w-1.5 h-3 bg-emerald-300 rounded-full mt-2 animate-bounce" />
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                TRUST BAR — Social proof strip
            ═══════════════════════════════════════════ */}
            <section className="bg-slate-900/80 border-y border-white/5">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { val: '🚚', label: t.features.delivery, sub: t.features.deliveryDesc },
                            { val: '💎', label: t.features.quality, sub: t.features.qualityDesc },
                            { val: '👔', label: t.features.style, sub: t.features.styleDesc },
                            { val: '🤝', label: t.features.support, sub: t.features.supportDesc },
                        ].map((item, i) => (
                            <div key={i} className="space-y-1">
                                <div className="text-2xl">{item.val}</div>
                                <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">{item.label}</p>
                                <p className="text-[11px] text-slate-400">{item.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                PRODUCTS — Main grid
            ═══════════════════════════════════════════ */}
            <section id="products" className="py-20 sm:py-28 bg-slate-950">
                <div className="max-w-7xl mx-auto px-6">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-300">{isRTL ? 'اكتشف' : 'Discover'}</span>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-3 mb-5 tracking-tight">
                                {t.latestArrivals}
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full" />
                            <p className="text-slate-400 mt-5 text-lg">{t.latestArrivalsDesc}</p>
                        </div>
                    </FadeIn>

                    {products.length > 0 ? (
                        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" staggerDelay={0.08}>
                            {products.map((product) => (
                                <StaggerItem key={product._id}>
                                    <ProductCard product={product} t={t} lang={locale} />
                                </StaggerItem>
                            ))}
                        </StaggerChildren>
                    ) : (
                        <div className="text-center py-20 text-slate-500">
                            <div className="text-6xl mb-4">🛍️</div>
                            <p className="text-xl font-bold">{t.noProducts}</p>
                            <p className="text-sm mt-2">{t.noProductsDesc}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                WHY US — Features with glassmorphism
            ═══════════════════════════════════════════ */}
            <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-300">{isRTL ? 'لماذا نحن' : 'Why Us'}</span>
                            <h2 className="text-4xl sm:text-5xl font-black mt-3 tracking-tight">{t.features.title}</h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full mt-5" />
                        </div>
                    </FadeIn>

                    <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
                        {[
                            { icon: '💎', title: t.features.quality, desc: t.features.qualityDesc },
                            { icon: '⚡', title: t.features.delivery, desc: t.features.deliveryDesc },
                            { icon: '👔', title: t.features.style, desc: t.features.styleDesc },
                            { icon: '🤝', title: t.features.support, desc: t.features.supportDesc },
                        ].map((item, i) => (
                            <StaggerItem key={i}>
                                <div className="group relative bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-emerald-300/40 rounded-2xl p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(52,211,153,0.15)]">
                                    <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                    <h3 className="text-lg font-bold text-emerald-300 mb-3">{item.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerChildren>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                CTA — Final call to action
            ═══════════════════════════════════════════ */}
            <section className="py-20 bg-slate-950">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <FadeIn>
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-3xl p-12 sm:p-16 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none" />

                            <div className="relative z-10">
                                <h2 className="text-3xl sm:text-4xl font-black mb-4">{t.ctaTitle}</h2>
                                <p className="text-slate-400 mb-8 max-w-md mx-auto">{t.ctaDesc}</p>
                                <a
                                    href={`https://wa.me/212653421432?text=${encodeURIComponent(t.whatsappMessage)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white px-10 py-4 text-sm font-black uppercase tracking-widest rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(34,197,94,0.5)]"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    {t.ctaBtn}
                                </a>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* WhatsApp Float */}
            <WhatsAppFloat phoneNumber="212653421432" message={t.whatsappMessage} />
        </div>
    );
}