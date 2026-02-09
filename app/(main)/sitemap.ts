import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/sanity/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://mr-modeshop.ma';

    // جلب المنتجات باش نزيدو الروابط ديالهم أوتوماتيكياً
    let products: any[] = [];
    try {
        products = await getProducts({ limit: 100 });
    } catch (error) {
        console.error('Failed to fetch products for sitemap:', error);
    }

    const languages = ['ar', 'en', 'fr'];

    const productEntries = products.flatMap((product: any) =>
        languages.map((lang) => ({
            url: `${baseUrl}/${lang}/products/${product.slug}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.7,
        }))
    );

    const staticPages = ['', '/about', '/contact', '/faq', '/returns', '/track-order'];
    const staticEntries = languages.flatMap((lang) =>
        staticPages.map((page) => ({
            url: `${baseUrl}/${lang}${page}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: page === '' ? 0.9 : 0.6,
        }))
    );

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'always' as const,
            priority: 1,
        },
        ...staticEntries,
        ...productEntries,
    ];
}
