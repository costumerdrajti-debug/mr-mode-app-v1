'use client';

import { useState } from 'react';

interface TrackOrderClientProps {
    trackButton: string;
    orderNumberLabel: string;
    placeholder: string;
    isRTL: boolean;
    phoneNumber: string;
}

export default function TrackOrderClient({
    trackButton,
    orderNumberLabel,
    placeholder,
    isRTL,
    phoneNumber,
}: TrackOrderClientProps) {
    const [orderNumber, setOrderNumber] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!orderNumber.trim()) {
            setError(isRTL ? 'المرجو إدخال رقم الطلب' : 'Please enter your order number');
            return;
        }

        setError('');

        const message = isRTL
            ? `مرحبا 👋\n\nبغيت نتبع الطلب ديالي:\n📦 رقم الطلب: ${orderNumber}\n\nشكراً 🙏`
            : `Hello 👋\n\nI want to track my order:\n📦 Order number: ${orderNumber}\n\nThank you 🙏`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label
                    htmlFor="orderNumber"
                    className="block text-sm font-medium mb-2 text-gray-300"
                >
                    {orderNumberLabel}
                </label>
                <input
                    type="text"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => {
                        setOrderNumber(e.target.value);
                        setError('');
                    }}
                    placeholder={placeholder}
                    className="w-full px-4 py-4 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
                    dir="ltr"
                />
                {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-yellow-500 text-black py-4 font-bold uppercase tracking-widest hover:bg-yellow-400 transition rounded-lg"
            >
                {trackButton}
            </button>
        </form>
    );
}
