<script setup lang="ts">
import Hero from "./home/Hero.vue";
import Proof from "./home/Proof.vue";
import Event from "./home/Event.vue";
import Paths from "./home/Paths.vue";
import Contact from "./home/Contact.vue";

const { t } = useI18n();

const SECTIONS = ["hero", "proof", "event", "paths", "contact"] as const;

useScenePose([...SECTIONS]);

useSeoMeta({
    title: () => t("seo.home.title"),
    description: () => t("seo.home.description"),
});
</script>

<template>
    <div>
        <Hero />
        <Proof />
        <Event />
        <Paths />
        <Contact />
    </div>
</template>
