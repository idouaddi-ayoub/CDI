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
          class="HeroHomeButon flex items-center justify-center flex-col sm:flex-row gap-5 pt-10 left-10 right-10"
        >
          <a class="HeroHomeTitle" href="/digital">
            <UButton
              label="Get Free Canva Pro"
              size="xl"
              class="flex items-center cursor-pointer scale-75 sm:scale-125 justify-center bg-gradient-to-r from-[#633FE8] to-[#00C2CD] border-gray-400 hover:sm:scale-150 duration-300 transition-all"
            >
              <template #trailing>
                <img src="/ico/canva.ico" alt="Custom Icon" class="w-10 h-10" />
              </template>
            </UButton>
          </a>
          <!-- <UButton
            label="Join Us"
            size="xl"
            variant="ghost"
            class="justify-center border border-white/5 w-full"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>
