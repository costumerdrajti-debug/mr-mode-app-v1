import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product, t, lang }: any) {
    return (
        <div className="group relative bg-white border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
            {/* Badge Ramadan Offer */}
            {product.discountPrice && (
                <div className="absolute top-3 left-3 z-20">
                    <span className="bg-[#D4AF37] text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-md">
                        {t.ramadanOffer || 'OFFRE RAMADAN'}
                    </span>
                </div>
            )}

            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-gray-900 truncate uppercase tracking-tight">
                    {product.title}
                </h3>
                <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-[#D4AF37]">{product.price} DH</span>
                    {product.discountPrice && (
                        <span className="text-sm text-gray-400 line-through">{product.discountPrice} DH</span>
                    )}
                </div>

                <Link
                    href={`/${lang}/product/${product.slug}`}
                    className="block w-full text-center border border-black py-2 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                >
                    {t.shopNow}
                </Link>
            </div>
        </div>
    );
}
