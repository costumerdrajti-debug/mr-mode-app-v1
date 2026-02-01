import { createClient } from 'next-sanity';

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7iqoebc8',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
});

export async function getProducts({ category, limit = 12 }: { category?: string, limit?: number }) {
    const query = `*[_type == "product" ${category ? `&& category->slug.current == "${category}"` : ''}] | order(_createdAt desc) [0...${limit}] {
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
