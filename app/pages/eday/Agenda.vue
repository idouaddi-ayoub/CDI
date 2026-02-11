<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";

const items = ref<AccordionItem[]>([
  {
    label: "Morning",
    rows: [
      {
        time: "08:30 – 09:00",
        title: "Registration & Welcome Coffee",
        badge: { label: "Break", color: "warning" },
      },
      {
        time: "09:00 – 09:30",
        title: "Opening Ceremony",
        speaker: "Organizing Committee",
        badge: { label: "Keynote", color: "primary" },
      },
      {
        time: "09:30 – 10:15",
        title: "The Future of AI in North Africa",
        speaker: "Dr. Amina El-Fassi",
        badge: { label: "Keynote", color: "primary" },
      },
      {
        time: "10:15 – 10:30",
        title: "Coffee Break",
        badge: { label: "Break", color: "warning" },
      },
      {
        time: "10:30 – 12:00",
        title: "Building Your First SaaS Product",
        speaker: "Youssef Benali",
        badge: { label: "Workshop", color: "secondary" },
      },
    ],
  },
  {
    label: "Afternoon",
    rows: [
      {
        time: "12:00 – 13:00",
        title: "Lunch & Networking",
        badge: { label: "Networking", color: "info" },
      },
      {
        time: "13:00 – 13:45",
        title: "From Student to Startup Founder",
        speaker: "Leila Cherkaoui",
        badge: { label: "Keynote", color: "primary" },
      },
      {
        time: "13:45 – 15:15",
        title: "Full-Stack Development with Modern Tools",
        speaker: "Karim Bouzid",
        badge: { label: "Workshop", color: "secondary" },
      },
      {
        time: "15:15 – 15:30",
        title: "Afternoon Break",
        badge: { label: "Break", color: "warning" },
      },
      {
        time: "15:30 – 16:30",
        title: "Design Thinking in Practice",
        speaker: "Multiple speakers",
        badge: { label: "Panel", color: "info" },
      },
    ],
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
        <template #body="{ item }">
          <div class="space-y-4">
            <UContainer
              v-for="(row, i) in item.rows"
              :key="i"
              class="rounded-2xl bg-[#011006] border border-green-900/30 p-4"
            >
              <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                <span class="text-sm font-mono text-green-400/70 min-w-[120px]">
                  {{ row.time }}
                </span>

                <div class="flex-1 text-white font-medium">
                  {{ row.title }}
                </div>

                <UBadge
                  size="sm"
                  variant="outline"
                  :color="row.badge.color"
                  class="self-start sm:self-center rounded-2xl"
                >
                  {{ row.badge.label }}
                </UBadge>
              </div>
            </UContainer>
          </div>
        </template>
      </UAccordion>
    </div>
  </section>
</template>
