<script setup lang="ts"></script>
<template>
  <div class="bg-gradient-to-b from-green-dark to-black">
    <UContainer class="p-10">
      <div class="flex flex-col md:flex-row gap-8 justify-between w-full">
        <div
          class="flex flex-col w-full md:flex-row justify-between items-start gap-6"
        >
          <div class="flex flex-col gap-6">
            <a href="/" class="flex justify-center md:justify-start">
              <img src="../assets/png/logo_byd.png" class="h-16 p-3" />
            </a>
            <div>
              <p class="text-lg text-center md:text-left">
                Empowering students through technology, innovation, and
                community.
              </p>
            </div>
            <div
              class="flex flex-row justify-center items-center gap-4 md:text-left w-full pt-5"
            >
              <a href="#" class="flex flex-col justify-center items-center">
                <img
                  src="../assets/svg/linkedin.svg"
                  class="w-8 transition-all duration-300 hover:brightness-200"
                />
              </a>
              <a href="#" class="flex flex-col justify-center items-center">
                <img
                  src="../assets/svg/facebook-color.svg"
                  class="w-8 transition-all duration-300 hover:brightness-200"
              /></a>
              <a href="#" class="flex flex-col justify-center items-center">
                <img
                  src="../assets/svg/instagram-1-svgrepo-com.svg"
                  class="w-8 transition-all duration-300 hover:brightness-200"
              /></a>
              <a href="#" class="flex flex-col justify-center items-center">
                <img
                  src="../assets/svg/tiktok.svg"
                  class="w-8 transition-all duration-300 hover:brightness-200"
              /></a>
            </div>
          </div>
        </div>

        <div class="flex gap-6 w-full">
          <div class="flex flex-col gap-3 text-center md:text-left w-full">
            <h2 class="flex flex-col text-xl font-bold">Quick Links</h2>
            <div class="flex flex-col text-gray-500 gap-3">
              <a href="#" class="hover:text-gray-300 md:w-fit">Home</a>
              <a href="#" class="hover:text-gray-300 md:w-fit">What We Do</a>
              <!-- <a href="#" class="hover:text-gray-300 md:w-fit">Tools</a> -->
              <a href="#" class="hover:text-gray-300 md:w-fit">Agency</a>
              <a href="#" class="hover:text-gray-300 md:w-fit">About Us</a>
              <a href="#" class="hover:text-gray-300 md:w-fit">Contact Us</a>
            </div>
          </div>
        </div>
        <!-- <div class="flex gap-6 w-full">
          <div class="flex flex-col gap-3 text-center md:text-left w-full">
            <h2 class="flex flex-col text-xl font-bold">Ressources</h2>
            <div class="flex flex-col text-gray-500 gap-3">
              <a href="#" class="hover:text-gray-300 md:w-fit">Documentation</a>
              <a href="#" class="hover:text-gray-300 md:w-fit">Tutorials</a>
              <a href="#" class="hover:text-gray-300 md:w-fit">Blogs</a>
              <a href="#" class="hover:text-gray-300 md:w-fit">Open Source</a>
              <a href="#" class="hover:text-gray-300 md:w-fit"
                >Community Forum</a
              >
            </div>
          </div>
        </div> -->
        <div class="flex gap-6 w-full">
          <div
            class="flex flex-col gap-4 md:gap-6 text-center md:text-left w-full"
          >
            <h2 class="flex flex-col text-xl font-bold">Contact Us</h2>
            <div class="flex flex-col text-gray-500 gap-3">
              <a href="#" class="hover:text-gray-300"
                >ENCG Agadir, Agadir, Morocco</a
              >
              <a href="#" class="hover:text-gray-300 md:w-fit"
                >cdiencga.info@gmail.com</a
              >
              <a href="#" class="hover:text-gray-300 md:w-fit"
                >+212 6-59-41-97-05</a
              >
            </div>
          </div>
        </div>
      </div>

      <div
        class="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400"
      >
        <p>&copy; 2025 CDI ENCG Agadir. All rights reserved.</p>
      </div>
    </UContainer>
  </div>
</template>
