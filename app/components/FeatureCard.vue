<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  icon: string;
}>();
</script>
<template>
  <div
    class="group rounded-2xl border border-green-900/40 bg-green-dark p-6 transition-all hover:border-green-500/30 hover:bg-neutral-900/80 hover:shadow-lg hover:shadow-green-500/10"
  >
    <div
      class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-green-500 bg-green-500 text-black shadow-lg shadow-green-500/20"
    >
      <UIcon :name="icon" class="size-6" />
    </div>

    <h3 class="text-lg font-semibold text-white">
      {{ title }}
    </h3>

    <p class="mt-2 text-sm text-gray-500 leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>
