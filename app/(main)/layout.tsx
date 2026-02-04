import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "../globals.css";
import ClientLayout from "@/components/ClientLayout";
import Analytics from "@/components/Analytics";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const tajawal = Tajawal({
    variable: "--font-tajawal",
    subsets: ["arabic"],
    weight: ["400", "500", "700", "800"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Mr. Mode | ملابس رجالية فاخرة - الحي الحسني، الدار البيضاء",
    description: "متجر Mr. Mode للأزياء الرجالية الفاخرة في الحي الحسني، الدار البيضاء. بدل، قمصان، أحذية وإكسسوارات بجودة عالية. توصيل لجميع مدن المغرب. الدفع عند الاستلام.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ar" dir="rtl" suppressHydrationWarning>
            <body className={`${inter.variable} ${tajawal.variable} font-sans antialiased bg-black text-white`}>
                <Analytics />
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
