<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";

const items = ref<AccordionItem[]>([
  {
    label: "Morning",
  },
  {
    label: "Afternoon",
  },
]);
</script>
<template>
  <section
    id="agenda"
    class="relative py-24 sm:py-32 bg-gradient-to-b from-green-950 to-black"
  >
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <UAccordion
        :items="items"
        type="multiple"
        class="p-4 rounded-3xl bg-green-dark"
        :ui="{ label: 'text-xl font-semibold' }"
      >
      </UAccordion>
    </div>
  </section>
</template>
