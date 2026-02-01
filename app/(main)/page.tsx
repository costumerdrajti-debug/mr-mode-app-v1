// ============================================
// 📁 app/page.tsx - مع Sanity Integration
// ============================================

import { Suspense } from 'react';
import Image from 'next/image';
import translations from '@/app/i18n';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/sanity/queries'; // ← استيراد من Sanity

// Skeleton & EmptyState components (نفس الشي)
function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="space-y-4 animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-xl" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-32 text-center">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
        <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <h3 className="mb-3 text-2xl font-bold text-gray-900">لا توجد منتجات</h3>
      <p className="text-gray-600">جرب فئة أخرى أو عد لاحقاً</p>
    </div>
  );
}

// ============================================
// 🏠 HOMEPAGE - مع Sanity Data
// ============================================
export default async function HomePage({
  searchParams
}: {
  searchParams?: { category?: string }
}) {
  const lang = 'ar';
  const t = translations[lang];

  // ✅ جلب المنتجات من Sanity
  const products = await getProducts({
    category: searchParams?.category,
    limit: 8
  });

  return (
    <main className="min-h-screen bg-white">
      {/* ============================================
          🎨 HERO SECTION
      ============================================ */}
      <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1920&q=90"
            alt="MR. MODE Collection 2026"
            fill
            className="object-cover object-center scale-105"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
            <p className="text-xs font-black tracking-[0.3em] uppercase text-orange-400">
              تجربة فاخرة
            </p>
          </div>

          <h1 className="max-w-3xl text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-white">
            <span className="inline-block">MR. MODE</span>
            <br />
            <span className="inline-block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              SHOP
            </span>
            <span className="text-white/80">.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg md:text-xl text-gray-200 font-light leading-relaxed">
            ارتقِ بأناقتك مع مجموعتنا الحصرية من الأزياء الرجالية الفاخرة
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#products"
              className="group relative overflow-hidden bg-orange-600 px-8 py-4 font-bold uppercase tracking-wider text-white transition-all hover:bg-orange-700 active:scale-95 shadow-2xl shadow-orange-600/50 rounded-xl"
            >
              <span className="relative z-10">تسوق الآن</span>
              <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0" />
            </a>

            <a
              href="#new-arrivals"
              className="group border-2 border-white/30 bg-white/10 px-8 py-4 font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white/20 rounded-xl"
            >
              المجموعة الجديدة
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">←</span>
            </a>
          </div>

          <div className="mt-16 flex flex-wrap gap-8 text-white/80">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white">500+</span>
              <span className="text-xs uppercase tracking-wider">منتجات</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white">10K+</span>
              <span className="text-xs uppercase tracking-wider">عملاء</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white">4.9★</span>
              <span className="text-xs uppercase tracking-wider">التقييم</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
            <span className="text-xs uppercase tracking-widest">تصفح</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ============================================
          🏷️ CATEGORY FILTER BAR
      ============================================ */}
      <nav className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            <a
              href="/"
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${!searchParams?.category
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              الكل
            </a>
            <a
              href="/?category=shirts"
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${searchParams?.category === 'shirts'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              👕 قمصان عصرية
            </a>
            <a
              href="/?category=jeans"
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${searchParams?.category === 'jeans'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              👖 جينز وسراويل
            </a>
            <a
              href="/?category=t-shirts"
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${searchParams?.category === 't-shirts'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              👕 تي شرت
            </a>
            <a
              href="/?category=jackets"
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${searchParams?.category === 'jackets'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              🧥 جاكيت ومعاطف
            </a>
            <a
              href="/?category=hoodies"
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${searchParams?.category === 'hoodies'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              🧥 هوديز
            </a>
            <a
              href="/?category=shoes"
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${searchParams?.category === 'shoes'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              👟 أحذية رياضية
            </a>
            <a
              href="/?category=accessories"
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${searchParams?.category === 'accessories'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              ⌚ إكسسوارات
            </a>
            <a
              href="/?category=sale"
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${searchParams?.category === 'sale'
                ? 'bg-red-600 text-white'
                : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}
            >
              🏷️ تخفيضات كبرى
            </a>
          </div>
        </div>
      </nav>

      {/* ============================================
          🛍️ PRODUCTS SECTION
      ============================================ */}
      <section id="products" className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-orange-600">
            مميز
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight">
            {searchParams?.category
              ? getCategoryTitle(searchParams.category)
              : 'أفضل الاختيارات'}
          </h2>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-600" />
          <p className="mt-4 max-w-2xl text-gray-600">
            اكتشف مجموعتنا المختارة بعناية من الأزياء الرجالية الفاخرة
          </p>
        </div>

        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {products.map((product: any) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.title}
                  price={product.discountPrice || product.price}
                  oldPrice={product.discountPrice ? product.price : undefined}
                  image={product.image || '/placeholder.jpg'}
                  gallery={product.images || []}
                  badge={product.isNew ? 'جديد' : undefined}
                  stock={product.inStock ? 10 : 0}
                  lang={lang}
                  t={t}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </Suspense>

        <div className="mt-16 text-center">
          <a
            href="/shop"
            className="group inline-flex items-center gap-2 border-2 border-black px-8 py-4 font-bold uppercase tracking-wider transition-all hover:bg-black hover:text-white rounded-xl"
          >
            عرض جميع المنتجات
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* ============================================
          ✨ USP SECTION
      ============================================ */}
      <section className="border-y bg-black py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">ضمان الجودة</h3>
              <p className="text-sm text-gray-400">منتجات أصلية 100%</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">توصيل سريع</h3>
              <p className="text-sm text-gray-400">نفس اليوم في المدن الكبرى</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">دفع آمن</h3>
              <p className="text-sm text-gray-400">الدفع عند الاستلام متاح</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ============================================
// 🏷️ HELPER: Get Category Title
// ============================================
function getCategoryTitle(category: string): string {
  const titles: Record<string, string> = {
    'shirts': '👕 قمصان عصرية',
    'jeans': '👖 جينز وسراويل',
    't-shirts': '👕 تي شرت',
    'jackets': '🧥 جاكيت ومعاطف',
    'hoodies': '🧥 هوديز',
    'shoes': '👟 أحذية رياضية',
    'accessories': '⌚ إكسسوارات',
    'sale': '🏷️ تخفيضات كبرى',
  };
  return titles[category] || 'المنتجات';
}
