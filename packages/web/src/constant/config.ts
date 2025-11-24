const prodUrl = process.env.VERCEL_PROD_URL
    ? process.env.VERCEL_PROD_URL
    : 'http://localhost:3000'

export const CONFIG = {
    libName: 'Fetch',
    siteName: 'Fetch - Type-Safe, Fluent HTTP Client.',
    authorName: 'freestylejs',
    repoUrl: 'https://github.com/freestylejs/fetch',
    siteUrl: prodUrl,
    mainBannerUrl: '/fetch-banner.png',
    supportedLang: [
        'en',
        // 'ko'
    ],
    majorLang: 'en',
} as const
