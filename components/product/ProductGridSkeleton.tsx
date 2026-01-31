export default function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-8">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="animate-pulse space-y-4">
                    {/* الصورة - Skeleton */}
                    <div className="aspect-[3/4] w-full bg-gray-200 rounded-sm shadow-inner" />

                    <div className="space-y-2 px-2">
                        {/* العنوان - Skeleton */}
                        <div className="h-3 w-3/4 bg-gray-200 rounded-full" />

                        {/* الثمن - Skeleton */}
                        <div className="flex gap-2">
                            <div className="h-4 w-1/4 bg-gold-200/30 rounded-full" />
                            <div className="h-4 w-1/4 bg-gray-100 rounded-full" />
                        </div>

                        {/* الزر - Skeleton */}
                        <div className="mt-4 h-9 w-full bg-gray-50 border border-gray-100 rounded-sm" />
                    </div>
                </div>
            ))}
        </div>
    );
}
