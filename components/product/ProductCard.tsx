import Image from 'next/image';
import Link from 'next/link';
import type { ProductWithImages } from '@/lib/products';

interface ProductCardProps {
    product: ProductWithImages;
    t: any;
    lang: string;
}

export default function ProductCard({ product, t, lang }: ProductCardProps) {
    const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

    return (
        <Link href={`/${lang}/products/${product.slug}`}>
            <div className="group cursor-pointer bg-gradient-to-br from-[#1A2942] to-[#0F1F3D] rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 transform hover:-translate-y-3 border-2 border-[#D4AF37]/30 hover:border-[#D4AF37]">
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#0A1628]">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Badge */}
                    {product.badge && (
                        <div className="absolute top-4 left-4 z-10">
                            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-300 text-slate-900 text-xs font-black px-4 py-2 rounded-full shadow-2xl uppercase tracking-wide border border-emerald-200/60">
                                {product.badge}
                            </span>
                        </div>
                    )}

                    {/* Discount Badge */}
                    {product.oldPrice && discount > 0 && (
                        <div className="absolute top-4 right-4 z-10">
                            <span className="bg-red-600 text-white text-xs font-black px-4 py-2 rounded-full shadow-2xl">
                                -{discount}%
                            </span>
                        </div>
                    )}

                    {/* Quick Shop Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/0 to-transparent group-hover:from-[#D4AF37]/20 transition-all duration-500"></div>
                </div>

                {/* Product Info */}
                <div className="p-6 bg-gradient-to-b from-[#1A2942] to-[#0F1F3D] space-y-3">
                    <h3 className="text-lg font-bold text-[#F5F5DC] line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                        {product.name}
                    </h3>

                    {product.category && (
                        <p className="text-xs text-[#C4C4B8] uppercase tracking-widest">
                            {product.category.title}
                        </p>
                    )}

                    <div className="flex items-center gap-3 pt-2">
                        <span className="text-2xl font-black bg-gradient-to-r from-[#D4AF37] to-[#C9A55C] bg-clip-text text-transparent">{product.price} DH</span>
                        {product.oldPrice && (
                            <span className="text-sm text-[#9A9A8A] line-through">{product.oldPrice} DH</span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
