import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';


const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  productionBrowserSourceMaps: true,
  // Minimal, broadly-compatible security headers. Tweak directives as you harden CSP.
  async headers() {
    return [
      {
        // Apply these headers to all routes and static assets
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; img-src 'self' data: https:; connect-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' https: data:; frame-ancestors 'none';",
          },
          {
            // Report-only entry to start collecting Trusted Types issues without blocking.
            key: "Content-Security-Policy-Report-Only",
            value:
              "require-trusted-types-for 'script'; report-uri /__csp_report__",
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);