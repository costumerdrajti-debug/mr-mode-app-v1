import { Suspense } from 'react';
import Image from 'next/image';
import translations from '@/lib/translations'; // المسار الصحيح
import ProductCard from '@/components/product/ProductCard'; // المسار الصحيح

// ============================================
// 🎭 LOADING SKELETON
// ============================================
function ProductGridSkeleton({ count = 4 }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="space-y-4 animate-pulse">
                    <div className="aspect-[3/4] bg-gray-200 rounded-sm" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
            ))}
        </div>
    );
}

// ============================================
// 📦 DUMMY PRODUCTS (تم تعديل imageUrl لـ image)
// ============================================
const products = [
    {
        _id: '1',
        title: 'بدلة رسمية سوداء',
        slug: 'black-formal-suit',
        price: 1200,
        discountPrice: 1500,
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
        featured: true,
    },
    {
        _id: '2',
        title: 'قميص كلاسيكي أبيض',
        slug: 'white-classic-shirt',
        price: 350,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
        featured: false,
    },
    {
        _id: '3',
        title: 'حذاء جلد إيطالي',
        slug: 'italian-leather-shoes',
        price: 800,
        discountPrice: 1000,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
        featured: true,
    },
    {
        _id: '4',
        title: 'ساعة يد فاخرة',
        slug: 'luxury-watch',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        featured: true,
    }
];

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: langParam } = await params;
    const lang = langParam || 'ar';
    const t = translations[lang as keyof typeof translations] || translations.ar;

    return (
        <div className="min-h-screen bg-white">
            {/* 🌙 HERO SECTION (Ramadan Style) */}
            <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-[#050A18]">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1920&q=90"
                        alt="MR. MODE Ramadan"
                        fill
                        className="object-cover opacity-60 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050A18] via-transparent to-transparent" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 backdrop-blur-sm">
                        <span className="text-gold-500 animate-pulse text-xl">🌙</span>
                        <p className="text-xs font-black tracking-[0.3em] uppercase text-[#D4AF37]">
                            {t.specialOffer}
                        </p>
                    </div>

                    <h1 className="max-w-3xl text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white">
                        {t.ramadanTitle} <br />
                        <span className="text-[#D4AF37] italic">KAREEM.</span>
                    </h1>

                    <p className="mt-8 max-w-lg text-lg text-gray-300 font-light">
                        {t.ramadanSubtitle}
                    </p>

                    <div className="mt-12">
                        <a href="#products" className="bg-[#D4AF37] text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-[#B8962E] transition-all shadow-xl shadow-yellow-900/20">
                            {t.shopNow}
                        </a>
                    </div>
                </div>
            </section>

            {/* 🛍️ PRODUCTS SECTION */}
            <section id="products" className="mx-auto max-w-7xl px-6 py-24">
                <div className="mb-16 text-center font-black">
                    <h2 className="text-4xl text-black uppercase tracking-tighter">
                        {t.latestProducts}
                    </h2>
                    <div className="mt-4 h-1 w-20 bg-[#D4AF37] mx-auto" />
                </div>

                <Suspense fallback={<ProductGridSkeleton count={4} />}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                t={t}
                                lang={lang}
                            />
                        ))}
                    </div>
                </Suspense>
            </section>
        </div>
    );
}
