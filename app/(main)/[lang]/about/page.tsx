import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import FadeIn from '@/components/animations/FadeIn';

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
        hero: 'نحن نؤمن بأن الأناقة ليست مجرد ملابس، بل هي أسلوب حياة',
        story: {
            title: 'قصتنا',
            p1: 'بدأت MR. MODE في قلب الدار البيضاء بحلم بسيط: تقديم أزياء رجالية فاخرة بأسعار معقولة للرجل المغربي العصري.',
            p2: 'منذ تأسيسنا في 2026، كرسنا أنفسنا لاختيار أفضل الأقمشة والتصاميم العصرية التي تجمع بين الأناقة الكلاسيكية والراحة العملية.',
            p3: 'اليوم، نفخر بخدمة آلاف العملاء في جميع أنحاء المغرب، ونستمر في تطوير مجموعاتنا لتلبية تطلعات كل رجل يبحث عن التميز.',
        },
        values: {
            title: 'قيمنا',
            quality: { title: 'الجودة أولاً', desc: 'نختار فقط أفضل الأقمشة والخامات من موردين موثوقين' },
            service: { title: 'خدمة متميزة', desc: 'فريقنا متاح دائماً لمساعدتك في اختيار ما يناسبك' },
            authenticity: { title: 'الأصالة', desc: 'جميع منتجاتنا أصلية 100% مع ضمان الجودة' },
            innovation: { title: 'التجديد', desc: 'نواكب أحدث صيحات الموضة العالمية' },
        },
        team: {
            title: 'فريقنا',
            desc: 'مجموعة من المحترفين المتحمسين لتقديم أفضل تجربة تسوق',
        },
        cta: 'تواصل معنا',
    },
    en: {
        title: 'About Us',
        subtitle: 'The MR. MODE Story',
        hero: 'We believe that elegance is not just clothing, but a way of life',
        story: {
            title: 'Our Story',
            p1: 'MR. MODE started in the heart of Casablanca with a simple dream: to offer luxury menswear at affordable prices for the modern Moroccan man.',
            p2: 'Since our founding in 2026, we have dedicated ourselves to selecting the finest fabrics and modern designs that combine classic elegance with practical comfort.',
            p3: 'Today, we are proud to serve thousands of customers across Morocco, and we continue to develop our lines to meet the aspirations of every man seeking excellence.',
        },
        values: {
            title: 'Our Values',
            quality: { title: 'Quality First', desc: 'We select only the finest fabrics and materials from trusted suppliers' },
            service: { title: 'Excellent Service', desc: 'Our team is always available to help you choose what suits you' },
            authenticity: { title: 'Authenticity', desc: 'All our products are 100% genuine with quality guarantee' },
            innovation: { title: 'Innovation', desc: 'We keep up with the latest global fashion trends' },
        },
        team: {
            title: 'Our Team',
            desc: 'A group of professionals passionate about providing the best shopping experience',
        },
        cta: 'Contact Us',
    },
    fr: {
        title: 'À Propos',
        subtitle: 'L\'Histoire de MR. MODE',
        hero: 'Nous croyons que l\'élégance n\'est pas seulement des vêtements, mais un mode de vie',
        story: {
            title: 'Notre Histoire',
            p1: 'MR. MODE a débuté au cœur de Casablanca avec un rêve simple : offrir des vêtements pour hommes de luxe à des prix abordables pour l\'homme marocain moderne.',
            p2: 'Depuis notre fondation en 2026, nous nous sommes consacrés à la sélection des meilleurs tissus et designs modernes qui allient élégance classique et confort pratique.',
            p3: 'Aujourd\'hui, nous sommes fiers de servir des milliers de clients à travers le Maroc, et nous continuons à développer nos lignes pour répondre aux aspirations de chaque homme en quête d\'excellence.',
        },
        values: {
            title: 'Nos Valeurs',
            quality: { title: 'Qualité d\'abord', desc: 'Nous sélectionnons uniquement les meilleurs tissus et matériaux auprès de fournisseurs de confiance' },
            service: { title: 'Service Excellent', desc: 'Notre équipe est toujours disponible pour vous aider à choisir ce qui vous convient' },
            authenticity: { title: 'Authenticité', desc: 'Tous nos produits sont 100% authentiques avec garantie de qualité' },
            innovation: { title: 'Innovation', desc: 'Nous suivons les dernières tendances de la mode mondiale' },
        },
        team: {
            title: 'Notre Équipe',
            desc: 'Un groupe de professionnels passionnés par l\'offre de la meilleure expérience d\'achat',
        },
        cta: 'Contactez-nous',
    },
};

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

    return (
        <div className="min-h-screen bg-black text-white" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Hero */}
            <section className="relative h-[50vh] flex items-center justify-center">
                <Image
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80"
                    alt="MR. MODE Store"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black" />
                <FadeIn>
                    <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-black mb-4">{t.title}</h1>
                        <p className="text-xl text-gray-300">{t.hero}</p>
                    </div>
                </FadeIn>
            </section>

            {/* Story */}
            <section className="py-20 max-w-4xl mx-auto px-6">
                <FadeIn delay={0.2}>
                    <h2 className="text-3xl font-black mb-8 text-yellow-500">{t.story.title}</h2>
                    <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                        <p>{t.story.p1}</p>
                        <p>{t.story.p2}</p>
                        <p>{t.story.p3}</p>
                    </div>
                </FadeIn>
            </section>

            {/* Values */}
            <section className="py-20 bg-gray-900">
                <div className="max-w-7xl mx-auto px-6">
                    <FadeIn delay={0.3}>
                        <h2 className="text-3xl font-black text-center mb-12">{t.values.title}</h2>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Object.values(t.values).slice(1).map((value: any, i) => (
                            <FadeIn key={i} delay={0.4 + i * 0.1}>
                                <div className="text-center p-6 border border-gray-800 rounded-lg hover:border-yellow-500 transition">
                                    <div className="text-4xl mb-4">
                                        {['🎯', '🤝', '✅', '🚀'][i]}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                    <p className="text-gray-400 text-sm">{value.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <FadeIn delay={0.5}>
                        <h2 className="text-3xl font-black mb-4">{t.team.title}</h2>
                        <p className="text-gray-400 text-lg mb-12">{t.team.desc}</p>
                        <Link
                            href={`/${locale}/contact`}
                            className="inline-block bg-yellow-500 text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-yellow-400 transition rounded-lg"
                        >
                            {t.cta}
                        </Link>
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
