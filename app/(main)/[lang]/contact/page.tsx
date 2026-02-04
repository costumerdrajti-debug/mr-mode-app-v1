import { Metadata } from 'next';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import FadeIn from '@/components/animations/FadeIn';
import ContactForm from '@/components/ContactForm';

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
        title: 'اتصل بنا',
        subtitle: 'نحن هنا لمساعدتك',
        formTitle: 'أرسل لنا رسالة',
        infoTitle: 'معلومات الاتصال',
        address: 'درب التعاون، زنقة 71، الحي الحسني، الدار البيضاء',
        phone: '+212 653 421 432',
        email: 'mr.modeshop@gmail.com',
        hours: 'ساعات العمل',
        satThu: 'السبت - الخميس: 10:00 - 23:00',
        fri: 'الجمعة: 15:00 - 23:00',
        whatsapp: 'أو تواصل معنا مباشرة عبر واتساب',
    },
    en: {
        title: 'Contact Us',
        subtitle: 'We are here to help you',
        formTitle: 'Send us a message',
        infoTitle: 'Contact Information',
        address: 'Derb Taawoun, Rue 71, Hay Hassani, Casablanca',
        phone: '+212 653 421 432',
        email: 'mr.modeshop@gmail.com',
        hours: 'Working Hours',
        satThu: 'Saturday - Thursday: 10:00 - 23:00',
        fri: 'Friday: 15:00 - 23:00',
        whatsapp: 'Or contact us directly via WhatsApp',
    },
    fr: {
        title: 'Contactez-nous',
        subtitle: 'Nous sommes là pour vous aider',
        formTitle: 'Envoyez-nous un message',
        infoTitle: 'Informations de Contact',
        address: 'Derb Taawoun, Rue 71, Hay Hassani, Casablanca',
        phone: '+212 653 421 432',
        email: 'mr.modeshop@gmail.com',
        hours: 'Horaires d\'ouverture',
        satThu: 'Samedi - Jeudi: 10:00 - 23:00',
        fri: 'Vendredi: 15:00 - 23:00',
        whatsapp: 'Ou contactez-nous directement via WhatsApp',
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

export default async function ContactPage({
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
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <FadeIn>
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-black mb-4">{t.title}</h1>
                        <p className="text-gray-400 text-xl">{t.subtitle}</p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <FadeIn delay={0.2}>
                        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                            <h2 className="text-2xl font-bold mb-6 text-yellow-500">{t.formTitle}</h2>
                            <ContactForm locale={locale} />
                        </div>
                    </FadeIn>

                    {/* Contact Info */}
                    <FadeIn delay={0.3}>
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-yellow-500">{t.infoTitle}</h2>

                                {/* Address */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="text-3xl">📍</div>
                                    <div>
                                        <h3 className="font-bold mb-1">{isRTL ? 'العنوان' : locale === 'fr' ? 'Adresse' : 'Address'}</h3>
                                        <p className="text-gray-400">{t.address}</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="text-3xl">📞</div>
                                    <div>
                                        <h3 className="font-bold mb-1">{isRTL ? 'الهاتف' : locale === 'fr' ? 'Téléphone' : 'Phone'}</h3>
                                        <a href="tel:+212653421432" className="text-gray-400 hover:text-yellow-500 transition" dir="ltr">
                                            {t.phone}
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="text-3xl">📧</div>
                                    <div>
                                        <h3 className="font-bold mb-1">{isRTL ? 'البريد الإلكتروني' : 'Email'}</h3>
                                        <a href="mailto:mr.modeshop@gmail.com" className="text-gray-400 hover:text-yellow-500 transition">
                                            {t.email}
                                        </a>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex items-start gap-4">
                                    <div className="text-3xl">🕐</div>
                                    <div>
                                        <h3 className="font-bold mb-1">{t.hours}</h3>
                                        <p className="text-gray-400">{t.satThu}</p>
                                        <p className="text-gray-400">{t.fri}</p>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp CTA */}
                            <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                                <p className="text-center mb-4">{t.whatsapp}</p>
                                <a
                                    href="https://wa.me/212653421432"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full bg-green-600 text-white py-3 font-bold rounded-lg hover:bg-green-500 transition"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp
                                </a>
                            </div>

                            {/* Map */}
                            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.7244897841875!2d-7.589843!3d33.561049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDMzJzM5LjgiTiA3wrAzNScyMy40Ilc!5e0!3m2!1sen!2sma!4v1234567890"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>

            <WhatsAppFloat
                phoneNumber="212653421432"
                message={isRTL ? 'السلام عليكم، بغيت نستفسر' : 'Hello, I have a question'}
            />
        </div>
    );
}
