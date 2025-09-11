<script setup lang="ts">
import bgImg from "../../assets/webp/hero-bg.webp";

const heroRef = ref(null);
defineExpose({ heroRef });
</script>
<template>
  <div ref="heroRef" class="h-screen relative">
    <div
      class="absolute inset-0 bg-cover bg-center opacity-20"
      :style="{ backgroundImage: `url(${bgImg})` }"
    />
    <div
      class="absolute inset-x-0 h-full bg-gradient-to-t from-black to-transparent"
    ></div>

    <div
      class="relative z-10 flex justify-center items-center h-screen mr-10 ml-10"
    >
      <div class="text-center text-3xl sm:text-7xl font-bold">
        <h1 class="HeroHomeTitle">COMING<br /></h1>
        <p class="HeroHomeTitle text-green-default">SOON</p>

        <p class="HeroHomeTitle text-xl pt-10">Contact us</p>
        <div
          class="HeroHomeTitle flex justify-center items-center gap-4 md:text-left w-full pt-5"
        >
          <a
            target="_blank"
            href="https://www.linkedin.com/company/cdi.agency/"
            class="flex justify-center items-center"
          >
            <img
              src="../../assets/svg/linkedin.svg"
              class="w-8 transition-all duration-300 hover:brightness-200"
            />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/cdi.agency/"
            class="flex justify-center items-center"
          >
            <img
              src="../../assets/svg/instagram-1-svgrepo-com.svg"
              class="w-8 transition-all duration-300 hover:brightness-200"
          /></a>
          <a
            target="_blank"
            href="https://www.tiktok.com/@cdi.agency?_t=ZS-8zLOi7H3qoG&_r=1"
            class="flex justify-center items-center"
          >
            <img
              src="../../assets/svg/tiktok.svg"
              class="w-8 transition-all duration-300 hover:brightness-200"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>
