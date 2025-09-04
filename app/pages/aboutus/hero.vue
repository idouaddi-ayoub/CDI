<script setup lang="ts">
import bgImg from "../../assets/webp/BackgroundAboutUs.webp";
</script>
<template>
  <div class="h-[75vh] relative">
    <div
      class="absolute inset-0 bg-cover bg-right opacity-20"
      :style="{ backgroundImage: `url(${bgImg})` }"
    />
    <div
      class="absolute inset-x-0 h-full bg-gradient-to-t from-black to-transparent"
    ></div>

    <div
      class="relative z-10 flex justify-center items-center h-[75vh] mr-10 ml-10"
    >
      <div class="text-center text-3xl sm:text-7xl font-bold">
        What We <span class="text-green-default">Do</span>
        <p class="text-lg sm:text-2xl pt-10">
          <span class="md:block font-light">
            Discover our events, initiatives, and collaborations that drive
            innovation and community engagement.
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
