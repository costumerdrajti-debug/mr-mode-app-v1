// lib/structuredData.ts

export function getOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ClothingStore',
        name: 'MR. MODE',
        description: 'Luxury menswear store in Casablanca, Morocco',
        url: 'https://mr-modeshop.ma',
        logo: 'https://mr-modeshop.ma/logo.png',
        image: 'https://mr-modeshop.ma/og-image.jpg',
        telephone: '+212653421432',
        email: 'mr.modeshop@gmail.com',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Belvédère',
            addressLocality: 'Casablanca',
            addressRegion: 'Casablanca-Settat',
            addressCountry: 'MA',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 33.5722730,
            longitude: -7.6752650,
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                opens: '10:00',
                closes: '23:00',
            },
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Friday',
                opens: '15:00',
                closes: '23:00',
            },
        ],
        priceRange: '$$',
        acceptedPaymentMethod: ['Cash', 'BankTransfer'],
        sameAs: [
            'https://www.instagram.com/mr.mode.num1',
            'https://www.facebook.com/share/17pXYfQeTG/',
            'https://www.tiktok.com/@mrmodenum1',
        ],
    };
}

export function getProductSchema(product: {
    name: string;
    description: string;
    image: string;
    price: number;
    currency?: string;
    availability?: string;
    brand?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image,
        brand: {
            '@type': 'Brand',
            name: product.brand || 'MR. MODE',
        },
        offers: {
            '@type': 'Offer',
            url: typeof window !== 'undefined' ? window.location.href : '',
            priceCurrency: product.currency || 'MAD',
            price: product.price,
            availability: product.availability || 'https://schema.org/InStock',
            seller: {
                '@type': 'Organization',
                name: 'MR. MODE',
            },
        },
    };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}
