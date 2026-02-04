# 📦 Sanity CMS Setup Guide - MR. MODE

## ✅ Sanity is Already Configured!

Your project is already connected to Sanity Studio. Here's how to add your products:

---

## 🚀 Quick Start

### 1. Access Sanity Studio

Visit: **http://localhost:3000/studio**

This will open Sanity Studio where you can manage your products and categories.

---

### 2. Create Categories First

Before adding products, create some categories:

1. Click **"الأصناف" (Categories)** in the sidebar
2. Click **"Create new document"**
3. Fill in:
   - **اسم الصنف (Title)**: e.g., "قمصان" or "Shirts"
   - **رابط فرعي (Slug)**: Click "Generate" (e.g., "qmsan" or "shirts")
   - **أيقونة (Icon)**: Optional, add emoji like 👕, 👖, 👟
4. Click **Publish**

**Recommended Categories:**
- 👕 قمصان / Shirts
- 👖 بناطل / Pants
- 🧥 بدل / Suits
- 👟 أحذية / Shoes
- 👔 إكسسوارات / Accessories

---

### 3. Add Products

1. Click **"المنتجات" (Products)** in the sidebar
2. Click **"Create new document"**
3. Fill in the product details:

#### Required Fields:
- **اسم المنتج (Name)**: Product name (e.g., "قميص أبيض كلاسيكي")
- **رابط فرعي (Slug)**: Click "Generate" from the name
- **التصنيف الرئيسي (Main Category)**: Choose clothing, shoes, or accessories
- **تصنيف المنتج (Category)**: Select from categories you created
- **الثمن الحالي (Price)**: Current price in MAD (e.g., 350)
- **المخزون المتوفر (Stock)**: Number of items in stock (e.g., 10)
- **الصورة الرئيسية (Main Image)**: Upload main product image
- **نشط؟ (Active)**: Make sure this is checked ✅

#### Optional Fields:
- **الثمن قبل التخفيض (Old Price)**: Original price if discounted
- **وصف المنتج (Description)**: Product description
- **ألبوم الصور الإضافية (Gallery)**: Additional product images
- **المقاسات (Sizes)**: Select available sizes (S, M, L, XL, XXL)
- **الشارة (Badge)**: Add badge like "جديد", "الأكثر مبيعاً", "خصم"
- **إقتراحات (Related Products)**: Select related products for upselling

4. Click **Publish**

---

## 📸 Image Best Practices

- **Format**: JPG or PNG
- **Resolution**: 800x800px or higher (square images work best)
- **File Size**: Keep under 1MB for faster loading
- **Background**: Clean, white or neutral backgrounds recommended

---

## 🎯 Example Product

Here's a complete example:

```
Name: قميص أبيض كلاسيكي
Slug: qmys-abyadh-klasyki
Main Category: clothing
Category: قمصان (Shirts)
Price: 350
Old Price: 450
Stock: 15
Description: قميص قطني كلاسيكي بتصميم أنيق ومريح، مثالي للاستخدام اليومي والمناسبات الرسمية
Sizes: S, M, L, XL, XXL
Badge: جديد
Main Image: [Upload image]
Gallery: [Upload 2-3 more images]
Active: ✅ Yes
```

---

## 🔄 Real-Time Updates

Any changes you make in Sanity Studio will appear on your website immediately after publishing!

---

## 🛠️ Sanity Studio Commands

**Start Studio**: Already running at http://localhost:3000/studio

**Deploy Studio** (optional):
```bash
npm run sanity:deploy
```

**Generate TypeScript types from schemas**:
```bash
npx sanity typegen generate
```

---

## 📊 Your Sanity Dashboard

Visit: https://sanity.io/manage

- Project ID: **7iqoebc8**
- Dataset: **production**

From here you can:
- Manage users and permissions
- View API usage
- Configure webhooks
- Export/Import data

---

## 💡 Tips

1. **Start with 4-8 products** to test the integration
2. **Use high-quality images** for better presentation
3. **Write clear descriptions** in Arabic for your Moroccan audience
4. **Set stock levels** to track inventory
5. **Use badges** to highlight new/popular products
6. **Add related products** to increase cross-selling

---

## 🐛 Troubleshooting

**Products not showing?**
- Make sure "نشط؟ (Active)" is checked ✅
- Verify you clicked "Publish" (not just "Save")
- Check if stock is > 0

**Images not loading?**
- Wait a few seconds for CDN to process
- Make sure images are under 5MB
- Try using JPG format

**Studio not loading?**
- Make sure dev server is running: `npm run dev`
- Try clearing browser cache

---

## 📞 Need Help?

Check Sanity documentation: https://www.sanity.io/docs

---

**Good luck managing your MR. MODE store! 🎉**
