<script setup lang="ts">
defineProps<{
  image: string;
  date: string;
  title?: string;
  subtitle: string;
  headline: string;
  description: string;
  points: string[];
  quote: string;
  quoteAuthor: string;
}>();
</script>

<template>
  <UContainer
    class="flex flex-col md:flex-row bg-black/60 rounded-xl border border-gray-700 overflow-hidden backdrop-blur-lg !px-0 h-full"
    ><div class="flex flex-col sm:flex-row h-full">
      <div class="lg:w-[55%] relative">
        <div class="relative aspect-[4/4] lg:h-full w-full">
          <img
            :src="image"
            alt="AJYAL ALHOUDA Collab"
            class="absolute inset-0 h-full object-cover object-center"
          />
        </div>
      </div>

      <div class="md:w-[45%] p-6 flex flex-col">
        <UBadge
          :label="date"
          class="bg-green-600/20 text-green-400 px-4 py-1 rounded-full w-fit mb-4"
        />

        <h2 class="text-2xl font-bold mb-2">
          <slot name="title">{{ title }}</slot>
        </h2>

        <p class="font-semibold mb-4">
          {{ subtitle }}
        </p>

        <p class="text-gray-200 mb-6">
          {{ description }}
        </p>

        <p class="text-2xl font-bold text-gray-200 mb-6">
          {{ headline }}
        </p>

        <div class="space-y-2 mb-6">
          <div
            v-for="(point, i) in points"
            :key="i"
            class="flex items-start gap-2"
          >
            <UIcon
              name="solar:check-circle-line-duotone"
              class="text-green-500 mt-1"
            />
            <span class="text-gray-200">{{ point }}</span>
          </div>
        </div>

        <blockquote
          class="border-l-4 border-green-500 pl-4 italic text-gray-400"
        >
          “{{ quote }}”
          <footer class="mt-2 text-sm font-semibold">
            — {{ quoteAuthor }}
          </footer>
        </blockquote>
      </div>
    </div>
  </UContainer>
</template>
