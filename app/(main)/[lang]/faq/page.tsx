import { Metadata } from 'next';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import FadeIn from '@/components/animations/FadeIn';
import FAQSection from '@/components/FAQSection';

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
        title: 'الأسئلة الشائعة',
        subtitle: 'أجوبة على أكثر الأسئلة شيوعاً',
        faqs: [
            {
                question: 'كيف يمكنني الطلب؟',
                answer: 'يمكنك الطلب مباشرة عبر واتساب من خلال النقر على زر "اطلب عبر واتساب" في صفحة المنتج، أو التواصل معنا على الرقم +212 653 421 432'
            },
            {
                question: 'ما هي طرق الدفع المتاحة؟',
                answer: 'نوفر الدفع عند الاستلام لجميع الطلبات داخل المغرب. كما نقبل التحويل البنكي للطلبات الكبيرة.'
            },
            {
                question: 'كم تستغرق مدة التوصيل؟',
                answer: 'التوصيل داخل الدار البيضاء يستغرق 24-48 ساعة. للمدن الأخرى قد يستغرق 2-4 أيام حسب الموقع.'
            },
            {
                question: 'هل التوصيل مجاني؟',
                answer: 'نعم، التوصيل مجاني لجميع الطلبات داخل المغرب.'
            },
            {
                question: 'هل يمكن إرجاع أو استبدال المنتج؟',
                answer: 'نعم، يمكنك إرجاع أو استبدال المنتج خلال 5 أيام من تاريخ الاستلام بشرط أن يكون في حالته الأصلية مع جميع الملصقات.'
            },
            {
                question: 'كيف أعرف المقاس المناسب؟',
                answer: 'يمكنك التواصل معنا عبر واتساب وسنساعدك في اختيار المقاس المناسب بناءً على مقاساتك. كما نوفر جدول مقاسات لكل منتج.'
            },
            {
                question: 'هل المنتجات أصلية؟',
                answer: 'نعم، جميع منتجاتنا أصلية 100% ونوفر ضمان الجودة لكل قطعة.'
            },
            {
                question: 'هل لديكم متجر فعلي؟',
                answer: 'نعم، متجرنا موجود في درب التعاون، زنقة 71، الحي الحسني، الدار البيضاء. ساعات العمل: السبت-الخميس (10h-23h)، الجمعة (15h-23h)'
            },
            {
                question: 'كيف يمكنني تتبع طلبي؟',
                answer: 'بعد إتمام الطلب سنرسل لك رقم التتبع عبر واتساب. يمكنك أيضاً زيارة صفحة "تتبع الطلب" وإدخال رقم طلبك.'
            },
            {
                question: 'ماذا لو كان المقاس غير مناسب؟',
                answer: 'يمكنك استبدال المنتج بمقاس آخر مجاناً خلال 5 أيام من الاستلام. فقط تواصل معنا عبر واتساب.'
            }
        ],
        cta: 'لم تجد إجابة؟ تواصل معنا',
    },
    en: {
        title: 'Frequently Asked Questions',
        subtitle: 'Answers to the most common questions',
        faqs: [
            {
                question: 'How can I place an order?',
                answer: 'You can order directly via WhatsApp by clicking the "Order via WhatsApp" button on the product page, or contact us at +212 653 421 432'
            },
            {
                question: 'What payment methods are available?',
                answer: 'We offer Cash on Delivery for all orders within Morocco. We also accept bank transfer for large orders.'
            },
            {
                question: 'How long does delivery take?',
                answer: 'Delivery within Casablanca takes 24-48 hours. For other cities it may take 2-4 days depending on location.'
            },
            {
                question: 'Is delivery free?',
                answer: 'Yes, delivery is free for all orders within Morocco.'
            },
            {
                question: 'Can I return or exchange a product?',
                answer: 'Yes, you can return or exchange the product within 5 days of receipt provided it is in its original condition with all tags.'
            },
            {
                question: 'How do I know my size?',
                answer: 'You can contact us via WhatsApp and we will help you choose the right size based on your measurements. We also provide a size chart for each product.'
            },
            {
                question: 'Are the products authentic?',
                answer: 'Yes, all our products are 100% authentic and we provide quality guarantee for every piece.'
            },
            {
                question: 'Do you have a physical store?',
                answer: 'Yes, our store is located at Derb Taawoun, Rue 71, Hay Hassani, Casablanca. Working hours: Sat-Thu (10am-11pm), Fri (3pm-11pm)'
            },
            {
                question: 'How can I track my order?',
                answer: 'After placing your order we will send you a tracking number via WhatsApp. You can also visit the "Track Order" page and enter your order number.'
            },
            {
                question: 'What if the size doesn\'t fit?',
                answer: 'You can exchange the product for another size free of charge within 5 days of receipt. Just contact us via WhatsApp.'
            }
        ],
        cta: 'Didn\'t find an answer? Contact us',
    },
    fr: {
        title: 'Questions Fréquentes',
        subtitle: 'Réponses aux questions les plus courantes',
        faqs: [
            {
                question: 'Comment puis-je passer commande?',
                answer: 'Vous pouvez commander directement via WhatsApp en cliquant sur le bouton "Commander via WhatsApp" sur la page du produit, ou nous contacter au +212 653 421 432'
            },
            {
                question: 'Quels modes de paiement sont disponibles?',
                answer: 'Nous proposons le paiement à la livraison pour toutes les commandes au Maroc. Nous acceptons également le virement bancaire pour les grosses commandes.'
            },
            {
                question: 'Combien de temps prend la livraison?',
                answer: 'La livraison à Casablanca prend 24-48 heures. Pour les autres villes, cela peut prendre 2-4 jours selon l\'emplacement.'
            },
            {
                question: 'La livraison est-elle gratuite?',
                answer: 'Oui, la livraison est gratuite pour toutes les commandes au Maroc.'
            },
            {
                question: 'Puis-je retourner ou échanger un produit?',
                answer: 'Oui, vous pouvez retourner ou échanger le produit dans les 5 jours suivant la réception à condition qu\'il soit dans son état d\'origine avec toutes les étiquettes.'
            },
            {
                question: 'Comment connaître ma taille?',
                answer: 'Vous pouvez nous contacter via WhatsApp et nous vous aiderons à choisir la bonne taille en fonction de vos mesures. Nous fournissons également un guide des tailles pour chaque produit.'
            },
            {
                question: 'Les produits sont-ils authentiques?',
                answer: 'Oui, tous nos produits sont 100% authentiques et nous fournissons une garantie de qualité pour chaque pièce.'
            },
            {
                question: 'Avez-vous un magasin physique?',
                answer: 'Oui, notre magasin est situé à Derb Taawoun, Rue 71, Hay Hassani, Casablanca. Horaires: Sam-Jeu (10h-23h), Ven (15h-23h)'
            },
            {
                question: 'Comment puis-je suivre ma commande?',
                answer: 'Après avoir passé votre commande, nous vous enverrons un numéro de suivi via WhatsApp. Vous pouvez également visiter la page "Suivre la commande" et saisir votre numéro de commande.'
            },
            {
                question: 'Que faire si la taille ne convient pas?',
                answer: 'Vous pouvez échanger le produit gratuitement contre une autre taille dans les 5 jours suivant la réception. Contactez-nous simplement via WhatsApp.'
            }
        ],
        cta: 'Vous n\'avez pas trouvé de réponse? Contactez-nous',
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
        description: t.subtitle,
    };
}

export default async function FAQPage({
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
                        <p className="text-gray-400 text-xl">{t.subtitle}</p>
                    </div>
                </FadeIn>

                {/* FAQs */}
                <FadeIn delay={0.2}>
                    <FAQSection faqs={t.faqs} />
                </FadeIn>

                {/* CTA */}
                <FadeIn delay={0.3}>
                    <div className="mt-16 text-center p-8 bg-gray-900 rounded-lg border border-gray-800">
                        <h2 className="text-2xl font-bold mb-4">{t.cta}</h2>
                        <a
                            href={`/${locale}/contact`}
                            className="inline-block bg-yellow-500 text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-yellow-400 transition rounded-lg"
                        >
                            {isRTL ? 'تواصل معنا' : locale === 'fr' ? 'Contactez-nous' : 'Contact Us'}
                        </a>
                    </div>
                </FadeIn>
            </div>

            <WhatsAppFloat
                phoneNumber="212653421432"
                message={isRTL ? 'السلام عليكم، عندي سؤال' : 'Hello, I have a question'}
            />
        </div>
    );
}
