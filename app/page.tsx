
import { Suspense } from 'react';
import { getProducts, getCategories, ProductWithImages } from '@/lib/products';
import ProductCard from '../components/ProductCard';
import type { Metadata } from 'next';
import translations from './i18n';

// ============================================
// 🎯 METADATA FOR SEO
// ============================================
export const metadata: Metadata = {
  title: 'MR. MODE - Elevate Your Style | 2026 Collection',
  description: 'تسوق أحدث صيحات الموضة من MR. MODE. مجموعة 2026 الحصرية متوفرة الآن.',
  openGraph: {
    title: 'MR. MODE - Premium Fashion Store',
    description: 'Elevate Your Style with our exclusive 2026 collection',
    images: ['/og-image.jpg'],
  },
};

// ============================================
// 📊 TYPES
// ============================================
interface HomePageProps {
  searchParams: {
    category?: string;
  };
}

// ============================================
// 🏠 HOMEPAGE COMPONENT
// ============================================
export default async function HomePage({ searchParams }: HomePageProps) {
  // i18n
  // TODO: Replace with dynamic language detection
  const lang = 'ar';
  const t = translations[lang];

  // Parallel data fetching for performance
  const [productsResult, categoriesResult] = await Promise.allSettled([
    getProducts({ category: searchParams.category }),
    getCategories(),
  ]);

  // Safe data extraction with fallbacks
  const products = productsResult.status === 'fulfilled' ? productsResult.value : [];
  const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];

  // Log errors without breaking the page
  if (productsResult.status === 'rejected') {
    console.error('❌ Failed to fetch products:', productsResult.reason);
  }
  if (categoriesResult.status === 'rejected') {
    console.error('❌ Failed to fetch categories:', categoriesResult.reason);
  }

  const activeCategory = searchParams.category;
  const productCount = products?.length ?? 0;

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* ============================================
          🎨 HERO SECTION
          ============================================ */}
      <section className="relative h-[60vh] min-h-[500px] bg-black overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center"
          style={{ backgroundPosition: 'center 40%' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center space-y-6 px-4 max-w-4xl">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white">
              <span className="italic font-serif">MR. MODE</span>
            </h1>
            <p className="text-base md:text-xl text-gray-200 uppercase tracking-[0.3em] font-light">
              {t.heroCollection}
            </p>
            {/* Optional CTA Button */}
            <div className="pt-4">
              <button className="px-8 py-3 bg-white text-black font-medium uppercase tracking-wider text-sm hover:bg-gray-100 transition-colors duration-300">
                {t.shopNow}
              </button>
            </div>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
      {/* ============================================
          🏷️ CATEGORY NAVIGATION BAR
          ============================================ */}
      {/* CategoryBar removed: not found in workspace */}
      {/* ============================================
          🛍️ PRODUCTS SECTION
          ============================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              {t.latestProducts}
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              {activeCategory
                ? `${categories.find(c => c.slug === activeCategory)?.title || activeCategory}`
                : t.allProducts
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">
              {t.productCount.replace('{{count}}', String(productCount))}
            </span>
          </div>
        </div>
        {/* Product Grid */}
        {productCount > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.title}
                price={product.price}
                oldPrice={product.discountPrice}
                description={product.description}
                image={product.imageUrl}
                gallery={product.galleryUrls}
                category={product.category?.title}
                t={t}
                lang={lang}
              />
            ))}
          </div>
        ) : (
          <EmptyState category={activeCategory} t={t} />
        )}
      </section>
    </main>
  );
}

// ============================================
// 🎭 EMPTY STATE COMPONENT
// ============================================
type Translations = typeof import('./i18n').default['ar'];
function EmptyState({ category, t }: { category?: string; t: Translations }) {
  return (
    <div className="py-24 md:py-32">
      <div className="max-w-md mx-auto text-center space-y-6">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        {/* Message */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            {t.noProducts}
          </h3>
          <p className="text-gray-500">
            {t.tryAnotherCategory}
          </p>
        </div>
        {/* Action Button */}
        <a
          href="/"
          className="inline-block px-6 py-2.5 bg-black text-white text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300"
        >
          {t.viewAllProducts}
        </a>
      </div>
    </div>
  );
}
