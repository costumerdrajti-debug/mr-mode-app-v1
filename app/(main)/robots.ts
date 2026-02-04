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
        sitemap: 'https://mrmode.ma/sitemap.xml', // Update with your actual domain
    };
}
