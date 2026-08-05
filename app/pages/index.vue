<script setup lang="ts">
import Hero from "./home/Hero.vue";
import Paths from "./home/Paths.vue";
import Proof from "./home/Proof.vue";
import Event from "./home/Event.vue";
import Contact from "./home/Contact.vue";

const revealScope = useTemplateRef<HTMLElement>("revealScope");
useScrollReveal(revealScope);

const { t } = useI18n();

useSeoMeta({
    title: () => t("seo.home.title"),
    description: () => t("seo.home.description"),
});
</script>

<template>
    <main ref="revealScope">
        <Hero />
        <Paths />
        <Proof />
        <Event />
        <Contact />
    </main>
</template>
