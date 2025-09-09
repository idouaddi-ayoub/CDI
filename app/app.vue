<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt";
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
