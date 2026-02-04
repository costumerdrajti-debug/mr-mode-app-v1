import { createClient } from 'next-sanity';

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7iqoebc8',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
});

export async function getProducts({ category, limit = 12 }: { category?: string | string[], limit?: number }) {
    const categoryFilter = (() => {
        if (!category) return '';
        if (Array.isArray(category)) {
            const slugs = category.map((slug) => `"${slug}"`).join(', ');
            return `&& category->slug.current in [${slugs}]`;
        }
        return `&& category->slug.current == "${category}"`;
    })();

    const query = `*[_type == "product" && isActive == true ${categoryFilter}] | order(_createdAt desc) [0...${limit}] {
        _id,
        title,
        "slug": slug.current,
        price,
        discountPrice,
        "image": image.asset->url,
        "images": images[].asset->url,
        featured,
        isNew,
        inStock
    }`;
    return await client.fetch(query);
}

export async function getCategories() {
    return await client.fetch(`*[_type == "category"] { _id, title, "slug": slug.current }`);
}
