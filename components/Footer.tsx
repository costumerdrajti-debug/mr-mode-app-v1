'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle, Star } from 'lucide-react';
import Link from 'next/link';

const PHONE_NUMBER = "212653421432";
const STORE_ADDRESS = "درب التعاون زنقة 71 الحي الحسني الدار البيضاء، المغرب 🇲🇦";

// ساعات العمل
const getStoreStatus = (): { isOpen: boolean; message: string } => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    // الجمعة: 15:00 - 23:00
    if (day === 5) {
        const openTime = 15 * 60; // 15:00
        const closeTime = 23 * 60; // 23:00
        if (currentTime >= openTime && currentTime < closeTime) {
            return { isOpen: true, message: 'مفتوح الآن - حتى 23:00' };
        } else if (currentTime < openTime) {
            return { isOpen: false, message: 'يفتح بعد صلاة الجمعة (15:00)' };
        }
        return { isOpen: false, message: 'مغلق - يفتح غداً 10:00' };
    }

    // السبت - الخميس: 10:00 - 23:00
    const openTime = 10 * 60; // 10:00
    const closeTime = 23 * 60; // 23:00

    if (currentTime >= openTime && currentTime < closeTime) {
        const remainingMinutes = closeTime - currentTime;
        if (remainingMinutes <= 60) {
            return { isOpen: true, message: `مفتوح - يغلق خلال ${remainingMinutes} دقيقة` };
        }
        return { isOpen: true, message: 'مفتوح الآن - حتى 23:00' };
    } else if (currentTime < openTime) {
        return { isOpen: false, message: 'مغلق - يفتح 10:00 صباحاً' };
    }
    return { isOpen: false, message: 'مغلق - يفتح غداً 10:00' };
};

const footerLinks = {
    shop: {
        title: 'تسوق',
        links: [
            { name: 'ملابس', href: '/category/clothing' },
            { name: 'أحذية', href: '/category/shoes' },
            { name: 'إكسسوارات', href: '/category/accessories' },
            { name: 'تخفيضات 🔥', href: '/sale' },
            { name: 'وصل حديثاً', href: '/new' },
        ]
    },
    help: {
        title: 'المساعدة',
        links: [
            { name: 'تتبع طلبك', href: '/track' },
            { name: 'سياسة الإرجاع', href: '/returns' },
            { name: 'الأسئلة الشائعة', href: '/faq' },
            { name: 'اتصل بنا', href: '/contact' },
        ]
    },
    about: {
        title: 'عن المتجر',
        links: [
            { name: 'من نحن', href: '/about' },
            { name: 'فروعنا', href: '/stores' },
            { name: 'الوظائف', href: '/careers' },
        ]
    }
};

const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/mrmode', color: 'hover:bg-blue-600' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/mrmode', color: 'hover:bg-pink-600' },
    { name: 'TikTok', icon: () => <span className="text-lg">🎵</span>, href: 'https://tiktok.com/@mrmode', color: 'hover:bg-gray-700' },
    { name: 'WhatsApp', icon: MessageCircle, href: `https://wa.me/${PHONE_NUMBER}`, color: 'hover:bg-green-600' },
];

// آراء العملاء
const customerReviews = [
    {
        name: 'أحمد م.',
        rating: 5,
        comment: 'جودة ممتازة والتوصيل سريع جداً! أنصح بشدة 👍',
        date: 'منذ أسبوع',
        city: 'الدار البيضاء'
    },
    {
        name: 'يوسف ك.',
        rating: 5,
        comment: 'أفضل متجر للملابس الرجالية في المغرب. الأسعار معقولة والجودة عالية',
        date: 'منذ 3 أيام',
        city: 'الرباط'
    },
    {
        name: 'محمد ب.',
        rating: 5,
        comment: 'خدمة عملاء رائعة والمنتجات تطابق الصور 100%',
        date: 'منذ يومين',
        city: 'مراكش'
    },
];


import translations from '../app/i18n';
type Translation = typeof translations['ar'];
type TranslationKey = keyof Translation;
interface FooterProps {
    lang: 'ar' | 'fr' | 'en';
    t: Translation;
}

export default function Footer({ lang = 'ar', t }: FooterProps) {
    const [storeStatus, setStoreStatus] = useState(getStoreStatus());

    useEffect(() => {
        const interval = setInterval(() => {
            setStoreStatus(getStoreStatus());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    // Helper for translation fallback
    const tr = (key: TranslationKey, fallback: string) => (t && t[key]) || fallback;

    return (
        <footer className="bg-[#0a0a0a] border-t border-white/10">
            {/* الميزات و Trust Badges */}
            <div className="border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="p-3 bg-[#D4AF37]/20 rounded-lg">
                                <span className="text-2xl">🚚</span>
                            </div>
                            <div>
                                <p className="font-bold text-white text-sm">{tr('fastDelivery', 'توصيل سريع لكل المدن')}</p>
                                <p className="text-xs text-gray-500">{tr('freeOver500', 'مجاني فوق 500 درهم')}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="p-3 bg-[#D4AF37]/20 rounded-lg">
                                <span className="text-2xl">💳</span>
                            </div>
                            <div>
                                <p className="font-bold text-white text-sm">{tr('cod', 'الدفع عند الاستلام')}</p>
                                <p className="text-xs text-gray-500">{tr('safeGuaranteed', 'آمن و مضمون 100%')}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="p-3 bg-[#D4AF37]/20 rounded-lg">
                                <span className="text-2xl">🔄</span>
                            </div>
                            <div>
                                <p className="font-bold text-white text-sm">{tr('freeReturns', 'إرجاع مجاني')}</p>
                                <p className="text-xs text-gray-500">{tr('within5days', 'خلال 5 أيام')}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="p-3 bg-[#D4AF37]/20 rounded-lg">
                                <span className="text-2xl">✅</span>
                            </div>
                            <div>
                                <p className="font-bold text-white text-sm">{tr('originalProducts', 'منتجات أصلية')}</p>
                                <p className="text-xs text-gray-500">{tr('quality100', 'جودة مضمونة 100%')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* آراء العملاء */}
            <div className="border-b border-white/5 bg-gradient-to-b from-[#0a0a0a] to-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            آراء <span className="text-[#D4AF37]">عملائنا</span> 💬
                        </h3>
                        <p className="text-gray-500 text-sm">أكثر من 5000+ عميل سعيد</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {customerReviews.map((review, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 rounded-2xl p-6 border border-white/10"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center text-black font-bold text-lg">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">{review.name}</p>
                                        <p className="text-xs text-gray-500">{review.city} • {review.date}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 mb-3">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-[#D4AF37] text-[#D4AF37]" />
                                    ))}
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">&quot;{review.comment}&quot;</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <a
                            href={`https://wa.me/${PHONE_NUMBER}?text=مرحباً، أريد رؤية آراء العملاء`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30 transition-colors"
                        >
                            <MessageCircle size={18} />
                            <span className="font-medium">شاهد المزيد من الآراء على واتساب</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* المحتوى الرئيسي */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* معلومات المتجر */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/">
                            <span className="text-3xl font-black bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                                MR. MODE
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            متجرك الأول للأزياء الرجالية الفاخرة في الدار البيضاء والمغرب. نقدم لك أرقى الماركات العالمية مع ضمان الجودة والأناقة.
                        </p>

                        {/* حالة المتجر - Open/Closed Badge */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${storeStatus.isOpen ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            <span className={`w-2.5 h-2.5 rounded-full ${storeStatus.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                            <span className="font-medium text-sm">
                                {storeStatus.isOpen ? 'مفتوح الآن 🟢' : 'مغلق الآن 🔴'}
                            </span>
                            <span className="text-xs opacity-75">- {storeStatus.message}</span>
                        </div>

                        {/* معلومات الاتصال */}
                        <div className="space-y-3">
                            <a href={`tel:+${PHONE_NUMBER}`} className="flex items-center gap-3 text-gray-400 hover:text-[#D4AF37] transition-colors" dir="ltr">
                                <Phone size={18} />
                                <span>+212 653 421 432</span>
                            </a>
                            <a href="mailto:contact@mrmode.ma" className="flex items-center gap-3 text-gray-400 hover:text-[#D4AF37] transition-colors">
                                <Mail size={18} />
                                <span>contact@mrmode.ma</span>
                            </a>
                            <div className="flex items-start gap-3 text-gray-400">
                                <MapPin size={18} className="mt-1 flex-shrink-0" />
                                <span className="text-sm">{STORE_ADDRESS}</span>
                            </div>
                            <div className="flex items-start gap-3 text-gray-400">
                                <Clock size={18} className="mt-1 flex-shrink-0" />
                                <div className="text-sm">
                                    <p>السبت - الخميس: 10:00 ص - 11:00 م</p>
                                    <p>الجمعة: بعد صلاة الجمعة (15:00) - 11:00 م</p>
                                </div>
                            </div>
                        </div>

                        {/* السوشيال ميديا */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-3 bg-white/5 rounded-xl text-white transition-colors ${social.color}`}
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* روابط */}
                    {Object.entries(footerLinks).map(([key, section]) => (
                        <div key={key}>
                            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* خريطة Google - الحي الحسني */}
                <div className="mt-12 rounded-2xl overflow-hidden border border-white/10">
                    <div className="aspect-[21/9] md:aspect-[21/7] bg-[#111] relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26595.96453307768!2d-7.6569799!3d33.5349822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda62d624a1e79a1%3A0x3cd27a42e47a9b78!2sHay%20Hassani%2C%20Casablanca!5e0!3m2!1sfr!2sma!4v1706000000000!5m2!1sfr!2sma"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                        />
                        <div className="absolute bottom-4 right-4 bg-black/90 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10">
                            <p className="text-[#D4AF37] font-bold text-sm mb-1">📍 Mr. Mode</p>
                            <p className="text-white text-xs">الحي الحسني - الدار البيضاء</p>
                        </div>
                        <div className="absolute top-4 right-4">
                            <a
                                href="https://maps.google.com/?q=Hay+Hassani+Casablanca+Morocco"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-[#D4AF37] text-black font-bold text-sm rounded-lg hover:bg-[#F4D03F] transition-colors"
                            >
                                افتح في خرائط Google
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* الحقوق */}
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} Mr. Mode. جميع الحقوق محفوظة - الدار البيضاء، المغرب 🇲🇦
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">
                                سياسة الخصوصية
                            </Link>
                            <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">
                                الشروط والأحكام
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
