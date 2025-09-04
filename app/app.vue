<script setup lang="ts">
import AppLoaderCopy from "./components/AppLoaderCopy.vue";
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
