<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt";
</script>
<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <Analytics />
    <NuxtLayout>
      <Analytics />
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
