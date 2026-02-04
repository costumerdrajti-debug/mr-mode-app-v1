'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
    Sparkles,
    Crown,
    Facebook,
    Instagram,
    MessageCircle,
    Music2,
    Phone,
} from 'lucide-react';

// ======================
// Theme & Constants
// ======================
const COLORS = {
    GOLD: '#D4AF37',
    GOLD_LIGHT: '#F4E4BA',
    GOLD_DARK: '#B8962E',
};

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

// ======================
// Reusable Components
// ======================

const AnimatedButton = ({
    children,
    variant = 'primary',
    ...props
}: {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    [key: string]: any;
}) => {
    const shouldReduceMotion = useReducedMotion(); const baseClasses =
        'px-8 sm:px-12 py-4 rounded-full font-bold text-base sm:text-lg min-h-[52px] active:scale-95 transition-all duration-300 flex items-center justify-center';

    const variants = {
        primary:
            'bg-gradient-to-r from-[#D4AF37] via-[#E5C558] to-[#D4AF37] text-black shadow-2xl shadow-[#D4AF37]/30',
        secondary:
            'border border-white/20 text-white backdrop-blur-sm bg-white/5 hover:bg-white/10',
    };

    return (
        <motion.button
            whileHover={
                shouldReduceMotion
                    ? {}
                    : variant === 'primary'
                        ? { scale: 1.05, boxShadow: '0 20px 40px -10px rgba(212, 175, 55, 0.4)' }
                        : { scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }
            }
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            className={`${baseClasses} ${variants[variant]}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

const SocialLink = ({
    href,
    icon: Icon,
    label,
    color,
}: {
    href: string;
    icon: React.ElementType;
    label: string;
    color: string;
}) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        whileTap={{ scale: 0.95 }}
        className={`bg-white/5 p-3 sm:p-3.5 rounded-full hover:bg-[${color}] active:bg-[${color}] transition-all duration-300 group min-w-[48px] min-h-[48px] flex items-center justify-center`}
    >
        <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
    </motion.a>
);
// ======================
// Main Layout
// ======================

interface LandingLayoutProps {
    children: React.ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
    const navLinks = useMemo(
        () => [
            { label: 'الرئيسية', href: '/' },
            { label: 'التشكيلة', href: '/#products' },
            { label: 'من نحن', href: '/#about' },
        ],
        []
    );

    const features = useMemo(
        () => [
            { icon: '🚚', title: 'توصيل سريع', desc: 'توصيل مجاني لجميع أنحاء المغرب' },
            { icon: '💎', title: 'جودة عالية', desc: 'منتجات أصلية 100% بضمان الجودة' },
            { icon: '🔄', title: 'إرجاع سهل', desc: 'إمكانية الإرجاع خلال 5 أيام' },
        ],
        []
    );

    const socials = useMemo(
        () => [
            {
                href: 'https://www.facebook.com/share/17pXYfQeTG/?mibextid=wwXIfr',
                icon: Facebook,
                label: 'فيسبوك',
                color: '#1877F2',
            },
            {
                href: 'https://www.instagram.com/mr.mode.num1?igsh=eWc4b25rZnRvbnU2',
                icon: Instagram,
                label: 'إنستغرام',
                color: '#E4405F',
            },
            {
                href: 'https://www.tiktok.com/@mrmodenum1?_r=1&_t=ZS-93TteOxbsLS',
                icon: Music2,
                label: 'تيك توك',
                color: '#000000',
            },
            {
                href: 'https://wa.me/212653421432', icon: MessageCircle,
                label: 'واتساب',
                color: '#25D366',
            },
        ],
        []
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden" dir="rtl">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#D4AF37]/3 rounded-full blur-[100px]" />
            </div>

            {/* Header */}
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="sticky top-0 z-50 px-4 sm:px-6 lg:px-12 py-4 sm:py-5 flex justify-between items-center border-b border-white/5 backdrop-blur-xl bg-black/40"
            >
                <div className="flex items-center gap-2 sm:gap-3">
                    <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37]" />
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                        <span className="text-[#D4AF37]">MR.</span> MODE
                    </h1>
                </div>

                <div className="hidden md:flex gap-8 text-sm font-medium">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.href}
                            href={link.href}
                            className="relative text-gray-300 hover:text-white transition-colors duration-300 group"
                            whileHover={{ y: -2 }}
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#F4E4BA] group-hover:w-full transition-all duration-300" />
                        </motion.a>
                    ))}
                </div>

                <AnimatedButton variant="primary">تواصل معنا</AnimatedButton>
            </motion.nav>

            {/* Hero */}
            <section className="relative py-12 sm:py-16 md:py-24 lg:py-36 text-center px-4 sm:px-6">
                <motion.div initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="max-w-4xl mx-auto"
                >
                    <motion.div
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 sm:px-5 py-2 mb-6 sm:mb-8 backdrop-blur-sm"
                    >
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
                        <span className="text-xs sm:text-sm text-gray-300">تشكيلة 2026 الحصرية</span>
                    </motion.div>

                    <motion.h2
                        variants={fadeInUp}
                        className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-5 sm:mb-8"
                    >
                        أناقة تتحدث{' '}
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4E4BA] to-[#D4AF37] bg-clip-text text-transparent">
                                عنك
                            </span>
                            <motion.span
                                className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            />
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={fadeInUp}
                        className="text-gray-400 mb-8 sm:mb-12 text-base sm:text-lg lg:text-xl max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-2"
                    >
                        اكتشف أرقى الأزياء الرجالية المصممة بعناية فائقة لتعكس شخصيتك المتميزة
                    </motion.p>

                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2"
                    >
                        <AnimatedButton variant="primary">تسوق الآن</AnimatedButton>
                        <AnimatedButton variant="secondary">شاهد الكتالوج</AnimatedButton>
                    </motion.div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-10 w-20 h-20 border border-[#D4AF37]/20 rounded-full animate-pulse hidden lg:block" />
                <div className="absolute bottom-20 right-10 w-32 h-32 border border-[#D4AF37]/10 rounded-full hidden lg:block" />      </section>

            {/* Children (Products Section) */}
            {children}

            {/* Features */}
            <section className="py-12 sm:py-16 md:py-20 lg:py-28 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                    >
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                className="text-center p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:border-[#D4AF37]/20 transition-colors duration-300"
                            >
                                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                                <h4 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2">{feature.title}</h4>
                                <p className="text-gray-400 text-sm sm:text-base">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0a0a0a] py-10 sm:py-12 px-4 sm:px-6 border-t border-[#D4AF37]/10 mt-10 sm:mt-16">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
                    {/* Brand */}
                    <div className="text-center md:text-right">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                            <Crown className="w-6 h-6 sm:w-7 sm:h-7 text-[#D4AF37]" />
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#D4AF37]">MR. MODE</h2>
                        </div>
                        <p className="text-gray-500 text-sm sm:text-base max-w-xs mx-auto md:mx-0">
                            الأناقة في أبهى صورها. تابعونا على جميع المنصات ليصلكم كل جديد.
                        </p>
                    </div>

                    {/* Social */}
                    <div className="flex flex-col items-center gap-4">
                        <h3 className="text-white font-bold text-xs sm:text-sm uppercase tracking-widest">
                            تواصل معنا
                        </h3>
                        <div className="flex gap-3 sm:gap-4">              {socials.map((social) => (
                            <SocialLink key={social.href} {...social} />
                        ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-2 items-center md:items-end">
                        <span className="text-gray-500 text-xs text-center md:text-right">
                            اتصل بنا مباشرة
                        </span>
                        <a
                            href="tel:+212653421432"
                            aria-label="اتصل بنا على 06 53 42 14 32"
                            className="group flex items-center gap-3 bg-[#D4AF37]/5 px-5 sm:px-6 py-3 rounded-2xl border border-[#D4AF37]/10 hover:border-[#D4AF37] active:border-[#D4AF37] transition-all min-h-[52px]"
                        >
                            <div className="bg-[#D4AF37] p-2 rounded-lg text-black group-hover:rotate-12 transition-transform">
                                <Phone className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                            </div>
                            <span className="text-lg sm:text-xl font-bold tracking-wider text-white" dir="ltr">
                                06 53 42 14 32
                            </span>
                        </a>
                    </div>
                </div>

                <div className="text-center text-gray-600 text-[10px] sm:text-xs mt-10 sm:mt-12 border-t border-white/5 pt-6 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                    ©️ {new Date().getFullYear()} Mr. Mode - The Luxury Experience
                </div>
            </footer>
        </div>
    );
}