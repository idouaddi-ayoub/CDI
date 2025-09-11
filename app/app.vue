<script setup lang="ts">
import AppLoaderCopy from "./components/AppLoaderCopy.vue";

useSeoMeta({
  title: "Digital Club & Innovation – Student Tech, Workshops & Hackathons",
  ogTitle: "Digital Club & Innovation – Empowering Students with Tech",
  ogType: "website",
  ogUrl: "https://www.cdiencga.com/",
  ogSiteName: "CDI",
  ogLocale: "en_MA",
  ogImage: "https://www.cdiencga.com/_nuxt/CDI_logo.png", // Change this to CDI_LOGO
  ogImageAlt: "CDI logo",
  description:
    "Empowering students through technology, innovation, and community. Join our tech talks & hands‑on workshops.",
  ogDescription:
    "Empowering students through technology, innovation, and community. Join our tech talks & hands‑on workshops.",
  twitterCard: "summary_large_image",
  twitterTitle: "Digital Club & Innovation – Student Tech Hub",
  twitterDescription:
    "Digital talks, workshops & a vibrant community for student innovators.",
  twitterImage: "https://www.cdiencga.com/_nuxt/CDI_logo.CzGvM_uW.png", // Change this to CDI_LOGO
  robots: "index, follow",
});
</script>
<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <AppLoaderCopy />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
