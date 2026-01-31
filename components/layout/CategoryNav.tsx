"use client";
import Link from 'next/link';

export default function CategoryNav({ categories, activeCategory, t, lang }: any) {
    return (
        <nav className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex items-center gap-8 overflow-x-auto py-4 no-scrollbar">
                    <Link
                        href={`/${lang}`}
                        className={`whitespace-nowrap text-xs font-black uppercase tracking-[0.2em] transition-colors ${!activeCategory ? "text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1" : "text-gray-400 hover:text-black"
                            }`}
                    >
                        {t.allProducts || 'ALL'}
                    </Link>

                    {categories?.map((cat: any) => (
                        <Link
                            key={cat._id}
                            href={`/${lang}?category=${cat.slug}`}
                            className={`whitespace-nowrap text-xs font-black uppercase tracking-[0.2em] transition-colors ${activeCategory === cat.slug ? "text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1" : "text-gray-400 hover:text-black"
                                }`}
                        >
                            {cat.title}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
