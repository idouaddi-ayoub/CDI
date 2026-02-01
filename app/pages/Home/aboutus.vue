<script setup lang="ts">
import { UContainer } from "#components";
</script>
<template>
  <div class="relative flex justify-center items-center h-screen sm:h-fit p-5">
    <div class="text-center text-3xl sm:text-7xl font-bold sm:pt-20 sm:pb-20">
      About
      <span class="text-green-default">Us</span>
      <p class="text-lg sm:text-2xl pt-5 font-light">
        <span class="md:block">
          A community of digital innovators committed to
        </span>
        <span class="md:block"> empowering the next generation </span>
      </p>
      <UContainer
        class="flex flex-col sm:flex-row text-center sm:text-left justify-center items-center gap-10 mt-10"
      >
        <div class="pt-5">
          <img src="../../assets/webp/CDI_ENCGA.webp" class="rounded-2xl" />
        </div>
        <div class="flex flex-col gap-4 text-lg font-light sm:pt-10">
          <h1 class="font-bold">Club Digital & Innovation</h1>
          <span>
            Founded in 2018, Club Digital & Innovation (CDI) has grown from a
            small student initiative to a thriving community of creators,
            developers, and entrepreneurs passionate about technology and
            innovation.
          </span>
          <span class="hidden md:block">
            Our mission is to empower students through practical digital skills,
            industry connections, and collaborative projects that bridge the gap
            between academic knowledge and real-world applications.
          </span>
        </div>
      </UContainer>
    </div>
  </div>
</template>
