<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";

const items: AccordionItem[] = [
  {
    label: "Is Eday Event free to attend?",
    content:
      "Yes. Eday Event is completely free for students and early registrants, subject to capacity.",
  },
  {
    label: "Who can attend Eday Event?",
    content:
      "Students, developers, designers, entrepreneurs, and professionals interested in tech and innovation.",
  },
  {
    label: "Will sessions be recorded?",
    content: "Selected sessions will be recorded and shared after the event.",
  },
  {
    label: "Is there parking available at the venue?",
    content: "Yes, limited parking is available near the venue.",
  },
  {
    label: "Can I attend only part of the event?",
    content: "Yes. You are free to join or leave at any time during the day.",
  },
  {
    label: "How can I become a sponsor or partner?",
    content: "You can contact us via the official Eday Event email ",
  },
];
</script>

<template>
  <section
    id="faq"
    class="py-24 sm:py-32 bg-black"
    aria-labelledby="faq-heading"
  >
    <div class="mx-auto max-w-3xl px-5 sm:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <span
          class="inline-block rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 text-sm font-semibold text-green-400 mb-6"
        >
          FAQ
        </span>

        <h2
          id="faq-heading"
          class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
        >
          Got <span class="text-green-400">questions?</span>
        </h2>
      </div>

      <UAccordion
        :items="items"
        class="space-y-3"
        :ui="{
          item: 'rounded-2xl border border-green-900/30 bg-[#011006] overflow-hidden glow-green',
          header:
            'flex w-full items-center justify-between p-5 sm:p-6 text-left hover:bg-green-900/10 transition-colors',
          body: 'px-5 sm:px-6 pb-5 text-gray-400 leading-relaxed',
        }"
      >
        <template #body="{ item }">
          <span class="text-sm text-white pr-4">
            {{ item.content }}
          </span>

          <UIcon
            name="uil:chevron-down"
            class="size-5 text-green-500 transition-transform"
            :class="'rotate-180'"
          />
        </template>
      </UAccordion>
    </div>
  </section>
</template>
