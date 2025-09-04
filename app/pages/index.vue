<script setup lang="ts">
import AboutUs from "./Home/aboutus.vue";
import Hero from "./Home/hero.vue";
import Events from "./Home/events.vue";
import Contact from "./Home/contactus.vue";
import Team from "./Home/team.vue";

definePageMeta({
  layout: "default",
});
</script>
<template>
  <Hero />
  <AboutUs />
  <Events />
  <Team />
  <Contact />
</template>
