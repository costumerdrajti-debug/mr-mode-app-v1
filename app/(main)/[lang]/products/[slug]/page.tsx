// app/[lang]/products/[slug]/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import FadeIn from '@/components/animations/FadeIn';
import translations from '@/lib/translations';
import { getProductBySlugWithRelated, getProducts } from '@/lib/products';

// ============================================
// 🌐 Language Support
// ============================================
const SUPPORTED_LANGUAGES = ['ar', 'en', 'fr'] as const;
type Locale = (typeof SUPPORTED_LANGUAGES)[number];

function getValidLocale(lang: string | undefined): Locale {
    if (!lang || !SUPPORTED_LANGUAGES.includes(lang as Locale)) {
        return 'ar';
    }
    return lang as Locale;
}

// ============================================
// 📊 Generate Metadata
// ============================================
export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
    const { lang, slug } = await params;
    const locale = getValidLocale(lang);
    const product = await getProductBySlugWithRelated(slug);

    if (!product) {
        return {
            title: 'Product Not Found | MR. MODE',
        };
    }

    return {
        title: `${product.name} | MR. MODE`,
        description: product.description || `${product.name} - MR. MODE`,
        openGraph: {
            title: product.name,
            description: product.description || product.name,
            images: [product.imageUrl],
        },
    };
}

// ============================================
// 🔧 Generate Static Params for Static Generation
// ============================================
export async function generateStaticParams() {
    const products = await getProducts({ limit: 100 });
    const languages = ['ar', 'en', 'fr'];

    return products.flatMap((product) =>
        languages.map((lang) => ({
            lang,
            slug: product.slug,
        }))
    );
}

// ============================================
// 📄 Product Page Component
// ============================================
export default async function ProductPage({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { lang, slug } = await params;
    const locale = getValidLocale(lang);
    const t = translations[locale];
    const isRTL = locale === 'ar';

    const product = await getProductBySlugWithRelated(slug);

    if (!product) {
        notFound();
    }

    const discount = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0;

    // All product images (main + gallery)
    const allImages = [product.imageUrl, ...(product.galleryUrls || [])];

    const whatsappMessage = `${isRTL ? 'السلام عليكم' : 'Hello'} 👋\n\n🛍️ ${isRTL ? 'بغيت نطلب هاد المنتج' : 'I want to order this product'}:\n━━━━━━━━━━━━━━━\n📦 ${product.name}\n💰 ${product.price} DH\n━━━━━━━━━━━━━━━\n\n${isRTL ? 'شكراً' : 'Thank you'} 🙏`;

    return (
        <div
            className="min-h-screen bg-black text-white py-20"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumb */}
                <FadeIn>
                    <nav className="flex gap-2 text-sm mb-8 text-gray-400">
                        <Link href={`/${locale}`} className="hover:text-yellow-500 transition">
                            {isRTL ? 'الرئيسية' : 'Home'}
                        </Link>
                        <span>/</span>
                        <Link href={`/${locale}#products`} className="hover:text-yellow-500 transition">
                            {isRTL ? 'المنتجات' : 'Products'}
                        </Link>
                        <span>/</span>
                        <span className="text-white">{product.name}</span>
                    </nav>
                </FadeIn>

                {/* Product Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Images */}
                    <FadeIn>
                        <div className="space-y-4">
                            <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden">
                                <Image
                                    src={allImages[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {product.badge && (
                                    <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                                        {product.badge}
                                    </div>
                                )}
                                {discount > 0 && (
                                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        -{discount}%
                                    </div>
                                )}
                            </div>
                            {allImages.length > 1 && (
                                <div className="grid grid-cols-3 gap-4">
                                    {allImages.slice(1).map((img, i) => (
                                        <div key={i} className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition">
                                            <Image
                                                src={img}
                                                alt={`${product.name} ${i + 2}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </FadeIn>

                    {/* Info */}
                    <FadeIn delay={0.2}>
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-4xl font-black mb-2">{product.name}</h1>
                                {product.category && (
                                    <p className="text-yellow-500 text-sm font-semibold uppercase tracking-wider mt-2">
                                        {product.category.icon} {product.category.title}
                                    </p>
                                )}
                                <div className="flex items-center gap-4 mt-4">
                                    <span className="text-3xl font-bold text-yellow-500">{product.price} {isRTL ? 'درهم' : 'MAD'}</span>
                                    {product.oldPrice && (
                                        <span className="text-xl text-gray-500 line-through">{product.oldPrice} {isRTL ? 'درهم' : 'MAD'}</span>
                                    )}
                                </div>
                            </div>

                            {product.description && (
                                <div className="border-t border-b border-gray-800 py-4">
                                    <p className="text-gray-300 leading-relaxed">{product.description}</p>
                                </div>
                            )}

                            {/* Sizes */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div>
                                    <h3 className="font-bold mb-3">{isRTL ? 'اختر المقاس' : 'Select Size'}</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                className="px-6 py-3 border border-gray-700 rounded-lg hover:border-yellow-500 hover:text-yellow-500 transition"
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Stock */}
                            <div className="flex items-center gap-2 text-sm">
                                <div className={`w-2 h-2 rounded-full ${(product.stock && product.stock > 0) ? 'bg-green-500' : 'bg-red-500'}`} />
                                <span>
                                    {(product.stock && product.stock > 0)
                                        ? (isRTL ? `متوفر (${product.stock} قطعة)` : `In Stock (${product.stock} pieces)`)
                                        : (isRTL ? 'غير متوفر' : 'Out of Stock')}
                                </span>
                            </div>

                            {/* CTA */}
                            <a
                                href={`https://wa.me/212653421432?text=${encodeURIComponent(whatsappMessage)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-yellow-500 text-black py-4 text-center font-bold uppercase tracking-widest hover:bg-yellow-400 transition rounded-lg"
                            >
                                🛒 {isRTL ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}
                            </a>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4 pt-6">
                                {[
                                    { icon: '🚚', text: isRTL ? 'توصيل مجاني' : 'Free Delivery' },
                                    { icon: '💳', text: isRTL ? 'الدفع عند الاستلام' : 'Cash on Delivery' },
                                    { icon: '↩️', text: isRTL ? 'إرجاع مجاني' : 'Free Returns' },
                                    { icon: '✅', text: isRTL ? 'جودة مضمونة' : 'Quality Guaranteed' },
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                                        <span className="text-xl">{feature.icon}</span>
                                        <span>{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                </div>


            </div>

            <WhatsAppFloat
                phoneNumber="212653421432"
                message={whatsappMessage}
            />
        </div>
    );
}
