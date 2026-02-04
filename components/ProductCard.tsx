'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';


interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    description?: string;
    image: string;
    gallery?: string[];
    sizes?: string[];
    badge?: string;
    category?: string;
    stock?: number;
    lang?: 'ar' | 'fr' | 'en';
    t?: any;
}

const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductCard({
    id,
    name,
    price,
    oldPrice,
    description,
    image,
    gallery = [],
    sizes = AVAILABLE_SIZES,
    badge,
    category,
    stock = 0,
    lang = 'ar',
    t = {},
}: ProductCardProps) {
    const { addItem, isInCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [showSizeError, setShowSizeError] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // جميع الصور
    const allImages = [image, ...gallery];

    // حساب نسبة الخصم
    const discountPercent = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

    // التنقل بين الصور
    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    // إضافة للسلة
    const handleAddToCart = () => {
        if (!selectedSize) {
            setShowSizeError(true);
            setTimeout(() => setShowSizeError(false), 2000);
            return;
        }

        addItem({
            id,
            name,
            price,
            oldPrice,
            image: allImages[0],
            size: selectedSize,
            quantity: 1,
            category,
        });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    // التحقق من وجود المنتج في السلة
    const inCart = selectedSize ? isInCart(id, selectedSize) : false;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-gradient-to-b from-[#111] to-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* صورة المنتج */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={allImages[currentImageIndex]}
                            alt={name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* التدرج */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* الشارات */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {badge && (
                        <span className="px-3 py-1.5 bg-gradient-to-r from-emerald-300 to-cyan-300 text-slate-900 text-xs font-bold rounded-full shadow-lg border border-emerald-300/40">
                            {badge}
                        </span>
                    )}
                    {discountPercent > 0 && (
                        <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                            -{discountPercent}%
                        </span>
                    )}
                </div>

                {/* زر القلب */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsLiked(!isLiked)}
                    className={`absolute top-3 left-3 p-2.5 rounded-full backdrop-blur-md transition-all ${isLiked ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                >
                    <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                </motion.button>

                {/* أزرار التنقل بين الصور */}
                {allImages.length > 1 && isHovered && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </>
                )}

                {/* نقاط التنقل */}
                {allImages.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {allImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => { e.preventDefault(); setCurrentImageIndex(idx); }}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-[#D4AF37] w-4' : 'bg-white/50 hover:bg-white'
                                    }`}
                            />
                        ))}
                    </div>
                )}

                {/* الصور المصغرة - عند التحويم */}
                {allImages.length > 1 && isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/60 backdrop-blur-md rounded-lg"
                    >
                        {allImages.slice(0, 4).map((img, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => { e.preventDefault(); setCurrentImageIndex(idx); }}
                                className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-[#D4AF37]' : 'border-transparent hover:border-white/50'
                                    }`}
                            >
                                <Image src={img} alt="" fill className="object-cover" />
                            </button>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* معلومات المنتج */}
            <div className="p-4 sm:p-5">
                {/* التصنيف */}
                {category && (
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{category}</p>
                )}

                {/* اسم المنتج */}
                <h3 className="font-bold text-white text-lg mb-1 line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                    {name}
                </h3>

                {/* الوصف */}
                {description && (
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{description}</p>
                )}

                {/* السعر */}
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-xl font-black text-[#D4AF37]">{price} درهم</span>
                    {oldPrice && (
                        <span className="text-sm text-gray-500 line-through">{oldPrice} درهم</span>
                    )}
                </div>

                {stock > 0 && stock <= 5 && (
                    <div className="bg-red-900/20 text-red-500 p-2 rounded-lg text-xs mt-4 flex items-center gap-2">
                        <span className="animate-pulse">🔥</span>
                        باقي فقط {stock} قطع في المخزون! 12 واحد كيشوفو هاد المنتج دابا.
                    </div>
                )}

                {/* اختيار المقاس */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">اختر المقاس:</span>
                        {showSizeError && (
                            <motion.span
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-xs text-red-500"
                            >
                                يرجى اختيار المقاس أولاً
                            </motion.span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`min-w-[40px] h-10 px-3 rounded-lg font-bold text-sm transition-all ${selectedSize === size
                                    ? 'bg-[#D4AF37] text-black'
                                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* زر الإضافة للسلة */}
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={isAdded || inCart}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${isAdded || inCart
                        ? 'bg-green-500 text-white'
                        : 'bg-[#D4AF37] text-black hover:bg-[#F4D03F]'
                        }`}
                >
                    {isAdded || inCart ? (
                        <>
                            <Check size={18} />
                            تمت الإضافة
                        </>
                    ) : (
                        <>
                            <ShoppingBag size={18} />
                            أضف للسلة
                        </>
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
}
