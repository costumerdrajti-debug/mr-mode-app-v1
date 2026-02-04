// lib/analytics.ts

// Google Analytics
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Facebook Pixel
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

// Track page views
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// Track events
export const event = ({ action, category, label, value }: {
    action: string;
    category: string;
    label?: string;
    value?: number;
}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Facebook Pixel events
export const fbEvent = (eventName: string, data?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', eventName, data);
    }
};

// Track product view
export const trackProductView = (product: {
    id: string;
    name: string;
    price: number;
    category?: string;
}) => {
    event({
        action: 'view_item',
        category: 'ecommerce',
        label: product.name,
        value: product.price,
    });

    fbEvent('ViewContent', {
        content_ids: [product.id],
        content_name: product.name,
        content_type: 'product',
        value: product.price,
        currency: 'MAD',
    });
};

// Track WhatsApp order
export const trackWhatsAppOrder = (product: {
    id: string;
    name: string;
    price: number;
}) => {
    event({
        action: 'begin_checkout',
        category: 'ecommerce',
        label: product.name,
        value: product.price,
    });

    fbEvent('InitiateCheckout', {
        content_ids: [product.id],
        content_name: product.name,
        value: product.price,
        currency: 'MAD',
    });
};

// Track contact form submission
export const trackContactSubmit = () => {
    event({
        action: 'submit_form',
        category: 'engagement',
        label: 'contact_form',
    });

    fbEvent('Contact');
};

// Declare gtag and fbq types
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        fbq?: (...args: any[]) => void;
    }
}
