<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  icon: string;
}>();
</script>

<template>
  <div
    class="group relative rounded-2xl bg-[#011006] border border-green-900/30 p-7 transition-all hover:border-green-500/30 hover:bg-neutral-900/80 hover:shadow-lg hover:shadow-green-500/10"
  >
    <div
      class="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-green-500 bg-green-500 text-black shadow-lg shadow-green-500/20 transition-transform group-hover:scale-105"
    >
      <UIcon :name="icon" class="size-7" />
    </div>

    <h3 class="text-lg font-semibold text-white">
      {{ title }}
    </h3>

    <p class="mt-3 text-sm text-gray-500 leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>
