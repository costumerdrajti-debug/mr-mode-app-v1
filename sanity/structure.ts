import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('MR. MODE')
    .items([
      // ─── المنتجات ─────────────────────────────
      S.listItem()
        .title('👔 المنتجات')
        .child(
          S.list()
            .title('المنتجات')
            .items([
              S.listItem()
                .title('جميع المنتجات')
                .child(
                  S.documentTypeList('product')
                    .title('جميع المنتجات')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),
              S.divider(),
              S.listItem()
                .title('👕 ملابس')
                .child(
                  S.documentTypeList('product')
                    .title('ملابس')
                    .filter('_type == "product" && mainCategory == "clothing"')
                ),
              S.listItem()
                .title('👟 أحذية')
                .child(
                  S.documentTypeList('product')
                    .title('أحذية')
                    .filter('_type == "product" && mainCategory == "shoes"')
                ),
              S.listItem()
                .title('⌚ إكسسوارات')
                .child(
                  S.documentTypeList('product')
                    .title('إكسسوارات')
                    .filter('_type == "product" && mainCategory == "accessories"')
                ),
              S.divider(),
              S.listItem()
                .title('⚠️ نفذ من المخزون')
                .child(
                  S.documentTypeList('product')
                    .title('نفذ من المخزون')
                    .filter('_type == "product" && stock == 0')
                ),
              S.listItem()
                .title('🚫 غير نشط')
                .child(
                  S.documentTypeList('product')
                    .title('غير نشط')
                    .filter('_type == "product" && isActive == false')
                ),
              S.listItem()
                .title('⭐ المميزة')
                .child(
                  S.documentTypeList('product')
                    .title('المنتجات المميزة')
                    .filter('_type == "product" && isFeatured == true')
                ),
            ])
        ),

      S.divider(),

      // ─── المجموعات ────────────────────────────
      S.listItem()
        .title('📦 المجموعات')
        .child(
          S.documentTypeList('collection')
            .title('المجموعات')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      // ─── البانرات ─────────────────────────────
      S.listItem()
        .title('🖼️ بانرات الصفحة الرئيسية')
        .child(
          S.documentTypeList('heroBanner')
            .title('البانرات')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // ─── الإعدادات ────────────────────────────
      S.listItem()
        .title('⚙️ إعدادات الموقع')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('إعدادات الموقع')
        ),
    ])
