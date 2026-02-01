<script setup>
import { ref, onMounted, watchEffect } from "vue";
import preLoaderVideo from "../assets/webm/Pre-Loader.mp4";

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
    class="fixed inset-0 z-[9999] flex object-cover justify-center items-stretch bg-black"
  >
    <video id="loader-video" autoplay muted @ended="handleVideoEnd">
      <source :src="preLoaderVideo" type="video/mp4" />
    </video>
  </div>

  <div v-else>
    <slot />
  </div>
</template>
