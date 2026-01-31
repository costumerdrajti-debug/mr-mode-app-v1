
import { client } from './sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

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

interface Category {
    _id: string;
    _type: 'category';
    title: string;
    slug: string;
    description?: string;
}

interface Product {
    _id: string;
    _type: 'product';
    title: string;
    slug: string;
    price: number;
    discountPrice?: number;
    description?: string;
    image: SanityImage;
    gallery?: SanityImage[];
    category: Category;
    stock?: number;
    featured?: boolean;
    tags?: string[];
    _createdAt: string;
    _updatedAt: string;
}

// For API responses with image URLs
export interface ProductWithImages extends Omit<Product, 'image' | 'gallery'> {
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
    title,
    "slug": slug.current,
    price,
    discountPrice,
    description,
    image {
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
    category->{
        _id,
        title,
        "slug": slug.current,
        description
    },
    stock,
    featured,
    tags
`;

// ============================================
// 📦 GET ALL PRODUCTS
// ============================================

export async function getProducts(
    options?: {
        category?: string;
        featured?: boolean;
        limit?: number;
    }
): Promise<ProductWithImages[]> {
    try {
        // Build dynamic filters
        const filters: string[] = ['_type == "product"'];
        if (options?.category) {
            filters.push(`category->slug.current == "${options.category}"`);
        }
        if (options?.featured) {
            filters.push('featured == true');
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
        throw new Error('Failed to fetch products. Please try again later.');
    }
}

// ============================================
// 🎯 GET SINGLE PRODUCT BY SLUG
// ============================================

export async function getProductBySlug(
    slug: string
): Promise<ProductWithImages | null> {
    try {
        if (!slug || typeof slug !== 'string') {
            throw new Error('Invalid slug provided');
        }
        const query = `
            *[_type == "product" && slug.current == $slug][0] {
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
        if (!product.image?.asset) {
            console.warn(`⚠️ Product "${product.title}" missing image asset`);
            return null;
        }
        // Build main image URL
        const imageUrl = urlFor(product.image)
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
        return {
            ...product,
            imageUrl,
            galleryUrls,
        };
    } catch (error) {
        console.error(`❌ Error transforming product "${product.title}":`, error);
        return null;
    }
}

// ============================================
// 🏷️ GET ALL CATEGORIES (BONUS)
// ============================================

export async function getCategories(): Promise<Category[]> {
    try {
        const query = `
            *[_type == "category"] | order(title asc) {
                _id,
                title,
                "slug": slug.current,
                description
            }
        `;
        return await client.fetch<Category[]>(query);
    } catch (error) {
        console.error('❌ Error fetching categories:', error);
        return [];
    }
}
