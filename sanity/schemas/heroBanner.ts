import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'heroBanner',
    title: 'بانر الصفحة الرئيسية',
    type: 'document',
    icon: () => '🖼️',
    fields: [
        defineField({
            name: 'title',
            title: 'العنوان الرئيسي',
            type: 'string',
            validation: (Rule) => Rule.required(),
            description: 'العنوان الكبير اللي يبان في البانر'
        }),
        defineField({
            name: 'titleEn',
            title: 'Title (English)',
            type: 'string',
        }),
        defineField({
            name: 'titleFr',
            title: 'Titre (Français)',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'العنوان الفرعي',
            type: 'string',
            description: 'نص صغير تحت العنوان'
        }),
        defineField({
            name: 'subtitleEn',
            title: 'Subtitle (English)',
            type: 'string',
        }),
        defineField({
            name: 'subtitleFr',
            title: 'Sous-titre (Français)',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'صورة البانر',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
            description: 'صورة عريضة - يفضل 1920x800 بيكسل على الأقل'
        }),
        defineField({
            name: 'mobileImage',
            title: 'صورة الموبايل',
            type: 'image',
            options: { hotspot: true },
            description: 'صورة مخصصة للموبايل (اختياري) - 750x1000 بيكسل'
        }),
        defineField({
            name: 'buttonText',
            title: 'نص الزر',
            type: 'string',
            description: 'مثال: تسوق الآن',
            initialValue: 'تسوق الآن'
        }),
        defineField({
            name: 'buttonLink',
            title: 'رابط الزر',
            type: 'string',
            description: 'وين يمشي الكليك؟ مثال: /ar/products أو /ar',
            initialValue: '/ar'
        }),
        defineField({
            name: 'isActive',
            title: 'نشط؟',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'order',
            title: 'الترتيب',
            type: 'number',
            initialValue: 0,
            description: 'الأصغر يبان أولاً'
        }),
    ],
    orderings: [
        { title: 'الترتيب', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'subtitle',
            media: 'image',
            isActive: 'isActive',
        },
        prepare({ title, subtitle, media, isActive }) {
            return {
                title: `${isActive ? '✅' : '🚫'} ${title || 'بلا عنوان'}`,
                subtitle: subtitle || '',
                media,
            };
        }
    }
});
