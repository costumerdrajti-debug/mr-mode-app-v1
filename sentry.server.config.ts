import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, // قم بتعيين DSN من متغيرات البيئة
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV,
});
