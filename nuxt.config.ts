// https://nuxt.com/docs/api/configuration/nuxt-config
import { visualizer } from "rollup-plugin-visualizer";
import { checkEnv } from "./config/env.config";
import { SITE_URL } from "./app/utils/links";
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
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@tresjs/nuxt",
    "@nuxt/hints",
    "@nuxtjs/seo",
    "@vercel/speed-insights",
  ],
  icon: {
    serverBundle: {
      collections: ["lucide", "simple-icons", "circle-flags"],
    },
  },
  extends: ["./layers/auth"],
  css: ["~/assets/css/main.css", "lenis/dist/lenis.css"],
  colorMode: {
    preference: "dark",
  },
  site: {
    url: "https://www.cdiencga.com",
    name: "CDI ENCGA",
  },
  schemaOrg: {
    identity: {
      type: "Organization",
      name: "CDI",
      alternateName: "CDI ENCG Agadir",
      logo: "/CDI_logo.svg",
      url: SITE_URL,
      email: "wailsebbar2005@gmail.com",
      telephone: "+212637519218",
      foundingDate: "2018",
      description:
        "A student-run digital club in Agadir. Join to build real skills, or work with us on your next digital project.",
      contactPoint: [
        {
          contactType: "customer support",
          telephone: "+212637519218",
          availableLanguage: ["English", "French"],
        },
      ],
      address: {
        addressLocality: "Agadir",
        addressRegion: "Souss-Massa",
        addressCountry: "MA",
      },
      sameAs: [
        "https://www.instagram.com/cdi_encgagadir/",
        "https://www.linkedin.com/company/cdi-encg-agadir/",
        "https://www.tiktok.com/@cdi_encgagadir",
        "https://web.facebook.com/cdi.encga",
      ],
    },
  },
  linkChecker: {
    failOnError: true,
  },
  robots: {
    groups: [
      {
        userAgent: "*",
        allow: "/",
        contentUsage: {
          "train-ai": "n",
        },
      },
    ],
    sitemap: ["/sitemap.xml"],
  },
  routeRules: {
    "/": { prerender: false },
    "/en": { prerender: false },
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ["/", "/en"],
    },
  },
  build: {
    transpile: ["gsap"],
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
    baseUrl: SITE_URL,
    locales: [
      { code: "en", language: "en-MA" },
      { code: "fr", language: "fr_MA" },
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      alwaysRedirect: true,
    },
  },
  app: {
    head: {
      title: "CDI",

      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },

        {
          rel: "preload",
          as: "font",
          type: "font/otf",
          href: "/fonts/Fontspring-DEMO-anguitasans-blackit.otf",
          crossorigin: "anonymous",
        },
      ],
      script: [
        {
          innerHTML: `
                  !function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
      var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
      ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
        ttq.load('D677VBJC77UB9P1M6ADG');
        ttq.page();
      }(window, document, 'ttq');
                `,
          type: "text/javascript",
        },
      ],
      noscript: [
        {
          innerHTML: `<img height="1" width="1" style="display:none" src="https://analytics.tiktok.com/i18n/pixel/events.js?pixel_id=D677VBJC77UB9P1M6ADG&track=PageView&noscript=1" />`,
        },
      ],
    },
  },
});
