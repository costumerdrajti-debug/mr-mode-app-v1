'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
    const {
        items,
        removeItem,
        updateQuantity,
        clearCart,
        getItemCount,
        getTotalPrice,
        getTotalSavings,
        isCartOpen,
        setIsCartOpen,
        checkoutViaWhatsApp,
    } = useCart();

    const itemCount = getItemCount();
    const totalPrice = getTotalPrice();
    const savings = getTotalSavings();
    const freeShippingThreshold = 500;
    const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                        onClick={() => setIsCartOpen(false)}
                    />

                    {/* Cart Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#0a0a0a] z-50 flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black">
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                            >
                                <X size={22} />
                            </button>
                            <div className="flex items-center gap-2">
                                <ShoppingBag size={22} className="text-[#D4AF37]" />
                                <span className="font-bold text-lg">سلة التسوق</span>
                                {itemCount > 0 && (
                                    <span className="px-2.5 py-1 bg-[#D4AF37] text-black text-sm font-bold rounded-full">
                                        {itemCount}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* شريط التوصيل المجاني */}
                        {itemCount > 0 && (
                            <div className="px-5 py-3 bg-gradient-to-r from-[#D4AF37]/10 to-transparent border-b border-white/5">
                                {remainingForFreeShipping > 0 ? (
                                    <div>
                                        <p className="text-sm text-gray-400 mb-2">
                                            أضف منتجات بقيمة <span className="text-[#D4AF37] font-bold">{remainingForFreeShipping} درهم</span> للحصول على توصيل مجاني 🚚
                                        </p>
                                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min(100, (totalPrice / freeShippingThreshold) * 100)}%` }}
                                                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-full"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-green-400 font-medium flex items-center gap-2">
                                        ✅ مبروك! حصلت على توصيل مجاني
                                    </p>
                                )}
                            </div>
                        )}

                        {/* المنتجات */}
                        <div className="flex-1 overflow-y-auto py-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                    <ShoppingBag size={64} strokeWidth={1} className="mb-4 opacity-30" />
                                    <p className="text-lg font-medium mb-2">سلتك فارغة</p>
                                    <p className="text-sm">أضف منتجات للمتابعة</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-6 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#F4D03F] transition-colors"
                                    >
                                        تصفح المنتجات
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4 px-5">
                                    {items.map((item) => (
                                        <motion.div
                                            key={`${item.id}-${item.size}`}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5"
                                        >
                                            {/* صورة المنتج */}
                                            <div className="relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* معلومات المنتج */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-white text-sm line-clamp-1 mb-1">
                                                    {item.name}
                                                </h4>
                                                <p className="text-xs text-gray-500 mb-2">
                                                    المقاس: <span className="text-[#D4AF37]">{item.size}</span>
                                                </p>

                                                {/* السعر */}
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="text-[#D4AF37] font-bold">{item.price} درهم</span>
                                                    {item.oldPrice && (
                                                        <span className="text-xs text-gray-500 line-through">{item.oldPrice}</span>
                                                    )}
                                                </div>

                                                {/* التحكم في الكمية */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                            className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                            className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => removeItem(item.id, item.size)}
                                                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-white/10 bg-black p-5 space-y-4">
                                {/* التوفير */}
                                {savings > 0 && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-green-400">💚 وفرت</span>
                                        <span className="text-green-400 font-bold">{savings} درهم</span>
                                    </div>
                                )}

                                {/* المجموع */}
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">المجموع الكلي</span>
                                    <span className="text-2xl font-black text-[#D4AF37]">{totalPrice} درهم</span>
                                </div>

                                {/* أزرار */}
                                <div className="space-y-3">
                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        onClick={checkoutViaWhatsApp}
                                        className="w-full py-4 bg-green-500 text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-green-600 transition-colors"
                                    >
                                        <MessageCircle size={20} />
                                        أكمل الطلب عبر واتساب
                                    </motion.button>

                                    <button
                                        onClick={clearCart}
                                        className="w-full py-3 text-red-500 font-medium text-sm hover:bg-red-500/10 rounded-xl transition-colors"
                                    >
                                        تفريغ السلة
                                    </button>
                                </div>

                                {/* ملاحظة */}
                                <p className="text-xs text-gray-500 text-center">
                                    🔒 الدفع عند الاستلام • 🚚 توصيل لجميع المدن
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
