// ============================================
// 📁 app/page.tsx - مع Sanity Integration
// ============================================

import { Suspense } from 'react';
import Image from 'next/image';
import translations from '@/app/i18n';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/sanity/queries'; // ← استيراد من Sanity

const CATEGORY_FILTERS = [
  {
    key: 'formal',
    label: 'بدلات رسمية / قمصان كلاسيك',
    icon: '🤵',
    slugs: ['formal', 'suits', 'formal-wear', 'shirts'],
  },
  {
    key: 'sports',
    label: 'ألبسة رياضية (ران تيشرت، شورت، سنيكرز رَن)',
    icon: '🏃‍♂️',
    slugs: ['sports-run', 'sports', 'running', 't-shirts', 'shorts', 'sneakers'],
  },
  {
    key: 'casual',
    label: 'كاجوال يومي (بولوز، جينز، سنيكرز لايفستايل)',
    icon: '🧢',
    slugs: ['casual', 'polo', 'jeans', 'lifestyle', 'pants'],
  },
  {
    key: 'outerwear',
    label: 'جاكيت/هوديز شتوية',
    icon: '🧥',
    slugs: ['outerwear', 'jackets', 'hoodies', 'coats'],
  },
  {
    key: 'accessories',
    label: 'إكسسوارات (قبعات، أحزمة، ساعات)',
    icon: '⌚',
    slugs: ['accessories', 'caps', 'belts', 'watches'],
  },
  {
    key: 'sale',
    label: 'تخفيضات كبرى',
    icon: '🏷️',
    slugs: ['sale'],
  },
];

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
  searchParams?: Promise<{ category?: string }>
}) {
  const lang = 'ar';
  const t = translations[lang];

  // ✅ Await searchParams (Next.js 16 requirement)
  const params = await searchParams;
  const activeCategory = params?.category;
  const resolvedCategorySlugs = activeCategory ? getCategorySlugs(activeCategory) : undefined;

  // ✅ جلب المنتجات من Sanity
  const products = await getProducts({
    category: resolvedCategorySlugs,
    limit: 16
  });

  // 🆕 أحدث الإضافات لعرضها في سلايدر New Arrivals
  const newArrivals = await getProducts({ limit: 8 });

  // موديلات متنوعة لعرض تنوع الأشكال
  const modelGrid = [
    {
      title: 'Street Layered',
      image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=1200&q=90&auto=format&fit=crop',
      tag: 'Layered / Street',
    },
    {
      title: 'Minimal Tech',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&q=90&auto=format&fit=crop&sat=-10',
      tag: 'Tech / Light',
    },
    {
      title: 'Urban Sport',
      image: 'https://images.unsplash.com/photo-1508571828342-2d6bc4fa9d6c?w=1200&q=90&auto=format&fit=crop',
      tag: 'Sport / Urban',
    },
    {
      title: 'Classic Black',
      image: 'https://images.unsplash.com/photo-1502764613149-7f1d229e2300?w=1200&q=90&auto=format&fit=crop&sat=-15',
      tag: 'Classic / Night',
    },
    {
      title: 'Elevated Casual',
      image: 'https://images.unsplash.com/photo-1472417583565-62e7bdeda490?w=1200&q=90&auto=format&fit=crop&sat=-10',
      tag: 'Casual / Day',
    },
    {
      title: 'Warm Layers',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=90&auto=format&fit=crop&sat=-5',
      tag: 'Layered / Cozy',
    },
    {
      title: 'Earthy Tones',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&q=90&auto=format&fit=crop&sat=-12',
      tag: 'Tone / Day',
    },
    {
      title: 'Night Runner',
      image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1200&q=90&auto=format&fit=crop&sat=-25',
      tag: 'Sport / Night',
    },
  ];

  const modelSlider = [
    {
      title: 'Monochrome Fit',
      image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=1400&q=90&auto=format&fit=crop&sat=-25',
      tag: 'Mono',
    },
    {
      title: 'Runner Set',
      image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1400&q=90&auto=format&fit=crop',
      tag: 'Sport',
    },
    {
      title: 'City Layers',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&q=90&auto=format&fit=crop&sat=-15',
      tag: 'Layered',
    },
    {
      title: 'Contrast Cut',
      image: 'https://images.unsplash.com/photo-1516822003754-cca485356ecb?w=1400&q=90&auto=format&fit=crop&sat=-10',
      tag: 'Contrast',
    },
    {
      title: 'Retro Sport',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1400&q=90&auto=format&fit=crop&sat=-8',
      tag: 'Retro',
    },
    {
      title: 'Urban Night',
      image: 'https://images.unsplash.com/photo-1508571828342-2d6bc4fa9d6c?w=1400&q=90&auto=format&fit=crop&sat=-30',
      tag: 'Night',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* ============================================
          🎨 HERO SECTION
      ============================================ */}
      <section className="relative h-[90vh] min-h-[680px] w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=1920&q=90&auto=format&fit=crop"
            alt="MR. MODE Edition 2026"
            fill
            className="object-cover object-center scale-110"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(34,197,94,0.2),transparent_36%),radial-gradient(circle_at_82%_18%,rgba(6,182,212,0.18),transparent_42%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.18),transparent_32%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-50" style={{
            backgroundImage: 'radial-gradient(ellipse at 50% 30%, rgba(16,185,129,0.12), rgba(6,182,212,0.05), transparent 60%)'
          }} />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
          <div className="mb-6 inline-flex w-fit items-center gap-3 rounded-full border border-emerald-300/40 bg-white/5 px-5 py-2 backdrop-blur-md shadow-[0_0_40px_-18px_rgba(34,197,94,0.9)]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,211,153,0.6)]" />
            <p className="text-xs font-black tracking-[0.35em] uppercase text-emerald-300">
              mr-mode-shop 5d line
            </p>
          </div>

          <div className="max-w-4xl space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.88] drop-shadow-[0_8px_32px_rgba(6,182,212,0.25)]">
              <span className="block text-white">MR-MODE-SHOP</span>
              <span className="block bg-gradient-to-r from-emerald-300 via-cyan-200 to-emerald-400 bg-clip-text text-transparent">
                SPORT / CLASSY / 5D
              </span>
              <span className="mt-3 block text-slate-100 text-2xl md:text-3xl font-semibold">
                طبقات ضوء، عمق، وخامات فخمة لإطلالة رياضية رجالية 100%
              </span>
            </h1>

            <p className="max-w-3xl text-lg md:text-xl text-slate-200/85 font-light leading-relaxed">
              هيرو متدرج بنيو-نيون، بطاقات فئات مضيئة، سلايدر New Arrivals، وموديلات غير متماثلة — كله بطابع رجالي جاهز للإطلاق.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#products"
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 px-8 py-4 font-bold uppercase tracking-wider text-slate-900 transition-all hover:from-emerald-300 hover:to-cyan-300 active:scale-95 shadow-[0_20px_60px_-15px_rgba(34,197,94,0.65)] rounded-xl"
            >
              <span className="relative z-10">تسوق الآن</span>
              <div className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-300 group-hover:translate-x-0" />
            </a>

            <a
              href="#new-arrivals"
              className="group border-2 border-white/15 bg-white/5 px-8 py-4 font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:border-emerald-300 hover:text-emerald-200 rounded-xl"
            >
              المجموعة الجديدة
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">←</span>
            </a>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
            {[
              { label: 'منتجات', value: '500+' },
              { label: 'عملاء', value: '10K+' },
              { label: 'التقييم', value: '4.9★' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-md shadow-[0_20px_60px_-30px_rgba(15,23,42,0.9)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-cyan-400/10" />
                <div className="relative">
                  <div className="text-3xl font-black text-white drop-shadow-sm">{item.value}</div>
                  <div className="text-xs uppercase tracking-[0.25em] text-slate-300">{item.label}</div>
                </div>
              </div>
            ))}
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
          🆕 NEW ARRIVALS SLIDER
      ============================================ */}
      <section id="new-arrivals" className="mx-auto max-w-7xl px-6 py-14 md:py-18">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 text-white">
          <div className="space-y-2">
            <span className="text-sm font-black uppercase tracking-[0.35em] text-emerald-300">جديد</span>
            <h2 className="text-3xl font-black tracking-tight">وصلات جديدة</h2>
            <p className="text-slate-300 max-w-2xl">منتجات مختارة توّاً، جاهزة للشحن.</p>
          </div>
          <a href="#products" className="text-sm font-semibold text-emerald-200 hover:text-emerald-100 transition">شاهد الكل ←</a>
        </div>

        {newArrivals.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {newArrivals.map((item: any) => (
              <div
                key={item._id}
                className="min-w-[240px] sm:min-w-[260px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-[0_30px_80px_-35px_rgba(6,182,212,0.65)]"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={item.image || '/placeholder.jpg'}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-200">New</p>
                    <span className="text-xs text-white/70">{item.category?.title || 'MR-Mode'}</span>
                  </div>
                  <h3 className="text-base font-bold text-white line-clamp-2">{item.title}</h3>
                  <div className="flex items-center gap-2 text-emerald-200 font-semibold">
                    <span>{item.discountPrice || item.price} MAD</span>
                    {item.discountPrice && (
                      <span className="text-sm text-white/60 line-through">{item.price} MAD</span>
                    )}
                  </div>
                  <a
                    href={`/${lang}/products/${item.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-emerald-200 hover:text-emerald-100 transition"
                  >
                    عرض التفاصيل
                    <span className="inline-block transition-transform group-hover:translate-x-1">↗</span>
                  </a>
                </div>
                <div className="h-[2px] w-full bg-gradient-to-r from-emerald-300/60 via-cyan-300/60 to-emerald-300/60" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 animate-pulse">
                <div className="aspect-[4/5] bg-white/10 rounded-xl" />
                <div className="mt-4 h-3 w-2/3 bg-white/10 rounded" />
                <div className="mt-2 h-3 w-1/3 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ============================================
          🗂️ CATEGORY SPOTLIGHT
      ============================================ */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 text-white">
          <div className="space-y-2">
            <span className="text-sm font-black uppercase tracking-[0.35em] text-emerald-300">الفئات</span>
            <h2 className="text-3xl font-black tracking-tight">اكتشف تشكيلتنا حسب الفئة</h2>
            <p className="text-slate-300 max-w-2xl">بدلات رسمية، سبور ران، كاجوال يومي، جاكيت/هوديز، وإكسسوارات مختارة.</p>
          </div>
          <a href="#products" className="text-sm font-semibold text-emerald-200 hover:text-emerald-100 transition">تسوق الكل ←</a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_FILTERS.filter((f) => f.key !== 'sale').map((cat) => (
            <a
              key={cat.key}
              href={`/?category=${cat.key}`}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/60 to-slate-800/60 p-6 shadow-[0_30px_80px_-40px_rgba(6,182,212,0.7)] group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.2),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.18),transparent_45%)]" />
              <div className="flex items-start justify-between gap-3 relative">
                <div>
                  <p className="text-sm text-emerald-200">{cat.icon} {cat.label}</p>
                  <h3 className="mt-1 text-xl font-bold text-white">تسوق الآن</h3>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-emerald-200 border border-emerald-300/30 group-hover:border-emerald-300/60">GO</span>
              </div>
              <div className="mt-4 h-[2px] w-16 bg-gradient-to-r from-emerald-300 to-cyan-300" />
              <div className="absolute -inset-px rounded-2xl border border-white/5 group-hover:border-emerald-200/40 transition-colors" />
            </a>
          ))}
        </div>
      </section>

      {/* ============================================
          🏷️ CATEGORY FILTER BAR
      ============================================ */}
      <nav className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            <a
              href="/"
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${!activeCategory
                ? 'bg-emerald-400 text-slate-900 border-emerald-400 shadow-[0_10px_40px_-20px_rgba(16,185,129,0.8)]'
                : 'bg-white/5 text-white border-white/10 hover:border-emerald-300/50 hover:text-emerald-200'
                }`}
            >
              الكل
            </a>
            {CATEGORY_FILTERS.map((filter) => (
              <a
                key={filter.key}
                href={`/?category=${filter.key}`}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${activeCategory === filter.key
                  ? 'bg-emerald-400 text-slate-900 border-emerald-400 shadow-[0_10px_40px_-20px_rgba(16,185,129,0.8)]'
                  : 'bg-white/5 text-white border-white/10 hover:border-emerald-300/50 hover:text-emerald-200'
                  }`}
              >
                {`${filter.icon} ${filter.label}`}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ============================================
          🎯 MODELS SHOWCASE
      ============================================ */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 text-white">
          <div className="space-y-3">
            <span className="text-sm font-black uppercase tracking-[0.35em] text-emerald-300">موديلات</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">أشكال متعددة وتنسيقات مختلفة</h2>
            <p className="text-slate-300 max-w-2xl">شبكة موديلات متنوعة بأحجام مختلفة + سلايدر أفقي يبرز أحدث الإطلالات المستوحاة من العلامات الرياضية.</p>
          </div>
          <a href="#products" className="text-sm font-semibold text-emerald-200 hover:text-emerald-100 transition">تصفح المنتجات ←</a>
        </div>

        {/* Grid مختلفة الأشكال */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {modelGrid.map((item, idx) => (
            <div
              key={item.title + idx}
              className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_30px_80px_-35px_rgba(6,182,212,0.65)] ${idx % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[16/10]'}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-200 uppercase tracking-[0.2em]">{item.tag}</p>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-emerald-200 border border-white/10">NEW</span>
              </div>
              <div className="absolute -inset-px rounded-2xl border border-emerald-300/20" />
            </div>
          ))}
        </div>

        {/* سلايدر أفقي */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center justify-between text-white">
            <h3 className="text-xl font-bold">سلايدر موديلات</h3>
            <span className="text-sm text-slate-300">سحب أفقياً</span>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {modelSlider.map((item, idx) => (
              <div
                key={item.title + idx}
                className="relative min-w-[260px] sm:min-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_20px_60px_-30px_rgba(15,23,42,0.8)]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-emerald-200 uppercase tracking-[0.2em]">{item.tag}</p>
                    <h4 className="text-lg font-bold text-white">{item.title}</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-emerald-200 border border-white/10">NEW</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          🛍️ PRODUCTS SECTION
      ============================================ */}
      <section id="products" className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-emerald-300">
            lineup
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            {activeCategory
              ? getCategoryTitle(activeCategory)
              : 'أفضل الاختيارات'}
          </h2>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-emerald-300 to-cyan-300" />
          <p className="mt-4 max-w-2xl text-slate-300">
            اكتشف تشكيلات مستوحاة من ثقافة الشارع والرياضة بأداء عالي وتشطيب فخم.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 sm:p-6 shadow-[0_30px_90px_-40px_rgba(6,182,212,0.6)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.08),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(6,182,212,0.08),transparent_38%)]" />
          <div className="absolute -inset-px rounded-3xl border border-emerald-300/15" />
          <Suspense fallback={<ProductGridSkeleton count={12} />}>
            {products.length > 0 ? (
              <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
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
        </div>

        <div className="mt-16 text-center">
          <a
            href="/shop"
            className="group inline-flex items-center gap-2 border-2 border-white/15 px-8 py-4 font-bold uppercase tracking-wider transition-all hover:bg-white hover:text-slate-900 rounded-xl"
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
      <section className="border-t border-white/10 bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              title: 'ضمان الجودة',
              desc: 'خامات أصلية 100% وتشطيب احترافي',
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )
            }, {
              title: 'توصيل سريع',
              desc: '24-48 ساعة في أغلب المدن',
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )
            }, {
              title: 'دفع آمن',
              desc: 'الدفع عند الاستلام مع تغليف محكم',
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              )
            }].map((item) => (
              <div key={item.title} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-8 py-10 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.9)]">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-cyan-400/5" />
                <div className="relative flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-200 border border-emerald-300/30">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
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
  const match = CATEGORY_FILTERS.find((item) => item.key === category);
  return match ? `${match.icon} ${match.label}` : 'المنتجات';
}

function getCategorySlugs(category: string): string[] {
  const match = CATEGORY_FILTERS.find((item) => item.key === category);
  return match?.slugs ?? [category];
}
