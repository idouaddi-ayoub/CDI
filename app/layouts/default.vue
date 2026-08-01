<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import Preloader from "@/components/Preloader.vue";
import CustomCursor from "@/components/CustomCursor.vue";
import ScrollProgress from "@/components/ScrollProgress.vue";
</script>

<template>
    <div>
        <Preloader />
        <CustomCursor />
        <Navigation />
        <ScrollProgress />
        <!-- `<slot />`, not `<NuxtPage />`: app.vue already renders the page
             inside <NuxtLayout>. Using NuxtPage here nests a second router
             view, which double-mounts every section and leaves ScrollTrigger
             measuring pins against duplicated geometry. -->
        <slot />
        <SiteFooter />
    </div>
</template>
