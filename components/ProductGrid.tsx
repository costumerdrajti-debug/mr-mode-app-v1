'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';

const PHONE_NUMBER = "212653421432";

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

interface Product {
    _id: string;
    name: string;
    price: number;
    oldPrice?: number;
    description?: string;
    imageUrl: string;
    badge?: string;
}

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    const sendWhatsApp = useCallback((productName: string) => {
        const msg = `السلام عليكم Mr. Mode، بغيت نطلب: ${productName}`;
        window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    }, []);

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
            {products.map((product) => (
                <motion.div
                    key={product._id}
                    variants={fadeInUp}
                    whileHover={{ y: -10 }}
                    className="group bg-[#111] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl flex flex-col h-full"
                >
                    {/* Product Image with Zoom Effect */}
                    <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {product.badge && (
                            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/60 backdrop-blur-md text-[#D4AF37] px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold border border-[#D4AF37]/20">
                                {product.badge}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="p-5 sm:p-6 lg:p-8 flex flex-col flex-grow text-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:text-[#D4AF37] transition-colors">
                            {product.name}
                        </h3>

                        {product.description && (
                            <p className="text-gray-400 text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed flex-grow">
                                {product.description}
                            </p>
                        )}

                        <div className="flex flex-col gap-3 sm:gap-4 mt-auto">
                            {/* Price */}
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-2xl sm:text-3xl font-black text-[#D4AF37] tracking-tighter">
                                    {product.price} MAD
                                </span>
                                {product.oldPrice && (
                                    <span className="text-gray-500 line-through text-sm">
                                        {product.oldPrice} MAD
                                    </span>
                                )}
                            </div>

                            {/* WhatsApp Order Button */}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => sendWhatsApp(product.name)}
                                className="w-full bg-[#25D366] hover:bg-[#1da851] active:bg-[#1da851] text-white py-3.5 sm:py-4 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 font-bold text-base sm:text-lg shadow-lg shadow-green-900/20 transition-all min-h-[52px] touch-manipulation"
                            >
                                <MessageCircle className="w-5 h-5 sm:w-[22px] sm:h-[22px]" fill="currentColor" />
                                اطلب الآن عبر واتساب
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
