import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'product',
    title: 'المنتجات',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'اسم المنتج',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'الرابط (Slug)',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
            validation: (Rule) => Rule.required(),
            description: 'رابط المنتج في الموقع - اضغط Generate'
        }),
        defineField({
            name: 'mainCategory',
            title: 'التصنيف الرئيسي',
            type: 'string',
            options: {
                list: [
                    { title: 'ملابس', value: 'clothing' },
                    { title: 'أحذية', value: 'shoes' },
                    { title: 'إكسسوارات', value: 'accessories' }
                ]
            },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'price',
            title: 'الثمن الحالي (MAD)',
            type: 'number',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'oldPrice',
            title: 'الثمن قبل التخفيض (اختياري)',
            type: 'number'
        }),
        defineField({
            name: 'stock',
            title: 'المخزون المتوفر',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
            description: 'عدد القطع المتوفرة في المخزون لهذا المنتج'
        }),
        defineField({
            name: 'description',
            title: 'وصف المنتج',
            type: 'text'
        }),
        defineField({
            name: 'mainImage',
            title: 'الصورة الرئيسية',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'gallery',
            title: 'ألبوم الصور الإضافية',
            type: 'array',
            of: [{ type: 'image' }]
        }),
        defineField({
            name: 'sizes',
            title: 'المقاسات',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'S', value: 'S' },
                    { title: 'M', value: 'M' },
                    { title: 'L', value: 'L' },
                    { title: 'XL', value: 'XL' },
                    { title: 'XXL', value: 'XXL' }
                ]
            }
        }),
        defineField({
            name: 'badge',
            title: 'الشارة',
            type: 'string',
            options: {
                list: [
                    { title: 'جديد', value: 'جديد' },
                    { title: 'الأكثر مبيعاً', value: 'الأكثر مبيعاً' },
                    { title: 'خصم', value: 'خصم' },
                    { title: 'حصري', value: 'حصري' }
                ]
            }
        }),
        defineField({
            name: 'isActive',
            title: 'نشط؟',
            type: 'boolean',
            initialValue: true
        })
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'price',
            media: 'mainImage'
        },
        prepare({ title, subtitle, media }) {
            return {
                title,
                subtitle: subtitle ? `${subtitle} MAD` : 'بدون ثمن',
                media
            };
        }
    }
});
