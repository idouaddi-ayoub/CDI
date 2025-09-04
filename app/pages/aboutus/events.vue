<script setup lang="ts">
import { UBadge, UContainer, UIcon } from "#components";
const items = [
  "https://picsum.photos/640/640?random=1",
  "https://picsum.photos/640/640?random=2",
  "https://picsum.photos/640/640?random=3",
  "https://picsum.photos/640/640?random=4",
  "https://picsum.photos/640/640?random=5",
  "https://picsum.photos/640/640?random=6",
];
</script>
<template>
  <div
    class="relative bg-gradient-to-b to-green-dark flex justify-center items-center"
  >
    <div
      class="text-center text-3xl sm:text-7xl font-bold sm:pt-20 sm:pb-20 p-5 pb-10 pt-10"
    >
      Our Last
      <span class="text-green-default">Event</span>

      <UContainer
        class="flex flex-col sm:flex-row rounded-4xl text-left sm:text-left justify-center items-stretch gap-10 p-10 mt-5 !px-0"
      >
        <div
          class="flex-1 flex-col text-lg font-light rounded-2xl border-1 border-gray-600 bg-black/50 backdrop-blur-lg p-5"
        >
          <div class="flex md:justify-start">
            <UBadge
              label="CONFERENCE"
              class="font-semibold text-xl text-white"
            />
          </div>
          <h1 class="text-4xl font-bold mt-5 mb-5">E-DAY 3.0</h1>
          <div>
            <span class="md:block text-lg">
              E-Day is an event by CDI Club Digital at ENCG Agadir focusing on
              e-commerce and personal branding, featuring conferences and
              interactive workshops. Participants valued the networking
              opportunities with professionals and encouraged others to attend
              future club events.
            </span>
          </div>

          <div class="flex mt-5 justify-around p-4">
            <div class="flex md:block">
              <div class="flex items-center gap-4">
                <UIcon
                  name="solar:calendar-line-duotone"
                  class="size-5 text-green-700"
                />
                <div>
                  <p class="font-semibold text-gray-500">Date</p>
                  <p class="font-bold">March 25, 2023</p>
                </div>
              </div>
            </div>
            <div class="flex md:block">
              <div class="flex items-center gap-4">
                <UIcon
                  name="solar:calendar-line-duotone"
                  class="size-5 text-green-700"
                />
                <div>
                  <p class="font-semibold text-gray-500">Date</p>
                  <p class="font-bold">March 25, 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1">
          <img src="../../assets/webp/aboutus-img.webp" class="rounded-2xl" />
        </div>
      </UContainer>
      <UContainer
        class="flex-1 flex-col text-lg font-light rounded-2xl border-1 border-gray-600 bg-black/50 backdrop-blur-lg p-5 w-fit h-fit"
      >
        <div class="flex md:justify-start">
          <UBadge
            label="EVENT GALLERY"
            class="font-semibold text-xl text-white"
          />
        </div>
        <UContainer class="p-5 pb-10">
          <UCarousel v-slot="{ item }" dots :items="items" class="max-w-full">
            <div class="flex justify-center items-center w-full h-full">
              <img :src="item" class="rounded-lg" />
            </div>
          </UCarousel>
        </UContainer>
      </UContainer>
    </div>
  </div>
</template>
