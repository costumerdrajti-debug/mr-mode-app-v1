import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import FadeIn from '@/components/animations/FadeIn';
import { StaggerItem } from '@/components/animations/StaggerChildren';

const SUPPORTED_LANGUAGES = ['ar', 'en', 'fr'] as const;
type Locale = (typeof SUPPORTED_LANGUAGES)[number];

function getValidLocale(lang: string | undefined): Locale {
    if (!lang || !SUPPORTED_LANGUAGES.includes(lang as Locale)) {
        return 'ar';
    }
    return lang as Locale;
}

const translations = {
    ar: {
        title: 'من نحن',
        subtitle: 'قصة MR. MODE',
        hero: 'الأناقة ليست مجرد ملابس، بل هي أسلوب حياة',
        heroBadge: 'تأسست في 2026',
        story: {
            title: 'قصتنا',
            p1: 'بدأت MR. MODE في قلب الدار البيضاء بحلم بسيط: تقديم أزياء رجالية فاخرة بأسعار معقولة للرجل المغربي العصري.',
            p2: 'منذ تأسيسنا، كرسنا أنفسنا لاختيار أفضل الأقمشة والتصاميم العصرية التي تجمع بين الأناقة الكلاسيكية والراحة العملية.',
            p3: 'اليوم، نفخر بخدمة آلاف العملاء في جميع أنحاء المغرب، ونستمر في تطوير مجموعاتنا لتلبية تطلعات كل رجل يبحث عن التميز.',
        },
        mission: {
            title: 'مهمتنا',
            desc: 'نسعى لنكون الوجهة الأولى للرجل المغربي الذي يبحث عن التميز والأناقة بأسعار عادلة وجودة لا تُضاهى.',
        },
        values: {
            title: 'قيمنا',
            quality: { title: 'الجودة أولاً', desc: 'نختار فقط أفضل الأقمشة والخامات من موردين موثوقين حول العالم' },
            service: { title: 'خدمة متميزة', desc: 'فريقنا متاح دائماً لمساعدتك في اختيار الإطلالة المثالية' },
            authenticity: { title: 'الأصالة', desc: 'جميع منتجاتنا أصلية 100% مع ضمان الجودة والاستبدال' },
            innovation: { title: 'التجديد', desc: 'نواكب أحدث صيحات الموضة العالمية بلمسة مغربية' },
        },
        stats: {
            products: 'منتج',
            customers: 'عميل سعيد',
            cities: 'مدينة مغربية',
            rating: 'تقييم',
        },
        promises: {
            title: 'وعودنا إليك',
            items: [
                { icon: '🚚', title: 'توصيل مجاني', desc: 'لجميع الطلبات داخل المغرب' },
                { icon: '💳', title: 'الدفع عند الاستلام', desc: 'ادفع فقط عند استلام طلبك' },
                { icon: '↩️', title: 'إرجاع مجاني', desc: 'خلال 5 أيام من تاريخ الاستلام' },
                { icon: '📱', title: 'دعم واتساب', desc: 'فريقنا متاح كل يوم لمساعدتك' },
            ],
        },
        location: {
            title: 'زورونا',
            address: 'بلفيدير',
            city: 'الدار البيضاء، المغرب',
            hours: 'ساعات العمل',
            satThu: 'السبت - الخميس: 10:00 - 23:00',
            fri: 'الجمعة: 15:00 - 23:00',
        },
        cta: 'تواصل معنا',
        ctaWhatsapp: 'راسلنا على واتساب',
    },
    en: {
        title: 'About Us',
        subtitle: 'The MR. MODE Story',
        hero: 'Elegance is not just clothing, it\'s a way of life',
        heroBadge: 'Est. 2026',
        story: {
            title: 'Our Story',
            p1: 'MR. MODE started in the heart of Casablanca with a simple dream: to offer luxury menswear at affordable prices for the modern Moroccan man.',
            p2: 'Since our founding, we have dedicated ourselves to selecting the finest fabrics and modern designs that combine classic elegance with practical comfort.',
            p3: 'Today, we are proud to serve thousands of customers across Morocco, and we continue to develop our collections to meet the aspirations of every man seeking excellence.',
        },
        mission: {
            title: 'Our Mission',
            desc: 'We strive to be the go-to destination for the Moroccan man seeking distinction and elegance at fair prices with unmatched quality.',
        },
        values: {
            title: 'Our Values',
            quality: { title: 'Quality First', desc: 'We select only the finest fabrics and materials from trusted suppliers worldwide' },
            service: { title: 'Excellent Service', desc: 'Our team is always available to help you choose the perfect look' },
            authenticity: { title: 'Authenticity', desc: 'All our products are 100% genuine with quality and exchange guarantee' },
            innovation: { title: 'Innovation', desc: 'We follow the latest global fashion trends with a Moroccan touch' },
        },
        stats: {
            products: 'Products',
            customers: 'Happy Customers',
            cities: 'Moroccan Cities',
            rating: 'Rating',
        },
        promises: {
            title: 'Our Promises',
            items: [
                { icon: '🚚', title: 'Free Delivery', desc: 'On all orders within Morocco' },
                { icon: '💳', title: 'Cash on Delivery', desc: 'Pay only when you receive your order' },
                { icon: '↩️', title: 'Free Returns', desc: 'Within 5 days of receipt' },
                { icon: '📱', title: 'WhatsApp Support', desc: 'Our team is available every day' },
            ],
        },
        location: {
            title: 'Visit Us',
            address: 'Belvédère',
            city: 'Casablanca, Morocco',
            hours: 'Working Hours',
            satThu: 'Saturday - Thursday: 10:00 AM - 11:00 PM',
            fri: 'Friday: 3:00 PM - 11:00 PM',
        },
        cta: 'Contact Us',
        ctaWhatsapp: 'Message us on WhatsApp',
    },
    fr: {
        title: 'À Propos',
        subtitle: 'L\'Histoire de MR. MODE',
        hero: 'L\'élégance n\'est pas seulement des vêtements, c\'est un mode de vie',
        heroBadge: 'Fondée en 2026',
        story: {
            title: 'Notre Histoire',
            p1: 'MR. MODE a débuté au cœur de Casablanca avec un rêve simple : offrir des vêtements pour hommes de luxe à des prix abordables pour l\'homme marocain moderne.',
            p2: 'Depuis notre fondation, nous nous sommes consacrés à la sélection des meilleurs tissus et designs modernes qui allient élégance classique et confort pratique.',
            p3: 'Aujourd\'hui, nous sommes fiers de servir des milliers de clients à travers le Maroc, et nous continuons à développer nos collections pour répondre aux aspirations de chaque homme en quête d\'excellence.',
        },
        mission: {
            title: 'Notre Mission',
            desc: 'Nous aspirons à être la destination de référence pour l\'homme marocain en quête de distinction et d\'élégance à des prix justes et une qualité inégalée.',
        },
        values: {
            title: 'Nos Valeurs',
            quality: { title: 'Qualité d\'abord', desc: 'Nous sélectionnons uniquement les meilleurs tissus et matériaux de fournisseurs de confiance' },
            service: { title: 'Service Excellent', desc: 'Notre équipe est toujours disponible pour vous aider à choisir le look parfait' },
            authenticity: { title: 'Authenticité', desc: 'Tous nos produits sont 100% authentiques avec garantie de qualité et d\'échange' },
            innovation: { title: 'Innovation', desc: 'Nous suivons les dernières tendances de la mode mondiale avec une touche marocaine' },
        },
        stats: {
            products: 'Produits',
            customers: 'Clients Satisfaits',
            cities: 'Villes Marocaines',
            rating: 'Évaluation',
        },
        promises: {
            title: 'Nos Engagements',
            items: [
                { icon: '🚚', title: 'Livraison Gratuite', desc: 'Sur toutes les commandes au Maroc' },
                { icon: '💳', title: 'Paiement à la Livraison', desc: 'Payez uniquement à la réception' },
                { icon: '↩️', title: 'Retours Gratuits', desc: 'Dans les 5 jours suivant la réception' },
                { icon: '📱', title: 'Support WhatsApp', desc: 'Notre équipe est disponible chaque jour' },
            ],
        },
        location: {
            title: 'Rendez-nous Visite',
            address: 'Belvédère',
            city: 'Casablanca, Maroc',
            hours: 'Horaires d\'ouverture',
            satThu: 'Samedi - Jeudi: 10h00 - 23h00',
            fri: 'Vendredi: 15h00 - 23h00',
        },
        cta: 'Contactez-nous',
        ctaWhatsapp: 'Écrivez-nous sur WhatsApp',
    },
};

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
    const t = translations[locale];

    return {
        title: `${t.title} | MR. MODE`,
        description: t.hero,
    };
}

export default async function AboutPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const locale = getValidLocale(lang);
    const t = translations[locale];
    const isRTL = locale === 'ar';

    const stats = [
        { value: '500+', label: t.stats.products },
        { value: '10K+', label: t.stats.customers },
        { value: '40+', label: t.stats.cities },
        { value: '4.9★', label: t.stats.rating },
    ];

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>

            {/* ═══════════════════════════════════════
                HERO SECTION - Full Screen Cinematic
            ═══════════════════════════════════════ */}
            <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=85"
                    alt="MR. MODE - Luxury Menswear"
                    fill
                    className="object-cover scale-110"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0A0A]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15),_transparent_70%)]" />

                <FadeIn>
                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-5 py-2 border border-[#D4AF37]/40 rounded-full mb-8 backdrop-blur-sm bg-white/5">
                            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                                {t.heroBadge}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.9] tracking-tight">
                            MR. <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4E4BA] to-[#D4AF37] bg-clip-text text-transparent">MODE</span>
                        </h1>

                        <p className="text-lg md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                            {t.hero}
                        </p>

                        <div className="mt-10 w-20 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
                    </div>
                </FadeIn>
            </section>

            {/* ═══════════════════════════════════════
                STATS BAR
            ═══════════════════════════════════════ */}
            <section className="relative -mt-1 bg-gradient-to-r from-[#D4AF37] via-[#C9A55C] to-[#D4AF37]">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl md:text-4xl font-black text-[#0A0A0A]">{stat.value}</div>
                                <div className="text-xs uppercase tracking-[0.2em] text-[#0A0A0A]/70 font-semibold mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                OUR STORY - Split Layout
            ═══════════════════════════════════════ */}
            <section className="py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image Side */}
                        <FadeIn>
                            <div className="relative">
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                                    <Image
                                        src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=85"
                                        alt="MR. MODE Collection"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                                {/* Floating accent */}
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[#D4AF37]/30 rounded-2xl" />
                                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#D4AF37]/10 rounded-2xl backdrop-blur-sm" />
                            </div>
                        </FadeIn>

                        {/* Text Side */}
                        <FadeIn delay={0.2}>
                            <div className="space-y-8">
                                <div>
                                    <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em]">{t.subtitle}</span>
                                    <h2 className="text-4xl md:text-5xl font-black mt-3 leading-tight">{t.story.title}</h2>
                                </div>

                                <div className="space-y-5 text-gray-400 text-lg leading-relaxed">
                                    <p>{t.story.p1}</p>
                                    <p>{t.story.p2}</p>
                                    <p>{t.story.p3}</p>
                                </div>

                                <div className="w-16 h-[2px] bg-[#D4AF37]" />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                MISSION - Highlight Block
            ═══════════════════════════════════════ */}
            <section className="py-20 bg-gradient-to-br from-[#111] via-[#0A0A0A] to-[#111] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,175,55,0.08),_transparent_60%)]" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <FadeIn>
                        <div className="p-12 md:p-16 border border-[#D4AF37]/20 rounded-3xl bg-[#0A0A0A]/50 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                            <h2 className="text-3xl md:text-4xl font-black mb-6 text-[#D4AF37]">{t.mission.title}</h2>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                                &ldquo;{t.mission.desc}&rdquo;
                            </p>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                VALUES - Cards Grid
            ═══════════════════════════════════════ */}
            <section className="py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em]">MR. MODE</span>
                            <h2 className="text-4xl md:text-5xl font-black mt-3">{t.values.title}</h2>
                            <div className="mt-6 w-20 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { ...t.values.quality, emoji: '🎯', gradient: 'from-[#D4AF37]/10 to-transparent' },
                            { ...t.values.service, emoji: '🤝', gradient: 'from-[#C9A55C]/10 to-transparent' },
                            { ...t.values.authenticity, emoji: '✅', gradient: 'from-[#D4AF37]/10 to-transparent' },
                            { ...t.values.innovation, emoji: '🚀', gradient: 'from-[#C9A55C]/10 to-transparent' },
                        ].map((value, i) => (
                            <StaggerItem key={i}>
                                <div className={`group relative p-8 md:p-10 rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 bg-gradient-to-br ${value.gradient} transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]`}>
                                    <div className="flex items-start gap-5">
                                        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                            {value.emoji}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">{value.title}</h3>
                                            <p className="text-gray-400 leading-relaxed">{value.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                PROMISES - What You Get
            ═══════════════════════════════════════ */}
            <section className="py-20 bg-[#111]">
                <div className="max-w-7xl mx-auto px-6">
                    <FadeIn>
                        <div className="text-center mb-14">
                            <h2 className="text-3xl md:text-4xl font-black">{t.promises.title}</h2>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {t.promises.items.map((item, i) => (
                            <StaggerItem key={i}>
                                <div className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/20 transition-all duration-300 group">
                                    <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                    <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                LOCATION & CONTACT
            ═══════════════════════════════════════ */}
            <section className="py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Map / Store Image */}
                        <FadeIn>
                            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10">
                                <Image
                                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=85"
                                    alt="MR. MODE Store"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-2 text-[#D4AF37]">
                                        <span className="text-xl">📍</span>
                                        <span className="font-bold">{t.location.city}</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Location Info */}
                        <FadeIn delay={0.2}>
                            <div className="space-y-8">
                                <div>
                                    <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em]">MR. MODE</span>
                                    <h2 className="text-4xl font-black mt-3">{t.location.title}</h2>
                                </div>

                                <div className="space-y-6">
                                    {/* Address */}
                                    <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5">
                                        <span className="text-2xl mt-0.5">📍</span>
                                        <div>
                                            <p className="font-bold text-white">{t.location.address}</p>
                                            <p className="text-gray-400 text-sm mt-1">{t.location.city}</p>
                                        </div>
                                    </div>

                                    {/* Hours */}
                                    <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5">
                                        <span className="text-2xl mt-0.5">🕐</span>
                                        <div>
                                            <p className="font-bold text-white">{t.location.hours}</p>
                                            <p className="text-gray-400 text-sm mt-1">{t.location.satThu}</p>
                                            <p className="text-gray-400 text-sm">{t.location.fri}</p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5">
                                        <span className="text-2xl mt-0.5">📱</span>
                                        <div>
                                            <p className="font-bold text-white" dir="ltr">+212 653 421 432</p>
                                            <p className="text-gray-400 text-sm mt-1">mr.modeshop@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                CTA - Final Call to Action
            ═══════════════════════════════════════ */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_rgba(212,175,55,0.12),_transparent_60%)]" />
                <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-black mb-6">
                            {t.cta}
                        </h2>
                        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                            {t.mission.desc}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href={`/${locale}/contact`}
                                className="w-full sm:w-auto px-10 py-4 bg-[#D4AF37] text-[#0A0A0A] font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-[#F4E4BA] transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] text-center"
                            >
                                {t.cta}
                            </Link>
                            <a
                                href="https://wa.me/212653421432"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-10 py-4 border border-green-500/40 text-green-400 font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-green-500/10 transition-all text-center flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                {t.ctaWhatsapp}
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <WhatsAppFloat
                phoneNumber="212653421432"
                message={isRTL ? 'السلام عليكم، بغيت نستفسر على MR. MODE' : 'Hello, I would like to know more about MR. MODE'}
            />
        </div>
    );
}
