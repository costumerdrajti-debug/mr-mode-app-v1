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
            <div className="group cursor-pointer bg-slate-900 rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-300/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(52,211,153,0.15)]">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-800">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Badge */}
                    {product.badge && (
                        <div className="absolute top-3 left-3 z-10">
                            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-300 text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wide">
                                {product.badge}
                            </span>
                        </div>
                    )}

                    {/* Discount */}
                    {product.oldPrice && discount > 0 && (
                        <div className="absolute top-3 right-3 z-10">
                            <span className="bg-red-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full">
                                -{discount}%
                            </span>
                        </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Info */}
                <div className="p-5 space-y-2">
                    <h3 className="text-sm font-bold text-slate-100 line-clamp-1 group-hover:text-emerald-300 transition-colors">
                        {product.name}
                    </h3>

                    <div className="flex items-center gap-2 pt-1">
                        <span className="text-xl font-black text-emerald-300">{product.price} DH</span>
                        {product.oldPrice && (
                            <span className="text-xs text-slate-500 line-through">{product.oldPrice} DH</span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
