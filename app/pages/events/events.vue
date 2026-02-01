<script setup lang="ts">
import { UBadge, UContainer, UIcon } from "#components";
import EDAY_MOVIE from "../../assets/webm/Cdi-movie.webm";

const items = [
  "assets/webp/DSC07550.webp",
  "assets/webp/DSC07564.webp",
  "assets/webp/DSC07803.webp",
  "assets/webp/DSC07911.webp",
  "assets/webp/DSC07975.webp",
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
              class="bg-green-600/20 text-xl text-green-400 px-4 py-1 rounded-full w-fit mb-4"
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

          <div class="flex mt-5 justify-between p-4">
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
                  name="solar:map-point-broken"
                  class="size-5 text-green-700"
                />
                <div>
                  <p class="font-semibold text-gray-500">Location</p>
                  <p class="font-bold">ENCG Agadir</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-1 rounded-2xl border border-gray-600 bg-black/50 backdrop-blur-lg p-5"
        >
          <video
            :src="EDAY_MOVIE"
            poster="../../assets/webp/thumbnail.webp"
            controls
            playsinline
            controlsList="nofullscreen"
            class="w-full h-full rounded-lg object-cover shadow-lg"
          />
        </div>
      </UContainer>
      <UContainer class="p-5 pb-10">
        <UCarousel v-slot="{ item }" dots :items="items" class="max-w-full">
          <div
            class="flex justify-center items-center w-full h-full aspect-video transition-transform duration-500 ease-in-out transform hover:scale-105"
            style="will-change: transform; transform: translateZ(0)"
          >
            <img
              :src="item"
              class="w-full h-full object-cover rounded-2xl"
              alt="carousel image"
              loading="lazy"
            />
          </div>
        </UCarousel>
      </UContainer>
    </div>
  </div>
</template>
