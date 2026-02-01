import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/sanity/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://mr-modeshop.com'; // بدل هاد الرابط بالدومين ديالك

    // جلب المنتجات باش نزيدو الروابط ديالهم أوتوماتيكياً
    let products: any[] = [];
    try {
        products = await getProducts({ limit: 100 });
    } catch (error) {
        console.error('Failed to fetch products for sitemap:', error);
        // Continue with empty products if Sanity is unavailable
    }

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
