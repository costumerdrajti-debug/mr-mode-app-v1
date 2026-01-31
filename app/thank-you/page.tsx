'use client';

import Link from 'next/link';
import { useEffect } from 'react';

// TypeScript declaration for window.fbq
declare global {
    interface Window {
        fbq?: (...args: any[]) => void;
    }
}

export default function ThankYouPage() {
    // هنا كنعلمو فيسبوك بلي كاين "بيعة" تمت بنجاح
    useEffect(() => {
        if (window.fbq) {
            window.fbq('track', 'Purchase', { currency: 'MAD', value: 0 }); // المبيعة تسجلات!
        }
    }, []);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
            {/* أيقونة النجاح بالذهبي */}
            <div className="w-24 h-24 bg-[#D4AF37] rounded-full flex items-center justify-center mb-8 animate-bounce">
                <span className="text-5xl">✅</span>
            </div>

            <h1 className="text-4xl font-black mb-4">شكراً على ثقتك في Mr. Mode!</h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
                لقد توصلنا بطلبك بنجاح. فريقنا سيتواصل معك هاتفياً في أقرب وقت لتأكيد العنوان وإرسال السلعة.
            </p>

            {/* معلومات إضافية للثقة */}
            <div className="bg-[#111] border border-white/10 p-6 rounded-2xl mb-8 w-full max-w-sm">
                <h3 className="text-[#D4AF37] font-bold mb-2 text-right">شنو غايوقع دابا؟</h3>
                <ul className="text-right text-sm text-gray-500 space-y-2">
                    <li>• غانتصلوا بك في أقل من 24 ساعة 📞</li>
                    <li>• التوصيل غاياخد من 24 لـ 48 ساعة 🚚</li>
                    <li>• الخلاص كيكون عند الاستلام (COD) 🤝</li>
                </ul>
            </div>

            <Link
                href="/"
                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-[#D4AF37] transition-all"
            >
                الرجوع للمتجر
            </Link>
        </div>
    );
}
