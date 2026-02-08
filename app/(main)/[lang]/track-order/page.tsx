// app/[lang]/track-order/page.tsx
import { Metadata } from 'next';
import TrackOrderClient from './TrackOrderClient';

// ============================================
// 🌐 Language Support
// ============================================
const SUPPORTED_LANGUAGES = ['ar', 'en', 'fr'] as const;
type Locale = (typeof SUPPORTED_LANGUAGES)[number];

function getValidLocale(lang: string | undefined): Locale {
    if (!lang || !SUPPORTED_LANGUAGES.includes(lang as Locale)) {
        return 'ar';
    }
    return lang as Locale;
}

// ============================================
// 📝 Translations
// ============================================
const translations = {
    ar: {
        title: 'تتبع طلبك',
        subtitle: 'أدخل رقم الطلب لمعرفة حالة الشحن',
        orderNumber: 'رقم الطلب',
        placeholder: 'مثال: MRM-123456',
        trackButton: 'تتبع الطلب',
        or: 'أو',
        whatsapp: 'تواصل معنا عبر واتساب',
        helpText: 'إذا لم تجد رقم الطلب، تواصل معنا وسنساعدك',
    },
    en: {
        title: 'Track Your Order',
        subtitle: 'Enter your order number to check shipping status',
        orderNumber: 'Order Number',
        placeholder: 'Example: MRM-123456',
        trackButton: 'Track Order',
        or: 'or',
        whatsapp: 'Contact us via WhatsApp',
        helpText: "Can't find your order number? Contact us and we'll help",
    },
    fr: {
        title: 'Suivre votre commande',
        subtitle: 'Entrez votre numéro de commande pour vérifier le statut',
        orderNumber: 'Numéro de commande',
        placeholder: 'Exemple: MRM-123456',
        trackButton: 'Suivre la commande',
        or: 'ou',
        whatsapp: 'Contactez-nous via WhatsApp',
        helpText: 'Vous ne trouvez pas votre numéro? Contactez-nous',
    },
};

// ============================================
// 📊 Metadata
// ============================================
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

// ============================================
// 📦 Track Order Page
// ============================================
export default async function TrackOrderPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const locale = getValidLocale(lang);
    const t = translations[locale];
    const isRTL = locale === 'ar';

    const PHONE_NUMBER = '212653421432';

    return (
        <div
            className="min-h-screen bg-black text-white py-20"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div className="max-w-xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold mb-4">
                        📦
                    </div>
                    <h1 className="text-4xl font-black mb-4">{t.title}</h1>
                    <p className="text-gray-400">{t.subtitle}</p>
                </div>

                {/* Track Form (client component) */}
                <TrackOrderClient
                    trackButton={t.trackButton}
                    orderNumberLabel={t.orderNumber}
                    placeholder={t.placeholder}
                    isRTL={isRTL}
                    phoneNumber={PHONE_NUMBER}
                />

                {/* Divider */}
                <div className="flex items-center gap-4 my-10">
                    <div className="flex-1 h-px bg-gray-800"></div>
                    <span className="text-gray-500 text-sm">{t.or}</span>
                    <div className="flex-1 h-px bg-gray-800"></div>
                </div>

                {/* WhatsApp */}
                <a
                    href={`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
                        isRTL ? 'مرحبا، أريد تتبع طلبي' : 'Hello, I want to track my order'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-green-600 text-white py-4 font-bold rounded-lg hover:bg-green-500 transition"
                >
                    <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t.whatsapp}
                </a>

                {/* Help Text */}
                <p className="text-center text-gray-500 text-sm mt-8">
                    {t.helpText}
                </p>
            </div>
        </div>
    );
}
