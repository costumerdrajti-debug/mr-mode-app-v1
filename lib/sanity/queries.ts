import { createClient } from 'next-sanity';

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
});

export async function getProducts({ categorySlug, limit = 12 }: { categorySlug?: string, limit?: number }) {
    const query = `*[_type == "product" ${categorySlug ? `&& category->slug.current == "${categorySlug}"` : ''}] | order(_createdAt desc) [0...${limit}] {
    _id,
    title,
    "slug": slug.current,
    price,
    discountPrice,
    "image": image.asset->url,
    featured
  }`;
    return await client.fetch(query);
}

export async function getCategories() {
    return await client.fetch(`*[_type == "category"] { _id, title, "slug": slug.current }`);
}
