// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'ar'
});

export const config = {
  matcher: ['/', '/(en|ar)/:path*']
};