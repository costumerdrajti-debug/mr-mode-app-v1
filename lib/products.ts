
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

export interface Category {
    _id: string;
    _type: 'category';
    title: string;
    slug: string;
    description?: string;
    icon?: string;
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
    category: Category;
    mainCategory?: 'clothing' | 'shoes' | 'accessories';
    stock?: number;
    sizes?: string[];
    badge?: string;
    relatedProducts?: Product[];
    isActive?: boolean;
    _createdAt: string;
    _updatedAt: string;
}

// For API responses with image URLs
export interface ProductWithImages extends Omit<Product, 'mainImage' | 'gallery' | 'relatedProducts'> {
    imageUrl: string;
    galleryUrls?: string[];
    relatedProducts?: ProductWithImages[];
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
    category->{
        _id,
        title,
        "slug": slug.current,
        description,
        icon
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
        category?: string | string[];
        mainCategory?: string;
        limit?: number;
    }
): Promise<ProductWithImages[]> {
    try {
        // Build dynamic filters
        const filters: string[] = ['_type == "product"', 'isActive == true'];
        if (options?.category) {
            if (Array.isArray(options.category)) {
                const slugs = options.category.map((slug) => `"${slug}"`).join(', ');
                filters.push(`category->slug.current in [${slugs}]`);
            } else {
                filters.push(`category->slug.current == "${options.category}"`);
            }
        }
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
): Promise<(ProductWithImages & { relatedProducts?: ProductWithImages[] }) | null> {
    try {
        if (!slug || typeof slug !== 'string') {
            throw new Error('Invalid slug provided');
        }
        const query = `
            *[_type == "product" && slug.current == $slug && isActive == true][0] {
                ${PRODUCT_QUERY},
                "relatedProducts": relatedProducts[]->{
                    ${PRODUCT_QUERY}
                }
            }
        `;
        const product = await client.fetch<Product & { relatedProducts?: Product[] } | null>(query, { slug });
        if (!product) {
            return null;
        }
        const transformed = transformProduct(product);
        if (!transformed) return null;

        // Transform related products
        const relatedProducts = product.relatedProducts
            ?.map(transformProduct)
            .filter(Boolean) as ProductWithImages[] | undefined;

        return {
            ...transformed,
            relatedProducts,
        };
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
// 🔍 GET RELATED PRODUCTS BY CATEGORY
// ============================================

export async function getRelatedProducts(
    productId: string,
    categorySlug: string,
    limit: number = 4
): Promise<ProductWithImages[]> {
    try {
        const query = `
            *[_type == "product" && _id != $productId && category->slug.current == $categorySlug && isActive == true] | order(_createdAt desc) [0...${limit}] {
                ${PRODUCT_QUERY}
            }
        `;
        const products = await client.fetch<Product[]>(query, { productId, categorySlug });
        return products.map(transformProduct).filter(Boolean) as ProductWithImages[];
    } catch (error) {
        console.error('❌ Error fetching related products:', error);
        return [];
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
        const { relatedProducts: _ignoredRelated, ...rest } = product;
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
