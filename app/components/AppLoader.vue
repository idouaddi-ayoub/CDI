<script setup>
import { ref, onMounted, watchEffect } from "vue";

const isLoading = ref(true);

onMounted(() => {
  const video = document.getElementById("loader-video");

  if (video) {
    video.addEventListener("ended", () => {
      isLoading.value = false;
    });
  } else {
    isLoading.value = false;
  }

  // Disable scroll while loader is active
  watchEffect(() => {
    if (isLoading.value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });
});

const handleVideoEnd = () => {
  isLoading.value = false;
};
</script>

<template>
  <div
    v-if="isLoading"
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
  >
    <video id="loader-video" autoplay muted @ended="handleVideoEnd">
      <source src="/mp4/videoplayback.mp4" type="video/mp4" />
    </video>
  </div>

  <div v-else>
    <slot />
  </div>
</template>
