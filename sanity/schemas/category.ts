import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'category',
    title: 'الأصناف',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'اسم الصنف',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'رابط فرعي (Slug)',
            type: 'slug',
            options: { source: 'title' }
        }),
        defineField({
            name: 'icon',
            title: 'أيقونة الصنف (اختياري)',
            type: 'string',
            description: 'مثلاً: 👕, 👖, 👟'
        })
    ],
});
