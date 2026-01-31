// ============================================
// 📁 components/HeroWithSoldOut.tsx
// ============================================

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface HeroProduct {
    title: string
    originalPrice: number
    salePrice: number
    imageUrl: string
    soldOut: boolean
    soldInHours?: number
}

export default function HeroWithSoldOut({ t, lang }: any) {
    const [email, setEmail] = useState('')
    const [notified, setNotified] = useState(false)

    // ✅ المنتج المميز اللي "نفد"
    const featuredProduct: HeroProduct = {
        title: "Premium Leather Jacket - Limited Edition",
        originalPrice: 1299,
        salePrice: 799,
        imageUrl: "/hero-jacket.jpg", // حط صورة jacket واعر هنا
        soldOut: true,
        soldInHours: 18
    }

    const handleNotify = (e: React.FormEvent) => {
        e.preventDefault()
        // هنا تقدر تزيد API call لـ email list
        setNotified(true)
        setTimeout(() => setNotified(false), 3000)
    }

    const discount = Math.round(((featuredProduct.originalPrice - featuredProduct.salePrice) / featuredProduct.originalPrice) * 100)

    return (
        <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {/* ...existing code... */}
        </section>
    )
}
