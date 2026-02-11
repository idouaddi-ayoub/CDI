<script setup lang="ts">
import Hero from "../eday/Hero.vue";
import About from "../eday/About.vue";
import Attend from "../eday/Attend.vue";
import Agenda from "../eday/Agenda.vue";
import Guests from "../eday/Guests.vue";
import FAQ from "../eday/FAQ.vue";

definePageMeta({
  layout: "default",
});
</script>
<template>
  <Hero />
  <About />
  <Attend />
  <Agenda />
  <Guests />
  <FAQ />
</template>
