import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, // قم بتعيين DSN في متغير البيئة NEXT_PUBLIC_SENTRY_DSN
    tracesSampleRate: 1.0, // نسبة تتبع الأداء (يمكنك تقليلها لاحقاً)
    environment: process.env.NODE_ENV,
});
