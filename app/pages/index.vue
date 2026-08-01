<script setup lang="ts">
import Hero from "./home/Hero.vue";
import Paths from "./home/Paths.vue";
import Proof from "./home/Proof.vue";
import Event from "./home/Event.vue";
import Contact from "./home/Contact.vue";

const revealScope = useTemplateRef<HTMLElement>("revealScope");
useScrollReveal(revealScope);

useSeoMeta({
    title: "CDI ENCG Agadir — Become more with a student tech club",
    description:
        "A student-run digital club in Agadir. Join to build real skills, or work with us on your next digital project.",
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
