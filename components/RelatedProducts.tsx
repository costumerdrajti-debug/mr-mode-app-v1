// عرض المنتجات المقترحة (Upsell)
export default function RelatedProducts({ products }: { products: any[] }) {
    return (
        <div className="mt-20 border-t border-white/10 pt-10">
            <h3 className="text-[#D4AF37] text-2xl font-bold mb-6 text-right">كمّل الأناقة ديالك (هادشي غايجي معاك) 🔥</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((item: any) => (
                    <div key={item._id} className="bg-[#111] p-4 rounded-xl border border-white/5 hover:border-[#D4AF37] transition-all group">
                        <img src={item.image} className="rounded-lg mb-3 opacity-80 group-hover:opacity-100" />
                        <h4 className="text-sm font-bold text-white">{item.name}</h4>
                        <p className="text-[#D4AF37] font-bold text-xs">{item.price} MAD</p>
                        <button className="w-full mt-2 py-1 bg-white text-black text-[10px] font-bold rounded-full">
                            أضف للسلة +
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
