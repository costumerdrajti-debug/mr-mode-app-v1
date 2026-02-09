import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/studio/', '/api/'],
            },
        ],
        sitemap: 'https://mr-modeshop.ma/sitemap.xml',
    };
}
