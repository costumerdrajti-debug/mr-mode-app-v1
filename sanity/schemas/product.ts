import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'product',
    title: 'المنتجات',
    type: 'document',
    icon: () => '👔',
    groups: [
        { name: 'basic', title: 'المعلومات الأساسية', default: true },
        { name: 'pricing', title: 'الأسعار والمخزون' },
        { name: 'media', title: 'الصور' },
        { name: 'details', title: 'التفاصيل' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        // ─── BASIC INFO ────────────────────────────
        defineField({
            name: 'name',
            title: 'اسم المنتج',
            type: 'string',
            group: 'basic',
            validation: (Rule) => Rule.required().min(3).max(120),
            description: 'اسم المنتج كما سيظهر في الموقع'
        }),
        defineField({
            name: 'nameEn',
            title: 'Product Name (English)',
            type: 'string',
            group: 'basic',
            description: 'English name for international customers'
        }),
        defineField({
            name: 'nameFr',
            title: 'Nom du produit (Français)',
            type: 'string',
            group: 'basic',
            description: 'Nom en français pour les clients francophones'
        }),
        defineField({
            name: 'slug',
            title: 'الرابط (Slug)',
            type: 'slug',
            group: 'basic',
            options: { source: 'name', maxLength: 96 },
            validation: (Rule) => Rule.required(),
            description: 'رابط المنتج - اضغط Generate باش يتولد تلقائياً'
        }),
        defineField({
            name: 'mainCategory',
            title: 'التصنيف الرئيسي',
            type: 'string',
            group: 'basic',
            options: {
                list: [
                    { title: '👕 ملابس', value: 'clothing' },
                    { title: '👟 أحذية', value: 'shoes' },
                    { title: '⌚ إكسسوارات', value: 'accessories' }
                ],
                layout: 'radio'
            },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'subCategory',
            title: 'التصنيف الفرعي',
            type: 'string',
            group: 'basic',
            options: {
                list: [
                    { title: 'قمصان', value: 'shirts' },
                    { title: 'بولو', value: 'polo' },
                    { title: 'تي شيرت', value: 'tshirts' },
                    { title: 'بنطلون', value: 'pants' },
                    { title: 'جينز', value: 'jeans' },
                    { title: 'شورت', value: 'shorts' },
                    { title: 'جاكيت', value: 'jackets' },
                    { title: 'بليزر', value: 'blazers' },
                    { title: 'سويتر', value: 'sweaters' },
                    { title: 'هودي', value: 'hoodies' },
                    { title: 'بدلة', value: 'suits' },
                    { title: 'جلابة', value: 'djellaba' },
                    { title: 'رياضية', value: 'sneakers' },
                    { title: 'كلاسيك', value: 'classic-shoes' },
                    { title: 'صنادل', value: 'sandals' },
                    { title: 'لوفرز', value: 'loafers' },
                    { title: 'ساعات', value: 'watches' },
                    { title: 'نظارات', value: 'glasses' },
                    { title: 'أحزمة', value: 'belts' },
                    { title: 'محافظ', value: 'wallets' },
                    { title: 'قبعات', value: 'caps' },
                    { title: 'عطور', value: 'perfumes' },
                ]
            },
            description: 'اختر التصنيف الفرعي للمنتج'
        }),
        defineField({
            name: 'collection',
            title: 'المجموعة',
            type: 'reference',
            to: [{ type: 'collection' }],
            group: 'basic',
            description: 'المجموعة اللي تابع ليها هاد المنتج (اختياري)'
        }),
        defineField({
            name: 'description',
            title: 'وصف المنتج (عربي)',
            type: 'text',
            group: 'basic',
            rows: 4,
            description: 'وصف مختصر للمنتج باللغة العربية'
        }),
        defineField({
            name: 'descriptionEn',
            title: 'Description (English)',
            type: 'text',
            group: 'basic',
            rows: 4,
        }),
        defineField({
            name: 'descriptionFr',
            title: 'Description (Français)',
            type: 'text',
            group: 'basic',
            rows: 4,
        }),

        // ─── PRICING & STOCK ───────────────────────
        defineField({
            name: 'price',
            title: 'الثمن الحالي (MAD)',
            type: 'number',
            group: 'pricing',
            validation: (Rule) => Rule.required().min(0),
            description: 'الثمن بالدرهم المغربي'
        }),
        defineField({
            name: 'oldPrice',
            title: 'الثمن قبل التخفيض (MAD)',
            type: 'number',
            group: 'pricing',
            description: 'خليه فارغ إلا ماكانش تخفيض'
        }),
        defineField({
            name: 'costPrice',
            title: 'ثمن الشراء (MAD)',
            type: 'number',
            group: 'pricing',
            description: 'ثمن الشراء ديال المنتج (للحساب الداخلي - مايبانش في الموقع)',
        }),
        defineField({
            name: 'stock',
            title: 'المخزون المتوفر',
            type: 'number',
            group: 'pricing',
            validation: (Rule) => Rule.required().min(0),
            initialValue: 0,
            description: 'عدد القطع المتوفرة - 0 = نفذ من المخزون'
        }),
        defineField({
            name: 'sku',
            title: 'رمز المنتج (SKU)',
            type: 'string',
            group: 'pricing',
            description: 'رمز فريد للمنتج (اختياري)'
        }),

        // ─── MEDIA ──────────────────────────────────
        defineField({
            name: 'mainImage',
            title: 'الصورة الرئيسية',
            type: 'image',
            group: 'media',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
            description: 'الصورة الرئيسية للمنتج - يفضل 800x800 بيكسل'
        }),
        defineField({
            name: 'gallery',
            title: 'ألبوم الصور الإضافية',
            type: 'array',
            group: 'media',
            of: [{ type: 'image', options: { hotspot: true } }],
            description: 'زيد صور إضافية من زوايا مختلفة'
        }),

        // ─── DETAILS ────────────────────────────────
        defineField({
            name: 'sizes',
            title: 'المقاسات المتوفرة',
            type: 'array',
            group: 'details',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'XS', value: 'XS' },
                    { title: 'S', value: 'S' },
                    { title: 'M', value: 'M' },
                    { title: 'L', value: 'L' },
                    { title: 'XL', value: 'XL' },
                    { title: 'XXL', value: 'XXL' },
                    { title: '3XL', value: '3XL' },
                    { title: '39', value: '39' },
                    { title: '40', value: '40' },
                    { title: '41', value: '41' },
                    { title: '42', value: '42' },
                    { title: '43', value: '43' },
                    { title: '44', value: '44' },
                    { title: '45', value: '45' },
                ]
            },
            description: 'اختر المقاسات المتوفرة'
        }),
        defineField({
            name: 'colors',
            title: 'الألوان المتوفرة',
            type: 'array',
            group: 'details',
            of: [{
                type: 'object',
                fields: [
                    defineField({
                        name: 'name',
                        title: 'اسم اللون',
                        type: 'string',
                        validation: (Rule) => Rule.required()
                    }),
                    defineField({
                        name: 'hex',
                        title: 'كود اللون',
                        type: 'string',
                        description: 'مثال: #000000 للأسود',
                        validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color' })
                    }),
                ],
                preview: {
                    select: { title: 'name', hex: 'hex' },
                    prepare({ title, hex }) {
                        return { title: title || 'لون', subtitle: hex || '' };
                    }
                }
            }],
            description: 'زيد الألوان المتوفرة مع الكود ديالهم'
        }),
        defineField({
            name: 'material',
            title: 'الخامة / المادة',
            type: 'string',
            group: 'details',
            options: {
                list: [
                    { title: 'قطن 100%', value: 'cotton' },
                    { title: 'بوليستر', value: 'polyester' },
                    { title: 'قطن مخلوط', value: 'cotton-blend' },
                    { title: 'كتان', value: 'linen' },
                    { title: 'جلد طبيعي', value: 'leather' },
                    { title: 'جلد اصطناعي', value: 'faux-leather' },
                    { title: 'صوف', value: 'wool' },
                    { title: 'جينز / دنيم', value: 'denim' },
                    { title: 'حرير', value: 'silk' },
                    { title: 'نايلون', value: 'nylon' },
                ]
            },
        }),
        defineField({
            name: 'badge',
            title: 'الشارة',
            type: 'string',
            group: 'details',
            options: {
                list: [
                    { title: '🆕 جديد', value: 'جديد' },
                    { title: '🔥 الأكثر مبيعاً', value: 'الأكثر مبيعاً' },
                    { title: '💰 خصم', value: 'خصم' },
                    { title: '⭐ حصري', value: 'حصري' },
                    { title: '🏷️ عرض محدود', value: 'عرض محدود' },
                ]
            },
            description: 'شارة تظهر فوق المنتج (اختياري)'
        }),
        defineField({
            name: 'isFeatured',
            title: 'منتج مميز؟',
            type: 'boolean',
            group: 'details',
            initialValue: false,
            description: 'إلا شعّلتيه، المنتج غادي يبان في الصفحة الرئيسية'
        }),
        defineField({
            name: 'isActive',
            title: 'نشط / معروض في الموقع؟',
            type: 'boolean',
            group: 'details',
            initialValue: true,
            description: 'طفيه باش يختفي المنتج من الموقع بلا ما تمسحو'
        }),
        defineField({
            name: 'tags',
            title: 'الكلمات المفتاحية',
            type: 'array',
            group: 'details',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
            description: 'كلمات مفتاحية للبحث (مثال: كاجوال، صيفي، رسمي...)'
        }),

        // ─── SEO ─────────────────────────────────────
        defineField({
            name: 'seoTitle',
            title: 'عنوان SEO',
            type: 'string',
            group: 'seo',
            description: 'عنوان الصفحة في Google (خليه فارغ باش يستعمل اسم المنتج)',
            validation: (Rule) => Rule.max(70)
        }),
        defineField({
            name: 'seoDescription',
            title: 'وصف SEO',
            type: 'text',
            group: 'seo',
            rows: 3,
            description: 'الوصف اللي يبان في Google (160 حرف كحد أقصى)',
            validation: (Rule) => Rule.max(160)
        }),
    ],
    orderings: [
        { title: 'الأحدث أولاً', name: 'createdDesc', by: [{ field: '_createdAt', direction: 'desc' }] },
        { title: 'الأقدم أولاً', name: 'createdAsc', by: [{ field: '_createdAt', direction: 'asc' }] },
        { title: 'الثمن ↑', name: 'priceAsc', by: [{ field: 'price', direction: 'asc' }] },
        { title: 'الثمن ↓', name: 'priceDesc', by: [{ field: 'price', direction: 'desc' }] },
        { title: 'الاسم أ-ي', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
    ],
    preview: {
        select: {
            title: 'name',
            price: 'price',
            oldPrice: 'oldPrice',
            stock: 'stock',
            media: 'mainImage',
            isActive: 'isActive',
            badge: 'badge',
        },
        prepare({ title, price, oldPrice, stock, media, isActive, badge }) {
            const status = !isActive ? '🚫' : stock === 0 ? '⚠️ نفذ' : `✅ ${stock}`;
            const priceText = oldPrice
                ? `${price} MAD (كان ${oldPrice})`
                : `${price} MAD`;
            return {
                title: `${badge ? badge + ' | ' : ''}${title || 'بلا اسم'}`,
                subtitle: `${priceText} — ${status}`,
                media
            };
        }
    }
});
