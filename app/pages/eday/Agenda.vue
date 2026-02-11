<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";

const items = ref<AccordionItem[]>([
  {
    label: "Agenda",
    rows: [
      {
        time: "13:30",
        title: "Ticket Validation & Check-in",
        badge: { label: "Check-in", color: "warning" },
      },
      {
        time: "14:00",
        title: "Opening Ceremony",
        badge: { label: "Opening", color: "success" },
      },
      {
        time: "14:30",
        title: "Talks & Presentations",
        badge: { label: "Conference", color: "primary" },
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
