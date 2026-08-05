<script setup lang="ts">
import type { Link } from "@unhead/vue";
import { SITE_URL } from "@/utils/links";
// import { Analytics } from "@vercel/analytics/vue";
const { t, locale } = useI18n();
const localePath = useLocalePath();

// Every text value is a getter, not a plain string: switching locale is a
// client-side navigation, so these have to re-resolve rather than keep the
// copy that was rendered at build time.
useSeoMeta({
    title: "CDI",
    ogTitle: () => t("seo.site.ogTitle"),
    ogType: "website",
    ogUrl: () => SITE_URL + localePath("/"),
    ogSiteName: "CDI",
    ogLocale: () => (locale.value === "fr" ? "fr_MA" : "en_MA"),
    ogImage: `${SITE_URL}/_nuxt/CDI.BM5KS8x2.png`,
    ogImageAlt: () => t("seo.site.imageAlt"),
    description: () => t("seo.site.description"),
    ogDescription: () => t("seo.site.description"),
    twitterCard: "summary_large_image",
    twitterTitle: () => t("seo.site.twitterTitle"),
    twitterDescription: () => t("seo.site.twitterDescription"),
    twitterImage: `${SITE_URL}/_nuxt/CDI.BM5KS8x2.png`,
    robots: "index, follow",
});

// @nuxtjs/i18n sets no head tags on its own. This is what makes the active
// locale real to crawlers and screen readers: <html lang>, plus hreflang
// alternates pairing / with /fr. Its og:locale meta is skipped — useSeoMeta
// above already owns that tag — and the cast bridges the module's link type,
// which is looser than unhead's.
const localeHead = useLocaleHead();
useHead(() => ({
    htmlAttrs: localeHead.value.htmlAttrs,
    link: localeHead.value.link as unknown as Link[],
}));

useHead({
    script: [
        {
            innerHTML: "document.documentElement.classList.add('js')",
            tagPosition: "head",
        },
    ],
});
</script>
<template>
    <UApp>
        <NuxtRouteAnnouncer />
        <!-- <Analytics /> -->
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
