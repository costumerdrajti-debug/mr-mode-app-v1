import { Metadata } from 'next';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import FadeIn from '@/components/animations/FadeIn';
import Link from 'next/link';

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
        title: 'سياسة الإرجاع والشحن',
        shipping: {
            title: '📦 سياسة الشحن',
            free: 'الشحن مجاني',
            freeDesc: 'نوفر الشحن المجاني لجميع الطلبات داخل المغرب',
            delivery: 'مدة التوصيل',
            casablanca: 'الدار البيضاء: 24-48 ساعة',
            morocco: 'باقي المدن: 2-4 أيام',
            tracking: 'تتبع الطلب',
            trackingDesc: 'سنرسل لك رقم التتبع عبر واتساب فور شحن طلبك',
        },
        returns: {
            title: '↩️ سياسة الإرجاع',
            period: 'مدة الإرجاع',
            periodDesc: 'يمكنك إرجاع أو استبدال المنتج خلال 5 أيام من تاريخ الاستلام',
            conditions: 'شروط الإرجاع',
            cond1: 'المنتج في حالته الأصلية مع جميع الملصقات',
            cond2: 'عدم استعمال المنتج أو غسله',
            cond3: 'التغليف الأصلي سليم',
            free: 'الإرجاع مجاني',
            freeDesc: 'نتحمل تكاليف الإرجاع والاستبدال',
            exchange: 'كيفية الإرجاع',
            exchangeDesc: 'تواصل معنا عبر واتساب وسنرتب عملية الإرجاع',
        },
        payment: {
            title: '💳 طرق الدفع',
            cod: 'الدفع عند الاستلام',
            codDesc: 'ادفع نقداً عند استلام طلبك',
            transfer: 'التحويل البنكي',
            transferDesc: 'للطلبات الكبيرة فقط',
        },
        contact: 'لأي استفسار، تواصل معنا',
    },
    en: {
        title: 'Return & Shipping Policy',
        shipping: {
            title: '📦 Shipping Policy',
            free: 'Free Shipping',
            freeDesc: 'We offer free shipping on all orders within Morocco',
            delivery: 'Delivery Time',
            casablanca: 'Casablanca: 24-48 hours',
            morocco: 'Other cities: 2-4 days',
            tracking: 'Order Tracking',
            trackingDesc: 'We will send you a tracking number via WhatsApp once your order is shipped',
        },
        returns: {
            title: '↩️ Return Policy',
            period: 'Return Period',
            periodDesc: 'You can return or exchange the product within 5 days of receipt',
            conditions: 'Return Conditions',
            cond1: 'Product in original condition with all tags',
            cond2: 'Product not used or washed',
            cond3: 'Original packaging intact',
            free: 'Free Returns',
            freeDesc: 'We cover return and exchange costs',
            exchange: 'How to Return',
            exchangeDesc: 'Contact us via WhatsApp and we will arrange the return',
        },
        payment: {
            title: '💳 Payment Methods',
            cod: 'Cash on Delivery',
            codDesc: 'Pay cash when you receive your order',
            transfer: 'Bank Transfer',
            transferDesc: 'For large orders only',
        },
        contact: 'For any questions, contact us',
    },
    fr: {
        title: 'Politique de Retour et Livraison',
        shipping: {
            title: '📦 Politique de Livraison',
            free: 'Livraison Gratuite',
            freeDesc: 'Nous offrons la livraison gratuite sur toutes les commandes au Maroc',
            delivery: 'Délai de Livraison',
            casablanca: 'Casablanca: 24-48 heures',
            morocco: 'Autres villes: 2-4 jours',
            tracking: 'Suivi de Commande',
            trackingDesc: 'Nous vous enverrons un numéro de suivi via WhatsApp dès l\'expédition de votre commande',
        },
        returns: {
            title: '↩️ Politique de Retour',
            period: 'Période de Retour',
            periodDesc: 'Vous pouvez retourner ou échanger le produit dans les 5 jours suivant la réception',
            conditions: 'Conditions de Retour',
            cond1: 'Produit dans son état d\'origine avec toutes les étiquettes',
            cond2: 'Produit non utilisé ou lavé',
            cond3: 'Emballage d\'origine intact',
            free: 'Retours Gratuits',
            freeDesc: 'Nous prenons en charge les frais de retour et d\'échange',
            exchange: 'Comment Retourner',
            exchangeDesc: 'Contactez-nous via WhatsApp et nous organiserons le retour',
        },
        payment: {
            title: '💳 Méthodes de Paiement',
            cod: 'Paiement à la Livraison',
            codDesc: 'Payez en espèces à la réception de votre commande',
            transfer: 'Virement Bancaire',
            transferDesc: 'Pour les grosses commandes uniquement',
        },
        contact: 'Pour toute question, contactez-nous',
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
        description: t.shipping.freeDesc,
    };
}

export default async function ReturnsPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const locale = getValidLocale(lang);
    const t = translations[locale];
    const isRTL = locale === 'ar';

    return (
        <div className="min-h-screen bg-black text-white py-20" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <FadeIn>
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-black mb-4">{t.title}</h1>
                    </div>
                </FadeIn>

                <div className="space-y-12">
                    {/* Shipping */}
                    <FadeIn delay={0.2}>
                        <section className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                            <h2 className="text-3xl font-bold mb-6 text-yellow-500">{t.shipping.title}</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">✅ {t.shipping.free}</h3>
                                    <p className="text-gray-400">{t.shipping.freeDesc}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-2">🚚 {t.shipping.delivery}</h3>
                                    <ul className="text-gray-400 space-y-2">
                                        <li>• {t.shipping.casablanca}</li>
                                        <li>• {t.shipping.morocco}</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-2">📍 {t.shipping.tracking}</h3>
                                    <p className="text-gray-400">{t.shipping.trackingDesc}</p>
                                </div>
                            </div>
                        </section>
                    </FadeIn>

                    {/* Returns */}
                    <FadeIn delay={0.3}>
                        <section className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                            <h2 className="text-3xl font-bold mb-6 text-yellow-500">{t.returns.title}</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">⏱️ {t.returns.period}</h3>
                                    <p className="text-gray-400">{t.returns.periodDesc}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-2">📋 {t.returns.conditions}</h3>
                                    <ul className="text-gray-400 space-y-2">
                                        <li>• {t.returns.cond1}</li>
                                        <li>• {t.returns.cond2}</li>
                                        <li>• {t.returns.cond3}</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-2">✅ {t.returns.free}</h3>
                                    <p className="text-gray-400">{t.returns.freeDesc}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-2">💬 {t.returns.exchange}</h3>
                                    <p className="text-gray-400">{t.returns.exchangeDesc}</p>
                                </div>
                            </div>
                        </section>
                    </FadeIn>

                    {/* Payment */}
                    <FadeIn delay={0.4}>
                        <section className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                            <h2 className="text-3xl font-bold mb-6 text-yellow-500">{t.payment.title}</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">💵 {t.payment.cod}</h3>
                                    <p className="text-gray-400">{t.payment.codDesc}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-2">🏦 {t.payment.transfer}</h3>
                                    <p className="text-gray-400">{t.payment.transferDesc}</p>
                                </div>
                            </div>
                        </section>
                    </FadeIn>

                    {/* CTA */}
                    <FadeIn delay={0.5}>
                        <div className="text-center p-8 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                            <p className="text-xl mb-6">{t.contact}</p>
                            <Link
                                href={`/${locale}/contact`}
                                className="inline-block bg-yellow-500 text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-yellow-400 transition rounded-lg"
                            >
                                {isRTL ? 'تواصل معنا' : locale === 'fr' ? 'Contactez-nous' : 'Contact Us'}
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </div>

            <WhatsAppFloat
                phoneNumber="212653421432"
                message={isRTL ? 'السلام عليكم، عندي سؤال حول سياسة الإرجاع' : 'Hello, I have a question about the return policy'}
            />
        </div>
    );
}
