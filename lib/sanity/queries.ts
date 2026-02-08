import { createClient } from 'next-sanity';

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ypd52iva',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
});

export async function getProducts({ limit = 12 }: { limit?: number }) {
    const query = `*[_type == "product" && isActive == true] | order(_createdAt desc) [0...${limit}] {
        _id,
        "title": name,
        "slug": slug.current,
        price,
        "discountPrice": select(oldPrice != null && oldPrice > price => price, null),
        "originalPrice": select(oldPrice != null && oldPrice > price => oldPrice, price),
        "image": mainImage.asset->url,
        "images": gallery[].asset->url,
        badge,
        "isNew": badge == "جديد",
        "inStock": stock > 0
    }`;
    return await client.fetch(query);
}
