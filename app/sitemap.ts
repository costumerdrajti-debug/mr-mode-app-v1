import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/sanity/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://mr-modeshop.com'; // بدل هاد الرابط بالدومين ديالك

    // جلب المنتجات باش نزيدو الروابط ديالهم أوتوماتيكياً
    const products = await getProducts({ limit: 100 });

    const productEntries = products.map((product: any) => ({
        url: `${baseUrl}/ar/product/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'always' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/ar`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/fr`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        ...productEntries,
    ];
}
