'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface OrderFormProps {
    productName: string;
    productPrice: number;
    productOldPrice?: number;
    productImage: string;
    sizes?: string[];
    locale: 'ar' | 'en' | 'fr';
    phoneNumber: string;
}

const labels = {
    ar: {
        title: 'إتمام الطلب',
        fullName: 'الاسم الكامل',
        phone: 'رقم الهاتف',
        city: 'المدينة',
        address: 'العنوان بالتفصيل',
        size: 'المقاس',
        quantity: 'الكمية',
        notes: 'ملاحظات إضافية',
        submit: 'تأكيد الطلب عبر واتساب',
        cancel: 'إلغاء',
        required: 'مطلوب',
        phonePlaceholder: '06XXXXXXXX',
        addressPlaceholder: 'الحي، الشارع، رقم المنزل...',
        notesPlaceholder: 'لون معين، تغليف هدية...',
        cityPlaceholder: 'اختر المدينة',
        namePlaceholder: 'الاسم الكامل',
        orderSummary: 'ملخص الطلب',
        total: 'المجموع',
        freeDelivery: 'التوصيل مجاني',
        cashOnDelivery: 'الدفع عند الاستلام',
        selectSize: 'اختر المقاس',
    },
    en: {
        title: 'Complete Your Order',
        fullName: 'Full Name',
        phone: 'Phone Number',
        city: 'City',
        address: 'Full Address',
        size: 'Size',
        quantity: 'Quantity',
        notes: 'Additional Notes',
        submit: 'Confirm Order via WhatsApp',
        cancel: 'Cancel',
        required: 'Required',
        phonePlaceholder: '06XXXXXXXX',
        addressPlaceholder: 'Neighborhood, Street, House number...',
        notesPlaceholder: 'Specific color, gift wrapping...',
        cityPlaceholder: 'Select city',
        namePlaceholder: 'Your full name',
        orderSummary: 'Order Summary',
        total: 'Total',
        freeDelivery: 'Free Delivery',
        cashOnDelivery: 'Cash on Delivery',
        selectSize: 'Select Size',
    },
    fr: {
        title: 'Finaliser la commande',
        fullName: 'Nom complet',
        phone: 'Numéro de téléphone',
        city: 'Ville',
        address: 'Adresse complète',
        size: 'Taille',
        quantity: 'Quantité',
        notes: 'Notes supplémentaires',
        submit: 'Confirmer via WhatsApp',
        cancel: 'Annuler',
        required: 'Requis',
        phonePlaceholder: '06XXXXXXXX',
        addressPlaceholder: 'Quartier, Rue, Numéro...',
        notesPlaceholder: 'Couleur spécifique, emballage cadeau...',
        cityPlaceholder: 'Choisir la ville',
        namePlaceholder: 'Votre nom complet',
        orderSummary: 'Résumé de la commande',
        total: 'Total',
        freeDelivery: 'Livraison gratuite',
        cashOnDelivery: 'Paiement à la livraison',
        selectSize: 'Choisir la taille',
    },
};

const moroccanCities = [
    'الدار البيضاء / Casablanca',
    'الرباط / Rabat',
    'مراكش / Marrakech',
    'فاس / Fès',
    'طنجة / Tanger',
    'أكادير / Agadir',
    'مكناس / Meknès',
    'وجدة / Oujda',
    'القنيطرة / Kénitra',
    'تمارة / Témara',
    'سلا / Salé',
    'الجديدة / El Jadida',
    'بني ملال / Béni Mellal',
    'خريبكة / Khouribga',
    'تازة / Taza',
    'الناظور / Nador',
    'سطات / Settat',
    'آسفي / Safi',
    'الحسيمة / Al Hoceima',
    'تطوان / Tétouan',
    'خنيفرة / Khénifra',
    'العيون / Laâyoune',
    'الداخلة / Dakhla',
    'ورزازات / Ouarzazate',
    'الراشيدية / Errachidia',
    'برشيد / Berrechid',
    'المحمدية / Mohammadia',
];

export default function WhatsAppOrderForm({
    productName,
    productPrice,
    productOldPrice,
    productImage,
    sizes,
    locale,
    phoneNumber,
}: OrderFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        city: '',
        address: '',
        size: '',
        quantity: 1,
        notes: '',
    });
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    const t = labels[locale];
    const isRTL = locale === 'ar';

    const validate = () => {
        const newErrors: Record<string, boolean> = {};
        if (!formData.fullName.trim()) newErrors.fullName = true;
        if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = true;
        if (!formData.city) newErrors.city = true;
        if (!formData.address.trim()) newErrors.address = true;
        if (sizes && sizes.length > 0 && !formData.size) newErrors.size = true;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const totalPrice = productPrice * formData.quantity;
        const sizeText = formData.size ? `\n📐 ${t.size}: ${formData.size}` : '';
        const notesText = formData.notes ? `\n📝 ${t.notes}: ${formData.notes}` : '';
        const oldPriceText = productOldPrice ? ` (~~${productOldPrice} DH~~)` : '';

        const message = `🛍️ *${locale === 'ar' ? 'طلب جديد من MR. MODE' : locale === 'fr' ? 'Nouvelle commande MR. MODE' : 'New Order from MR. MODE'}*
━━━━━━━━━━━━━━━━━━

📦 *${locale === 'ar' ? 'المنتج' : locale === 'fr' ? 'Produit' : 'Product'}:* ${productName}
💰 *${locale === 'ar' ? 'الثمن' : locale === 'fr' ? 'Prix' : 'Price'}:* ${productPrice} DH${oldPriceText}
🔢 *${t.quantity}:* ${formData.quantity}${sizeText}
💵 *${t.total}:* ${totalPrice} DH

━━━━━━━━━━━━━━━━━━
👤 *${t.fullName}:* ${formData.fullName}
📱 *${t.phone}:* ${formData.phone}
🏙️ *${t.city}:* ${formData.city}
📍 *${t.address}:* ${formData.address}${notesText}
━━━━━━━━━━━━━━━━━━

🚚 ${t.freeDelivery} | 💳 ${t.cashOnDelivery}`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        setIsOpen(false);
    };

    const inputClass = (field: string) =>
        `w-full px-4 py-3 bg-gray-900/80 border ${errors[field] ? 'border-red-500' : 'border-gray-700'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition`;

    return (
        <>
            {/* Order Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="block w-full bg-yellow-500 text-black py-4 text-center font-bold uppercase tracking-widest hover:bg-yellow-400 transition rounded-lg cursor-pointer"
            >
                🛒 {locale === 'ar' ? 'اطلب الآن' : locale === 'fr' ? 'Commander maintenant' : 'Order Now'}
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir={isRTL ? 'rtl' : 'ltr'}>
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Form Modal */}
                    <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl">
                        {/* Header */}
                        <div className="sticky top-0 z-10 bg-gray-950 border-b border-gray-800 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                            <h2 className="text-xl font-bold text-white">{t.title}</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-gray-800 rounded-full transition"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {/* Product Summary */}
                        <div className="px-6 pt-4 pb-2">
                            <div className="flex items-center gap-4 bg-gray-900/50 rounded-xl p-3 border border-gray-800">
                                <img
                                    src={productImage}
                                    alt={productName}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-white truncate">{productName}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-yellow-500 font-bold">{productPrice} DH</span>
                                        {productOldPrice && (
                                            <span className="text-gray-500 line-through text-sm">{productOldPrice} DH</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                    {t.fullName} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => {
                                        setFormData({ ...formData, fullName: e.target.value });
                                        setErrors({ ...errors, fullName: false });
                                    }}
                                    placeholder={t.namePlaceholder}
                                    className={inputClass('fullName')}
                                />
                                {errors.fullName && <p className="text-red-500 text-xs mt-1">{t.required}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                    {t.phone} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => {
                                        setFormData({ ...formData, phone: e.target.value });
                                        setErrors({ ...errors, phone: false });
                                    }}
                                    placeholder={t.phonePlaceholder}
                                    className={inputClass('phone')}
                                    dir="ltr"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{t.required}</p>}
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                    {t.city} <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.city}
                                    onChange={(e) => {
                                        setFormData({ ...formData, city: e.target.value });
                                        setErrors({ ...errors, city: false });
                                    }}
                                    className={inputClass('city')}
                                >
                                    <option value="">{t.cityPlaceholder}</option>
                                    {moroccanCities.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                                {errors.city && <p className="text-red-500 text-xs mt-1">{t.required}</p>}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                    {t.address} <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => {
                                        setFormData({ ...formData, address: e.target.value });
                                        setErrors({ ...errors, address: false });
                                    }}
                                    placeholder={t.addressPlaceholder}
                                    rows={2}
                                    className={inputClass('address')}
                                />
                                {errors.address && <p className="text-red-500 text-xs mt-1">{t.required}</p>}
                            </div>

                            {/* Size & Quantity Row */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Size */}
                                {sizes && sizes.length > 0 && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                            {t.size} <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={formData.size}
                                            onChange={(e) => {
                                                setFormData({ ...formData, size: e.target.value });
                                                setErrors({ ...errors, size: false });
                                            }}
                                            className={inputClass('size')}
                                        >
                                            <option value="">{t.selectSize}</option>
                                            {sizes.map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                        {errors.size && <p className="text-red-500 text-xs mt-1">{t.required}</p>}
                                    </div>
                                )}

                                {/* Quantity */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                        {t.quantity}
                                    </label>
                                    <div className="flex items-center border border-gray-700 rounded-xl overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                                            className="px-4 py-3 bg-gray-800 hover:bg-gray-700 transition text-white font-bold"
                                        >
                                            −
                                        </button>
                                        <span className="flex-1 text-center py-3 bg-gray-900/80 text-white font-bold">
                                            {formData.quantity}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, quantity: Math.min(10, formData.quantity + 1) })}
                                            className="px-4 py-3 bg-gray-800 hover:bg-gray-700 transition text-white font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                    {t.notes}
                                </label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    placeholder={t.notesPlaceholder}
                                    rows={2}
                                    className={inputClass('notes')}
                                />
                            </div>

                            {/* Total */}
                            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">{t.total}</span>
                                    <span className="text-2xl font-black text-yellow-500">
                                        {productPrice * formData.quantity} DH
                                    </span>
                                </div>
                                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                                    <span>🚚 {t.freeDelivery}</span>
                                    <span>💳 {t.cashOnDelivery}</span>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-3 cursor-pointer"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                {t.submit}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
