<script setup lang="ts"></script>
<template>
  <div class="bg-gradient-to-b from-green-dark to-black p-4">
    <div class="text-center text-3xl sm:text-5xl font-bold pb-10">
      Our
      <span class="text-green-default">Collaborations</span>
    </div>
    <UContainer
      class="flex flex-col sm:flex-row rounded-4xl text-left sm:text-left justify-center items-stretch gap-10 p-10 !px-0"
    >
      <div
        class="flex-1 flex flex-col text-lg font-light rounded-2xl border border-gray-600 bg-black/50 backdrop-blur-lg"
      >
        <div>
          <img
            src="../../assets/webp/Etsy.webp"
            class="rounded-t-2xl border-t border-l border-r border-gray-600"
          />
        </div>

        <div class="p-5">
          <div class="flex md:justify-start">
            <UBadge
              label="WORKSHOP"
              class="bg-green-600/20 text-xl text-green-400 px-4 py-1 rounded-full w-fit mb-4"
            />
          </div>
          <h1 class="text-4xl font-bold mt-5 mb-5">Etsy from 0 to Hero</h1>
          <span class="md:block text-lg">
            An inspiring workshop hosted at ENCG Agadir by @brahimamribet1,
            offering valuable insights into mastering the Etsy marketplace and
            building a successful online business from scratch.
          </span>
        </div>

        <div class="flex p-4 mt-auto">
          <div class="flex items-center gap-4">
            <UIcon
              name="solar:map-point-broken"
              class="size-5 text-green-700"
            />
            <div>
              <p class="font-bold">ENCG Agadir</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex-1 flex flex-col text-lg font-light rounded-2xl border-1 border-gray-600 bg-black/50 backdrop-blur-lg"
      >
        <div>
          <img
            src="../../assets/webp/SMMA.webp"
            class="rounded-t-2xl border-t-1 border-l-1 border-r-1 border-gray-600"
          />
        </div>
        <div class="p-5">
          <div class="flex md:justify-start">
            <UBadge
              label="WORKSHOP"
              class="bg-green-600/20 text-xl text-green-400 px-4 py-1 rounded-full w-fit mb-4"
            />
          </div>
          <h1 class="text-4xl font-bold mt-5 mb-5">SMMA Workshop</h1>
          <div>
            <span class="md:block text-lg">
              An exclusive Social Media Marketing Agency workshop for CDI
              members, hosted by @gallabbrahim at ENCG Agadir. Attendees gained
              practical insights into building and scaling a successful social
              media marketing agency.
            </span>
          </div>
        </div>

        <div class="flex p-4 mt-auto">
          <div class="flex items-center gap-4">
            <UIcon
              name="solar:map-point-broken"
              class="size-5 text-green-700"
            />
            <div>
              <p class="font-bold">ENCG Agadir</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex-1 flex-col text-lg font-light rounded-2xl border-1 border-gray-600 bg-black/50 backdrop-blur-lg"
      >
        <div>
          <img
            src="../../assets/webp/CODBlueprint.webp"
            class="rounded-t-2xl border-t-1 border-l-1 border-r-1 border-gray-600"
          />
        </div>
        <div class="p-5">
          <div class="flex md:justify-start">
            <UBadge
              label="MASTERCLASS"
              class="bg-green-600/20 text-xl text-green-400 px-4 py-1 rounded-full w-fit mb-4"
            />
          </div>
          <h1 class="text-4xl font-bold mt-5 mb-5">COD Blueprint</h1>
          <div>
            <span class="md:block text-lg">
              A collaborative masterclass by @simo.ortega and @yasser.jamai
              unveiling strategies for building successful Cash-on-Delivery
              businesses. Participants learned actionable tactics for market
              research, product selection, and optimization.
            </span>
          </div>
        </div>

        <div class="flex p-4 mt-auto">
          <div class="flex items-center gap-4">
            <UIcon
              name="solar:map-point-broken"
              class="size-5 text-green-700"
            />
            <div>
              <p class="font-bold">ENCG Agadir</p>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
