<script setup lang="ts">
import { UBadge, UContainer, UIcon } from "#components";
</script>
<template>
  <div
    class="relative bg-gradient-to-b to-green-dark flex justify-center items-center"
  >
    <div
      class="text-center text-3xl sm:text-7xl font-bold sm:pt-20 sm:pb-20 p-5 pb-10"
    >
      Our
      <span class="text-green-default">Events</span>
      <p class="text-lg sm:text-2xl pt-5 font-light">
        <span class="md:block"> Learn, connect, and grow—through events </span>
        <span class="md:block"> shaped by our community. </span>
      </p>
      <UContainer
        class="flex flex-col sm:flex-row bg-black rounded-4xl text-center sm:text-left justify-center items-center gap-10 p-10 mt-10"
      >
        <div class="flex-1 flex-col text-lg font-light">
          <div class="flex justify-center md:justify-start">
            <UBadge label="OUR LAST EVENT" class="font-bold text-xl w-fit" />
          </div>
          <h1 class="text-4xl font-bold mt-5 mb-5">E-DAY 3.0</h1>
          <div>
            <span class="md:block text-lg">
              EDAY is our flagship event bringing together industry
            </span>
            <span class="md:block text-">
              professionals, developers, designers, and enthusiasts
            </span>
            <span class="md:block text-lg">
              for a day of learning and networking.
            </span>
          </div>
          <a href="/events">
            <UButton
              class="mt-5 cursor-pointer"
              label="See more"
              color="primary"
            />
          </a>
        </div>
        <div class="flex-1">
          <img src="../../assets/webp/thumbnail.webp" class="rounded-2xl" />
        </div>
      </UContainer>
    </div>
  </div>
</template>
