'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Crown, Facebook, Instagram, MessageCircle, Music2, Phone } from 'lucide-react';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

interface LandingLayoutProps {
    children: React.ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
    const navLinks = useMemo(() => [
        { label: "الرئيسية", href: "#" },
        { label: "التشكيلة", href: "#products" },
        { label: "من نحن", href: "#about" },
    ], []);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden" dir="rtl">
            {/* Ambient Background Effects */}
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
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={i}
                            href={link.href}
                            className="relative text-gray-300 hover:text-white transition-colors duration-300 group"
                            whileHover={{ y: -2 }}
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#F4E4BA] group-hover:w-full transition-all duration-300" />
                        </motion.a>
                    ))}
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#B8962E] text-black px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-lg shadow-[#D4AF37]/20 min-h-[44px] flex items-center"
                >
                    تواصل معنا
                </motion.button>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative py-12 sm:py-16 md:py-24 lg:py-36 text-center px-4 sm:px-6">
                <motion.div
                    initial="hidden"
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
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(212, 175, 55, 0.4)" }}
                            whileTap={{ scale: 0.97 }}
                            className="bg-gradient-to-r from-[#D4AF37] via-[#E5C558] to-[#D4AF37] text-black px-8 sm:px-12 py-4 rounded-full font-bold text-base sm:text-lg shadow-2xl shadow-[#D4AF37]/30 transition-all duration-300 min-h-[52px] active:scale-95"
                        >
                            تسوق الآن
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.97 }}
                            className="border border-white/20 text-white px-8 sm:px-12 py-4 rounded-full font-bold text-base sm:text-lg backdrop-blur-sm transition-all duration-300 min-h-[52px] active:scale-95"
                        >
                            شاهد الكتالوج
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-10 w-20 h-20 border border-[#D4AF37]/20 rounded-full animate-pulse hidden lg:block" />
                <div className="absolute bottom-20 right-10 w-32 h-32 border border-[#D4AF37]/10 rounded-full hidden lg:block" />
            </section>

            {/* Products Section - Children will be inserted here */}
            {children}

            {/* Features Section */}
            <section className="py-12 sm:py-16 md:py-20 lg:py-28 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                    >
                        {[
                            { icon: "🚚", title: "توصيل سريع", desc: "توصيل مجاني لجميع أنحاء المغرب" },
                            { icon: "💎", title: "جودة عالية", desc: "منتجات أصلية 100% بضمان الجودة" },
                            { icon: "🔄", title: "إرجاع سهل", desc: "إمكانية الإرجاع خلال 5 أيام" },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="text-center p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm active:border-[#D4AF37]/20 sm:hover:border-[#D4AF37]/20 transition-colors duration-300"
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

                    {/* Brand & Logo */}
                    <div className="text-center md:text-right">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                            <Crown className="w-6 h-6 sm:w-7 sm:h-7 text-[#D4AF37]" />
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#D4AF37]">MR. MODE</h2>
                        </div>
                        <p className="text-gray-500 text-sm sm:text-base max-w-xs mx-auto md:mx-0">الأناقة في أبهى صورها. تابعونا على جميع المنصات ليصلكم كل جديد.</p>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex flex-col items-center gap-4">
                        <h3 className="text-white font-bold text-xs sm:text-sm uppercase tracking-widest">تواصل معنا</h3>
                        <div className="flex gap-3 sm:gap-4">
                            <motion.a
                                href="https://www.facebook.com/share/17pXYfQeTG/?mibextid=wwXIfr"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/5 p-3 sm:p-3.5 rounded-full hover:bg-[#1877F2] active:bg-[#1877F2] transition-all duration-300 group min-w-[48px] min-h-[48px] flex items-center justify-center"
                            >
                                <Facebook className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                            </motion.a>
                            <motion.a
                                href="https://www.instagram.com/mr.mode.num1?igsh=eWc4b25rZnRvbnU2"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/5 p-3 sm:p-3.5 rounded-full hover:bg-[#E4405F] active:bg-[#E4405F] transition-all duration-300 group min-w-[48px] min-h-[48px] flex items-center justify-center"
                            >
                                <Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                            </motion.a>
                            <motion.a
                                href="https://www.tiktok.com/@mrmodenum1?_r=1&_t=ZS-93TteOxbsLS"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/5 p-3 sm:p-3.5 rounded-full hover:bg-black hover:border hover:border-white/30 active:bg-black transition-all duration-300 group min-w-[48px] min-h-[48px] flex items-center justify-center"
                            >
                                <Music2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                            </motion.a>
                            <motion.a
                                href="https://wa.me/212653421432"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/5 p-3 sm:p-3.5 rounded-full hover:bg-[#25D366] active:bg-[#25D366] transition-all duration-300 group min-w-[48px] min-h-[48px] flex items-center justify-center"
                            >
                                <MessageCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-2">
                        <span className="text-gray-500 text-xs text-center md:text-right">اتصل بنا مباشرة</span>
                        <a
                            href="tel:+212653421432"
                            className="group flex items-center gap-3 bg-[#D4AF37]/5 px-5 sm:px-6 py-3 rounded-2xl border border-[#D4AF37]/10 hover:border-[#D4AF37] active:border-[#D4AF37] transition-all min-h-[52px]"
                            dir="ltr"
                        >
                            <div className="bg-[#D4AF37] p-2 rounded-lg text-black group-hover:rotate-12 transition-transform">
                                <Phone className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                            </div>
                            <span className="text-lg sm:text-xl font-bold tracking-wider text-white">
                                06 53 42 14 32
                            </span>
                        </a>
                    </div>

                </div>

                <div className="text-center text-gray-600 text-[10px] sm:text-xs mt-10 sm:mt-12 border-t border-white/5 pt-6 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                    © 2026 Mr. Mode - The Luxury Experience
                </div>
            </footer>
        </div>
    );
}
