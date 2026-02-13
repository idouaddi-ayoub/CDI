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
    />

    <div
      class="relative z-10 flex justify-center items-center h-screen mr-10 ml-10"
    >
      <div class="text-center text-3xl sm:text-7xl font-bold">
        <h1 class="HeroHomeTitle">BECOME MORE WITH<br /></h1>
        <p class="HeroHomeTitle text-green-default">CDI ENCG Agadir</p>
        <p class="HeroHomeTitle text-lg sm:text-2xl pt-10">
          <span class="md:block">
            A community of digital innovators sharing experiences,
          </span>
          <span class="md:block">
            collaborating on projects, and growing together.
          </span>
        </p>
        <div
          class="flex HeroHomeTitle items-center justify-center flex-col sm:flex-row gap-5 pt-10 left-10 right-10"
        >
          <a href="/eday">
            <UButton
              size="xl"
              class="relative px-10 py-5 rounded-2xl font-semibold cursor-pointer text-black bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span class="relative z-10">Tickets sold out</span>
              <span
                class="absolute inset-0 rounded-2xl bg-green-400/30 blur-xl opacity-0 hover:opacity-100 transition"
              />
            </UButton>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
