
import { client } from './sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// ============================================
// 🎨 IMAGE URL BUILDER
// ============================================
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

// ============================================
// 📊 TYPESCRIPT INTERFACES
// ============================================

interface SanityImage {
    _type: 'image';
    asset: {
        _ref: string;
        _type: 'reference';
        _id?: string;
        url?: string;
        metadata?: any;
    };
    alt?: string;
    hotspot?: {
        x: number;
        y: number;
    };
    crop?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
}

export interface Product {
    _id: string;
    _type: 'product';
    name: string;
    slug: string;
    price: number;
    oldPrice?: number;
    description?: string;
    mainImage: SanityImage;
    gallery?: SanityImage[];
    mainCategory?: 'clothing' | 'shoes' | 'accessories';
    stock?: number;
    sizes?: string[];
    badge?: string;
    isActive?: boolean;
    _createdAt: string;
    _updatedAt: string;
}

// For API responses with image URLs
export interface ProductWithImages extends Omit<Product, 'mainImage' | 'gallery'> {
    imageUrl: string;
    galleryUrls?: string[];
}

// ============================================
// 🔍 GROQ QUERIES
// ============================================

const PRODUCT_QUERY = `
    _id,
    _type,
    _createdAt,
    _updatedAt,
    name,
    "slug": slug.current,
    price,
    oldPrice,
    description,
    mainImage {
        asset->{
            _id,
            url,
            metadata {
                lqip,
                dimensions
            }
        },
        alt,
        hotspot,
        crop
    },
    gallery[] {
        asset->{
            _id,
            url,
            metadata {
                lqip,
                dimensions
            }
        },
        alt
    },
    mainCategory,
    stock,
    sizes,
    badge,
    isActive
`;

// ============================================
// 📦 GET ALL PRODUCTS
// ============================================

export async function getProducts(
    options?: {
        mainCategory?: string;
        limit?: number;
    }
): Promise<ProductWithImages[]> {
    try {
        // Build dynamic filters
        const filters: string[] = ['_type == "product"', 'isActive == true'];
        if (options?.mainCategory) {
            filters.push(`mainCategory == "${options.mainCategory}"`);
        }
        const filterString = filters.join(' && ');
        const limitString = options?.limit ? `[0...${options.limit}]` : '';
        const query = `
            *[${filterString}] | order(_createdAt desc) ${limitString} {
                ${PRODUCT_QUERY}
            }
        `;
        const products = await client.fetch<Product[]>(query);
        // Transform to include image URLs
        return products.map(transformProduct).filter(Boolean) as ProductWithImages[];
    } catch (error) {
        console.error('❌ Error fetching products:', error);
        return []; // Return empty array instead of throwing
    }
}

// ============================================
// 🎯 GET SINGLE PRODUCT BY SLUG WITH RELATED
// ============================================

export async function getProductBySlugWithRelated(
    slug: string
): Promise<ProductWithImages | null> {
    try {
        if (!slug || typeof slug !== 'string') {
            throw new Error('Invalid slug provided');
        }
        const query = `
            *[_type == "product" && slug.current == $slug && isActive == true][0] {
                ${PRODUCT_QUERY}
            }
        `;
        const product = await client.fetch<Product | null>(query, { slug });
        if (!product) {
            return null;
        }
        return transformProduct(product);
    } catch (error) {
        console.error(`❌ Error fetching product with slug "${slug}":`, error);
        return null;
    }
}

// ============================================
// 🎯 GET SINGLE PRODUCT BY SLUG (Simple version)
// ============================================

export async function getProductBySlug(
    slug: string
): Promise<ProductWithImages | null> {
    try {
        if (!slug || typeof slug !== 'string') {
            throw new Error('Invalid slug provided');
        }
        const query = `
            *[_type == "product" && slug.current == $slug && isActive == true][0] {
                ${PRODUCT_QUERY}
            }
        `;
        const product = await client.fetch<Product | null>(query, { slug });
        if (!product) {
            return null;
        }
        return transformProduct(product);
    } catch (error) {
        console.error(`❌ Error fetching product with slug "${slug}":`, error);
        return null;
    }
}

// ============================================
// 🎯 GET SINGLE PRODUCT BY ID
// ============================================

export async function getProductById(
    id: string
): Promise<ProductWithImages | null> {
    try {
        if (!id || typeof id !== 'string') {
            throw new Error('Invalid product ID provided');
        }
        const query = `
            *[_type == "product" && _id == $id][0] {
                ${PRODUCT_QUERY}
            }
        `;
        const product = await client.fetch<Product | null>(query, { id });
        if (!product) {
            return null;
        }
        return transformProduct(product);
    } catch (error) {
        console.error(`❌ Error fetching product with ID "${id}":`, error);
        return null;
    }
}

// ============================================
// 🔄 TRANSFORM HELPER
// ============================================

function transformProduct(product: Product): ProductWithImages | null {
    try {
        // Validate required fields
        if (!product.mainImage?.asset) {
            console.warn(`⚠️ Product "${product.name}" missing mainImage asset`);
            return null;
        }
        // Build main image URL
        const imageUrl = urlFor(product.mainImage)
            .width(800)
            .height(800)
            .fit('crop')
            .quality(90)
            .url();
        // Build gallery URLs
        const galleryUrls = product.gallery
            ?.filter(img => img.asset)
            .map(img =>
                urlFor(img)
                    .width(800)
                    .height(800)
                    .fit('crop')
                    .quality(90)
                    .url()
            );
        const { ...rest } = product;
        return {
            ...rest,
            imageUrl,
            galleryUrls,
        };
    } catch (error) {
        console.error(`❌ Error transforming product "${product.name}":`, error);
        return null;
    }
}

// ============================================
