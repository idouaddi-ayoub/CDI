// https://nuxt.com/docs/api/configuration/nuxt-config
import { visualizer } from "rollup-plugin-visualizer";
import { checkEnv } from "./config/env.config";
checkEnv(process.env);

export default defineNuxtConfig({
  compatibilityDate: "2026-07-24",
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  typescript: { typeCheck: true },
  modules: ["@nuxt/ui", "@nuxt/image", "@nuxtjs/i18n", "@tresjs/nuxt"],
  icon: {
    serverBundle: {
      collections: ["lucide", "simple-icons"],
    },
  },
  extends: ["./layers/auth"],
  css: ["~/assets/css/main.css", "lenis/dist/lenis.css"],
  colorMode: {
    preference: "dark",
  },
  routeRules: {
    "/": { prerender: true },
  },
  vite: {
    build: {
      rollupOptions: {
        plugins: [
          visualizer({
            open: false,
            filename: "stats.html",
            gzipSize: true,
          }),
        ],
      },
    },
    optimizeDeps: {
      include: [
        "@vercel/analytics/vue",
        "@vercel/speed-insights/vue",
        "gsap",
        "zod",
      ],
    },
  },
  runtimeConfig: {
    public: {
      aws: {
        s3BucketName: process.env.NUXT_PUBLIC_S3_BUCKET,
        s3Region: process.env.NUXT_PUBLIC_S3_REGION,
      },
      supabase: {
        url: process.env.NUXT_PUBLIC_SUPABASE_URL,
      },
    },
    aws: {
      s3AccessKeyId: process.env.NUXT_S3_ACCESS_KEY_ID,
      s3SecretAccessKey: process.env.NUXT_S3_SECRET_ACCESS_KEY,
      s3Endpoint: process.env.NUXT_S3_ENDPOINT,
    },
  },
  i18n: {
    locales: [
      { code: "en", language: "en-US" },
      { code: "fr", language: "fr-FR" },
    ],
    defaultLocale: "en",
  },
  app: {
    head: {
      title: "CDI",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        // The hero headline is the largest element on the page and pinned
        // sections measure their height from it, so the font must land before
        // first paint — otherwise every pin position is computed against
        // fallback metrics and re-measured on swap.
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/fonts/space-grotesk/SpaceGrotesk-latin.woff2",
          crossorigin: "anonymous",
        },
      ],
      //       script: [
      //         {
      //           innerHTML: `
      //             !function (w, d, t) {
      //   w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
      // var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
      // ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
      //   ttq.load('D677VBJC77UB9P1M6ADG');
      //   ttq.page();
      // }(window, document, 'ttq');
      //           `,
      //           type: "text/javascript",
      //         },
      //       ],
      //       noscript: [
      //         {
      //           innerHTML: `<img height="1" width="1" style="display:none" src="https://analytics.tiktok.com/i18n/pixel/events.js?pixel_id=D677VBJC77UB9P1M6ADG&track=PageView&noscript=1" />`,
      //         },
      //       ],
    },
  },
});
