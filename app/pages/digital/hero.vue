<script setup lang="ts">
import bgImg from "../../assets/webp/CDI_bg.webp";

const heroRef = ref(null);
defineExpose({ heroRef });
</script>
<template>
  <div ref="heroRef" class="h-[70vh] relative">
    <div
      class="absolute inset-0 bg-cover bg-center opacity-20"
      :style="{ backgroundImage: `url(${bgImg})` }"
    />
    <div
      class="absolute inset-x-0 h-full bg-gradient-to-t from-black to-transparent"
    ></div>

    <div class="relative flex justify-center items-center h-[75vh] mr-10 ml-10">
      <div class="text-center text-3xl sm:text-7xl font-bold">
        <h1 class="HeroHomeTitle">GET YOUR DIGITAL<br /></h1>
        <p class="HeroHomeTitle text-green-default">PRODUCTS</p>
        <p class="HeroHomeTitle text-lg sm:text-2xl pt-10">
          <span class="md:block">
            Empowering creators with the tools, knowledge,
          </span>
          <span class="md:block">
            and community to build, share, and grow together.
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
