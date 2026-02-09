// app/[lang]/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
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

export async function generateStaticParams() {
    return [{ lang: 'ar' }, { lang: 'en' }, { lang: 'fr' }];
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

/* ─── Lookbook gallery images ─── */
const lookbook = [
    { src: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80', alt: 'Casual Style' },
    { src: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80', alt: 'Formal Look' },
    { src: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', alt: 'Street Fashion' },
    { src: 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?w=800&q=80', alt: 'Sport Elegance' },
];

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

            {/* ══════════════════════════════════════
                HERO — Split cinematic layout
            ══════════════════════════════════════ */}
            <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
                {/* BG Image */}
                <Image
                    src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1920&q=85"
                    alt={isRTL ? 'أزياء رجالية عصرية' : 'Modern menswear'}
                    fill
                    className="object-cover object-top"
                    priority
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent" />

                <FadeIn>
                    <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left — text */}
                        <div className={`space-y-8 ${isRTL ? 'lg:order-2' : ''}`}>
                            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 backdrop-blur-lg">
                                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-300">
                                    {isRTL ? 'مجموعة 2026' : 'Collection 2026'}
                                </span>
                            </div>

                            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
                                <span className="block text-white drop-shadow-lg">{t.hero.title1}</span>
                                <span className="block mt-2 bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
                                    {t.hero.title2}
                                </span>
                            </h1>

                            <p className="text-lg text-slate-300/90 max-w-lg leading-relaxed">
                                {t.hero.subtitle}
                            </p>

                            <div className="flex flex-wrap gap-4 pt-2">
                                <a
                                    href="#products"
                                    className="group inline-flex items-center gap-3 bg-emerald-400 hover:bg-emerald-300 text-slate-900 px-8 py-4 text-sm font-black uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-[0_8px_32px_rgba(52,211,153,0.35)] hover:shadow-[0_12px_48px_rgba(52,211,153,0.5)] hover:-translate-y-0.5"
                                >
                                    {t.hero.cta}
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </a>
                                <a
                                    href={`https://wa.me/212653421432?text=${encodeURIComponent(t.whatsappMessage)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 border border-white/15 hover:border-emerald-300/40 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/5"
                                >
                                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    WhatsApp
                                </a>
                            </div>

                            {/* Stats row */}
                            <div className="flex gap-8 pt-4 border-t border-white/10">
                                {[
                                    { num: '500+', label: isRTL ? 'منتج' : 'Products' },
                                    { num: '10K+', label: isRTL ? 'عميل' : 'Clients' },
                                    { num: '4.9★', label: isRTL ? 'تقييم' : 'Rating' },
                                ].map((s) => (
                                    <div key={s.label}>
                                        <div className="text-2xl font-black text-white">{s.num}</div>
                                        <div className="text-[11px] text-slate-400 uppercase tracking-wider">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — feature image (desktop) */}
                        <div className={`hidden lg:block ${isRTL ? 'lg:order-1' : ''}`}>
                            <div className="relative aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/10">
                                <Image
                                    src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=85"
                                    alt="MR. MODE"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 px-5 py-4">
                                        <p className="text-sm font-bold text-white">MR. MODE</p>
                                        <p className="text-xs text-slate-300">{isRTL ? 'أناقة رجالية فاخرة' : 'Premium Menswear'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* Scroll hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
                        <div className="w-1.5 h-3 bg-emerald-400 rounded-full mt-2 animate-bounce" />
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
                TRUST BAR — Minimal strip
            ══════════════════════════════════════ */}
            <section className="border-y border-white/5 bg-slate-900/50 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-6 py-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { icon: '🚚', label: t.features.delivery, sub: t.features.deliveryDesc },
                            { icon: '💎', label: t.features.quality, sub: t.features.qualityDesc },
                            { icon: '🔒', label: isRTL ? 'دفع آمن' : 'Secure Payment', sub: isRTL ? 'الدفع عند الاستلام' : 'Cash on delivery' },
                            { icon: '↩️', label: isRTL ? 'إرجاع مجاني' : 'Free Returns', sub: isRTL ? 'خلال 5 أيام' : 'Within 5 days' },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <span className="text-xl">{item.icon}</span>
                                <p className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">{item.label}</p>
                                <p className="text-[10px] text-slate-500">{item.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
                PRODUCTS — Main grid
            ══════════════════════════════════════ */}
            <section id="products" className="py-20 sm:py-28">
                <div className="max-w-7xl mx-auto px-6">
                    <FadeIn>
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-300 font-bold">{isRTL ? 'تشكيلتنا' : 'Our Collection'}</span>
                                <h2 className="text-4xl sm:text-5xl font-black mt-2 tracking-tight">{t.latestArrivals}</h2>
                                <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mt-4" />
                            </div>
                            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">{t.latestArrivalsDesc}</p>
                        </div>
                    </FadeIn>

                    {products.length > 0 ? (
                        <StaggerChildren className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" staggerDelay={0.06}>
                            {products.map((product) => (
                                <StaggerItem key={product._id}>
                                    <ProductCard product={product} t={t} lang={locale} />
                                </StaggerItem>
                            ))}
                        </StaggerChildren>
                    ) : (
                        <div className="text-center py-24">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/80 border border-white/10 mb-6">
                                <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t.noProducts}</h3>
                            <p className="text-sm text-slate-500">{t.noProductsDesc}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ══════════════════════════════════════
                LOOKBOOK — Visual gallery
            ══════════════════════════════════════ */}
            <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <FadeIn>
                        <div className="text-center mb-14">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-300 font-bold">Lookbook</span>
                            <h2 className="text-4xl sm:text-5xl font-black mt-2 tracking-tight">
                                {isRTL ? 'إطلالات مميزة' : locale === 'fr' ? 'Looks Tendance' : 'Trending Looks'}
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mt-4" />
                        </div>
                    </FadeIn>

                    <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.1}>
                        {lookbook.map((img, i) => (
                            <StaggerItem key={i}>
                                <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-300/30 transition-all duration-500">
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">{img.alt}</span>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerChildren>
                </div>
            </section>

            {/* ══════════════════════════════════════
                WHY US — Clean feature cards
            ══════════════════════════════════════ */}
            <section className="py-20 sm:py-28 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <FadeIn>
                        <div className="text-center mb-14">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-300 font-bold">{isRTL ? 'المزايا' : 'Benefits'}</span>
                            <h2 className="text-4xl sm:text-5xl font-black mt-2 tracking-tight">{t.features.title}</h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mt-4" />
                        </div>
                    </FadeIn>

                    <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
                        {[
                            { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, title: t.features.quality, desc: t.features.qualityDesc },
                            { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, title: t.features.delivery, desc: t.features.deliveryDesc },
                            { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>, title: t.features.style, desc: t.features.styleDesc },
                            { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>, title: t.features.support, desc: t.features.supportDesc },
                        ].map((item, i) => (
                            <StaggerItem key={i}>
                                <div className="group bg-white/[0.03] backdrop-blur-sm border border-white/8 hover:border-emerald-400/30 rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_-12px_rgba(52,211,153,0.12)]">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-400/10 text-emerald-300 mb-5 group-hover:bg-emerald-400/20 transition-colors">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerChildren>
                </div>
            </section>

            {/* ══════════════════════════════════════
                CTA — WhatsApp call to action
            ══════════════════════════════════════ */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <FadeIn>
                        <div className="relative rounded-3xl overflow-hidden">
                            {/* BG image */}
                            <Image
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
                                alt="Store"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm" />

                            <div className="relative z-10 text-center py-16 sm:py-20 px-8">
                                <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-400/30 rounded-full px-5 py-2 mb-8">
                                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                                    <span className="text-xs font-bold text-green-300 uppercase tracking-wider">{isRTL ? 'متاح الآن' : 'Available Now'}</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-black mb-4 text-white">{t.ctaTitle}</h2>
                                <p className="text-slate-400 mb-8 max-w-md mx-auto">{t.ctaDesc}</p>
                                <a
                                    href={`https://wa.me/212653421432?text=${encodeURIComponent(t.whatsappMessage)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white px-10 py-4 text-sm font-black uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-[0_8px_32px_rgba(34,197,94,0.35)] hover:shadow-[0_12px_48px_rgba(34,197,94,0.5)] hover:-translate-y-0.5"
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