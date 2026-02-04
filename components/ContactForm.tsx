'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const SUPPORTED_LANGUAGES = ['ar', 'en', 'fr'] as const;
type Locale = (typeof SUPPORTED_LANGUAGES)[number];

interface ContactFormProps {
    locale: Locale;
}

const translations = {
    ar: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        subject: 'الموضوع',
        message: 'رسالتك',
        send: 'إرسال',
        sending: 'جاري الإرسال...',
        success: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
        error: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
        required: 'هذا الحقل مطلوب',
    },
    en: {
        name: 'Full Name',
        email: 'Email',
        phone: 'Phone Number',
        subject: 'Subject',
        message: 'Your Message',
        send: 'Send',
        sending: 'Sending...',
        success: 'Your message has been sent successfully! We will contact you soon.',
        error: 'An error occurred. Please try again.',
        required: 'This field is required',
    },
    fr: {
        name: 'Nom Complet',
        email: 'Email',
        phone: 'Numéro de téléphone',
        subject: 'Sujet',
        message: 'Votre Message',
        send: 'Envoyer',
        sending: 'Envoi...',
        success: 'Votre message a été envoyé avec succès! Nous vous contacterons bientôt.',
        error: 'Une erreur s\'est produite. Veuillez réessayer.',
        required: 'Ce champ est requis',
    },
};

export default function ContactForm({ locale }: ContactFormProps) {
    const t = translations[locale];
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = t.required;
        if (!formData.email.trim()) newErrors.email = t.required;
        if (!formData.phone.trim()) newErrors.phone = t.required;
        if (!formData.message.trim()) newErrors.message = t.required;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setStatus('sending');

        // Simulate sending (replace with actual API call)
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                    {t.name} *
                </label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 bg-gray-900 border ${errors.name ? 'border-red-500' : 'border-gray-800'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                        {t.email} *
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 bg-gray-900 border ${errors.email ? 'border-red-500' : 'border-gray-800'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                        {t.phone} *
                    </label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-3 bg-gray-900 border ${errors.phone ? 'border-red-500' : 'border-gray-800'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition`}
                        dir="ltr"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
            </div>

            {/* Subject */}
            <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                    {t.subject}
                </label>
                <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
                />
            </div>

            {/* Message */}
            <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                    {t.message} *
                </label>
                <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className={`w-full px-4 py-3 bg-gray-900 border ${errors.message ? 'border-red-500' : 'border-gray-800'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition resize-none`}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-yellow-500 text-black py-4 font-bold uppercase tracking-widest hover:bg-yellow-400 transition rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === 'sending' ? t.sending : t.send}
            </button>

            {/* Success/Error Messages */}
            {status === 'success' && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-500 text-center"
                >
                    ✅ {t.success}
                </motion.div>
            )}
            {status === 'error' && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-center"
                >
                    ❌ {t.error}
                </motion.div>
            )}
        </form>
    );
}
