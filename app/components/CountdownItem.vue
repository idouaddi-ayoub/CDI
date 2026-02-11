<script setup lang="ts">
defineProps<{
  value: number;
  label: string;
}>();
</script>

<template>
  <div class="text-center min-w-[64px]">
    <div class="text-2xl font-bold">
      {{ value }}
    </div>
    <div class="text-xs text-green-400/60 mt-1">
      {{ label }}
    </div>
  </div>
</template>
