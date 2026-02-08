// ============================================
// 📁 components/Footer.tsx - Luxury Edition
// ============================================

import { Facebook, Instagram, MessageCircle, Music2, Crown } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-white" dir="rtl">
            <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400" />

            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                    <div className="space-y-4 text-right">
                        <div className="flex items-center gap-3 justify-end">
                            <div className="relative">
                                <Crown className="text-emerald-300" size={26} strokeWidth={1.5} />
                                <div className="absolute inset-0 blur-lg bg-emerald-300/30" />
                            </div>
                            <h3 className="text-2xl font-black tracking-tight">MR. MODE</h3>
                        </div>
                        <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
                            خط مستوحى من العلامات الرياضية العالمية: خامات عالية، خطوط نظيفة، وألوان جريئة.
                        </p>
                    </div>

                    <div className="space-y-3 text-right">
                        <h4 className="text-sm uppercase tracking-[0.35em] text-emerald-300">روابط</h4>
                        <div className="flex flex-wrap gap-3 text-slate-300 text-sm">
                            <a href="/ar" className="hover:text-emerald-200 transition">الرئيسية</a>
                            <a href="/ar/contact" className="hover:text-emerald-200 transition">تواصل</a>
                            <a href="/ar/faq" className="hover:text-emerald-200 transition">FAQ</a>
                            <a href="/ar/returns" className="hover:text-emerald-200 transition">الإرجاع</a>
                            <a href="/ar/track-order" className="hover:text-emerald-200 transition">تتبع الطلب</a>
                        </div>
                    </div>

                    <div className="space-y-3 text-right">
                        <h4 className="text-sm uppercase tracking-[0.35em] text-emerald-300">تابعونا</h4>
                        <div className="flex justify-end gap-3">
                            <SocialLink href="https://www.facebook.com/share/17pXYfQeTG/?mibextid=wwXIfr" icon={<Facebook size={18} />} label="Facebook" />
                            <SocialLink href="https://www.instagram.com/mr.mode.num1?igsh=eWc4b25rZnRvbnU2" icon={<Instagram size={18} />} label="Instagram" />
                            <SocialLink href="https://www.tiktok.com/@mrmodenum1?_r=1&_t=ZS-93TteOxbsLS" icon={<Music2 size={18} />} label="TikTok" />
                            <SocialLink href="https://wa.me/212653421432" icon={<MessageCircle size={18} />} label="WhatsApp" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/5 py-6">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400 uppercase tracking-[0.25em] text-center">
                    <span>©️ {currentYear} MR. MODE</span>
                    <div className="flex items-center gap-3">
                        <a href="/ar/about" className="hover:text-emerald-200 transition">من نحن</a>
                        <span>•</span>
                        <a href="/ar/returns" className="hover:text-emerald-200 transition">سياسة الإرجاع</a>
                        <span>•</span>
                        <a href="/ar/faq" className="hover:text-emerald-200 transition">الأسئلة الشائعة</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// ============================================
// 🔗 SOCIAL LINK COMPONENT
// ============================================
function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-10 h-10 border border-white/15 flex items-center justify-center hover:border-emerald-300 hover:bg-emerald-300/10 transition-all duration-300 rounded-lg"
            aria-label={label}
        >
            <span className="text-slate-300 group-hover:text-emerald-200 transition-colors">
                {icon}
            </span>
        </a>
    );
}