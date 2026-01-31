
'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// أنواع البيانات
export interface CartItem {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    size: string;
    quantity: number;
    category?: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, size: string) => void;
    updateQuantity: (id: string, size: string, quantity: number) => void;
    clearCart: () => void;
    getItemCount: () => number;
    getTotalPrice: () => number;
    getTotalSavings: () => number;
    isInCart: (id: string, size: string) => boolean;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
    generateWhatsAppMessage: () => string;
    checkoutViaWhatsApp: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const PHONE_NUMBER = "212653421432";
const STORAGE_KEY = "mr-mode-cart";
const STORE_ADDRESS = "درب التعاون زنقة 71 الحي الحسني الدار البيضاء، المغرب";

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // تحميل السلة من localStorage
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem(STORAGE_KEY);
            if (savedCart) {
                const parsed = JSON.parse(savedCart);
                if (Array.isArray(parsed)) {
                    setItems(parsed);
                }
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        }
        setIsInitialized(true);
    }, []);

    // حفظ السلة في localStorage
    useEffect(() => {
        if (isInitialized) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
            } catch (error) {
                console.error('Error saving cart:', error);
            }
        }
    }, [items, isInitialized]);

    // إضافة منتج
    const addItem = useCallback((newItem: CartItem) => {
        setItems(currentItems => {
            const existingIndex = currentItems.findIndex(
                item => item.id === newItem.id && item.size === newItem.size
            );

            if (existingIndex > -1) {
                // زيادة الكمية إذا كان المنتج موجود
                const updated = [...currentItems];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + newItem.quantity
                };
                return updated;
            }

            // إضافة منتج جديد
            return [...currentItems, newItem];
        });
        setIsCartOpen(true);
    }, []);

    // حذف منتج
    const removeItem = useCallback((id: string, size: string) => {
        setItems(currentItems =>
            currentItems.filter(item => !(item.id === id && item.size === size))
        );
    }, []);

    // تحديث الكمية
    const updateQuantity = useCallback((id: string, size: string, quantity: number) => {
        if (quantity < 1) {
            removeItem(id, size);
            return;
        }

        setItems(currentItems =>
            currentItems.map(item =>
                item.id === id && item.size === size
                    ? { ...item, quantity }
                    : item
            )
        );
    }, [removeItem]);

    // تفريغ السلة
    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    // عدد المنتجات
    const getItemCount = useCallback(() => {
        return items.reduce((total, item) => total + item.quantity, 0);
    }, [items]);

    // المجموع الكلي
    const getTotalPrice = useCallback(() => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [items]);

    // التوفير
    const getTotalSavings = useCallback(() => {
        return items.reduce((total, item) => {
            if (item.oldPrice) {
                return total + ((item.oldPrice - item.price) * item.quantity);
            }
            return total;
        }, 0);
    }, [items]);

    // التحقق من وجود منتج
    const isInCart = useCallback((id: string, size: string) => {
        return items.some(item => item.id === id && item.size === size);
    }, [items]);

    // إنشاء رسالة واتساب
    const generateWhatsAppMessage = useCallback(() => {
        if (items.length === 0) return '';

        let message = `🛍️ *طلب جديد من Mr. Mode*\n`;
        message += `━━━━━━━━━━━━━━━━━━\n\n`;

        items.forEach((item, index) => {
            message += `*${index + 1}. ${item.name}*\n`;
            message += `   📏 المقاس: ${item.size}\n`;
            message += `   🔢 الكمية: ${item.quantity}\n`;
            message += `   💰 السعر: ${item.price} درهم`;
            if (item.oldPrice) {
                message += ` ~~${item.oldPrice}~~`;
            }
            message += `\n\n`;
        });

        message += `━━━━━━━━━━━━━━━━━━\n`;
        message += `📦 *عدد المنتجات:* ${getItemCount()}\n`;

        const savings = getTotalSavings();
        if (savings > 0) {
            message += `💚 *التوفير:* ${savings} درهم\n`;
        }

        message += `💳 *المجموع الكلي:* ${getTotalPrice()} درهم\n`;
        message += `━━━━━━━━━━━━━━━━━━\n\n`;
        message += `🏪 *عنوان المتجر للاستلام:*\n`;
        message += `📍 ${STORE_ADDRESS}\n\n`;
        message += `🚚 التوصيل مجاني للطلبات فوق 500 درهم\n`;
        message += `💳 الدفع عند الاستلام\n`;
        message += `📍 التوصيل لجميع مدن المغرب 🇲🇦\n\n`;
        message += `━━━━━━━━━━━━━━━━━━\n`;
        message += `📝 *معلومات التوصيل:*\n`;
        message += `الاسم الكامل: \n`;
        message += `رقم الهاتف: \n`;
        message += `المدينة: \n`;
        message += `العنوان بالتفصيل: \n`;

        return message;
    }, [items, getItemCount, getTotalPrice, getTotalSavings]);

    // الدفع عبر واتساب
    const checkoutViaWhatsApp = useCallback(() => {
        const message = generateWhatsAppMessage();
        if (message) {
            const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
            // Facebook Pixel Purchase event
            if (window.fbq) {
                window.fbq('track', 'Purchase', { currency: 'MAD', value: getTotalPrice() });
            }
            window.location.href = '/thank-you';
        }
    }, [generateWhatsAppMessage, getTotalPrice]);

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            getItemCount,
            getTotalPrice,
            getTotalSavings,
            isInCart,
            isCartOpen,
            setIsCartOpen,
            generateWhatsAppMessage,
            checkoutViaWhatsApp
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
