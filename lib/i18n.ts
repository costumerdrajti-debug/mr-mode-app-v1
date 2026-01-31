import translations from '@/app/i18n';

export async function getDictionary(lang: string) {
    return translations[lang as keyof typeof translations] || translations.ar;
}
