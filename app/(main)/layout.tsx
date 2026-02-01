import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import ClientLayout from "@/components/ClientLayout";

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
            <head>
                {/* Facebook Pixel */}
                <Script id="fb-pixel" strategy="afterInteractive">
                    {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `}
                </Script>
            </head>
            <body className={`${inter.variable} ${tajawal.variable} font-sans antialiased bg-black text-white`}>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
