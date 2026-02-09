import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'collection',
    title: 'المجموعات',
    type: 'document',
    icon: () => '📦',
    fields: [
        defineField({
            name: 'title',
            title: 'اسم المجموعة',
            type: 'string',
            validation: (Rule) => Rule.required(),
            description: 'مثال: مجموعة صيف 2026، كلاسيك، ستريت وير...'
        }),
        defineField({
            name: 'titleEn',
            title: 'Collection Name (English)',
            type: 'string',
        }),
        defineField({
            name: 'titleFr',
            title: 'Nom de la collection (Français)',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'الرابط (Slug)',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
            description: 'اضغط Generate'
        }),
        defineField({
            name: 'description',
            title: 'وصف المجموعة',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'image',
            title: 'صورة المجموعة',
            type: 'image',
            options: { hotspot: true },
            description: 'صورة الغلاف ديال المجموعة'
        }),
        defineField({
            name: 'isActive',
            title: 'نشطة؟',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'order',
            title: 'الترتيب',
            type: 'number',
            initialValue: 0,
            description: 'رقم للترتيب - الأصغر يبان أولاً'
        }),
    ],
    orderings: [
        { title: 'الترتيب', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
        { title: 'الأحدث', name: 'createdDesc', by: [{ field: '_createdAt', direction: 'desc' }] },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
            isActive: 'isActive',
        },
        prepare({ title, media, isActive }) {
            return {
                title: `${isActive ? '✅' : '🚫'} ${title || 'بلا اسم'}`,
                media,
            };
        }
    }
});
