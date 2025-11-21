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
              <img
                src="../assets/png/CDI.png"
                class="w-20 transition-all duration-300 hover:brightness-200"
              />
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
              <a
                target="_blank"
                href="https://www.linkedin.com/company/cdi-encg-agadir/posts/"
                class="flex flex-col justify-center items-center"
              >
                <img
                  src="../assets/svg/linkedin.svg"
                  class="w-8 transition-all duration-300 hover:brightness-200"
                />
              </a>
              <a
                target="_blank"
                href="https://web.facebook.com/cdi.encga"
                class="flex flex-col justify-center items-center"
              >
                <img
                  src="../assets/svg/facebook-color.svg"
                  class="w-8 transition-all duration-300 hover:brightness-200"
              /></a>
              <a
                target="_blank"
                href="https://www.instagram.com/cdi_encgagadir/"
                class="flex flex-col justify-center items-center"
              >
                <img
                  src="../assets/svg/instagram-1-svgrepo-com.svg"
                  class="w-8 transition-all duration-300 hover:brightness-200"
              /></a>
              <a
                target="_blank"
                href="https://www.tiktok.com/@cdi_encgagadir"
                class="flex flex-col justify-center items-center"
              >
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
              <a href="/" class="hover:text-gray-300 md:w-fit">Home</a>
              <a href="/agency" class="hover:text-gray-300 md:w-fit">Agency</a>
              <a href="/digital" class="hover:text-gray-300 md:w-fit"
                >Digital Product</a
              >
              <a href="/contactus" class="hover:text-gray-300 md:w-fit"
                >Contact Us</a
              >
            </div>
          </div>
        </div>

        <div class="flex gap-6 w-full">
          <div
            class="flex flex-col gap-4 md:gap-6 text-center md:text-left w-full"
          >
            <h2 class="flex flex-col text-xl font-bold">Contact Us</h2>
            <div class="flex flex-col text-gray-500 gap-3">
              <a
                href="https://maps.app.goo.gl/jSxZgtFuSV6F9GHWA"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-gray-300 md:w-fit"
              >
                ENCG, Agadir, Morocco
              </a>

              <a
                href="mailto:cdiencga.info@gmail.com"
                class="hover:text-gray-300 md:w-fit"
              >
                cdiencga.info@gmail.com
              </a>

              <a href="tel:+212659419705" class="hover:text-gray-300 md:w-fit">
                +212 6‑59‑41‑97‑05
              </a>
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
