<script setup lang="ts">
import { Analytics } from "@vercel/analytics/vue";
import type { Link, Meta } from "@unhead/vue";

const { t } = useI18n();
const localeHead = useLocaleHead();

useHead(() => ({
    htmlAttrs: localeHead.value.htmlAttrs,
    link: localeHead.value.link as unknown as Link[],
    meta: localeHead.value.meta as unknown as Meta[],
}));

useSeoMeta({
    title: "CDI",
    description: () => t("seo.site.description"),
    ogType: "website",
    ogSiteName: "CDI",
    ogTitle: () => t("seo.site.ogTitle"),
    ogDescription: () => t("seo.site.description"),
    ogImageAlt: () => t("seo.site.imageAlt"),
    twitterCard: "summary_large_image",
    twitterTitle: () => t("seo.site.twitterTitle"),
    twitterDescription: () => t("seo.site.twitterDescription"),
});

defineOgImage("CDI.takumi", {
    title: t("seo.ogImage.title"),
    description: t("seo.ogImage.description"),
    footer: t("seo.ogImage.footer"),
});
</script>

<template>
    <UApp>
        <NuxtRouteAnnouncer />
        <Analytics />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
