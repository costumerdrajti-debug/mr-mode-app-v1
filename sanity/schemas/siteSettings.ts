import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'siteSettings',
    title: 'إعدادات الموقع',
    type: 'document',
    icon: () => '⚙️',
    groups: [
        { name: 'general', title: 'عام', default: true },
        { name: 'contact', title: 'التواصل' },
        { name: 'social', title: 'السوشال ميديا' },
        { name: 'promo', title: 'العروض' },
    ],
    fields: [
        // ─── GENERAL ────────────────────────────────
        defineField({
            name: 'siteName',
            title: 'اسم المتجر',
            type: 'string',
            group: 'general',
            initialValue: 'MR. MODE',
        }),
        defineField({
            name: 'logo',
            title: 'شعار المتجر',
            type: 'image',
            group: 'general',
            description: 'الشعار اللي يبان في الناف بار'
        }),
        defineField({
            name: 'favicon',
            title: 'أيقونة الموقع (Favicon)',
            type: 'image',
            group: 'general',
        }),
        defineField({
            name: 'seoDescription',
            title: 'وصف الموقع (SEO)',
            type: 'text',
            group: 'general',
            rows: 3,
            description: 'الوصف اللي يبان في نتائج Google'
        }),

        // ─── CONTACT ────────────────────────────────
        defineField({
            name: 'phone',
            title: 'رقم الهاتف',
            type: 'string',
            group: 'contact',
            description: 'رقم الواتساب أو الهاتف'
        }),
        defineField({
            name: 'email',
            title: 'البريد الإلكتروني',
            type: 'string',
            group: 'contact',
        }),
        defineField({
            name: 'address',
            title: 'العنوان',
            type: 'string',
            group: 'contact',
        }),
        defineField({
            name: 'city',
            title: 'المدينة',
            type: 'string',
            group: 'contact',
            initialValue: 'الدار البيضاء'
        }),
        defineField({
            name: 'workingHours',
            title: 'ساعات العمل',
            type: 'string',
            group: 'contact',
            description: 'مثال: 10:00 - 21:00'
        }),

        // ─── SOCIAL ─────────────────────────────────
        defineField({
            name: 'instagram',
            title: 'Instagram',
            type: 'url',
            group: 'social',
        }),
        defineField({
            name: 'facebook',
            title: 'Facebook',
            type: 'url',
            group: 'social',
        }),
        defineField({
            name: 'tiktok',
            title: 'TikTok',
            type: 'url',
            group: 'social',
        }),
        defineField({
            name: 'whatsapp',
            title: 'WhatsApp Link',
            type: 'url',
            group: 'social',
            description: 'رابط الواتساب مثال: https://wa.me/212653421432'
        }),

        // ─── PROMO ──────────────────────────────────
        defineField({
            name: 'announcementBar',
            title: 'شريط الإعلانات',
            type: 'string',
            group: 'promo',
            description: 'نص يبان فوق الموقع (مثال: 🔥 توصيل مجاني فوق 500 درهم)'
        }),
        defineField({
            name: 'announcementBarEn',
            title: 'Announcement (English)',
            type: 'string',
            group: 'promo',
        }),
        defineField({
            name: 'announcementBarFr',
            title: 'Annonce (Français)',
            type: 'string',
            group: 'promo',
        }),
        defineField({
            name: 'showAnnouncementBar',
            title: 'عرض شريط الإعلانات؟',
            type: 'boolean',
            group: 'promo',
            initialValue: false,
        }),
        defineField({
            name: 'freeShippingThreshold',
            title: 'حد التوصيل المجاني (MAD)',
            type: 'number',
            group: 'promo',
            description: 'المبلغ اللي فوقو يكون التوصيل مجاني'
        }),
    ],
    preview: {
        prepare() {
            return {
                title: '⚙️ إعدادات الموقع',
            };
        }
    }
});
