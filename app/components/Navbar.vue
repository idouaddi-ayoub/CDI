<script setup lang="ts">
import { ref } from "vue";

const isMobileMenuOpen = ref(false);

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Agency", href: "/agency" },
  { name: "Digital Product", href: "/digital" },
  // { name: "Tools", href: "/tools" },
  { name: "Our events", href: "/ourevents" },
  { name: "About us", href: "/aboutus" },
  { name: "Contact us", href: "/contactus" },
];

const isAtTop = ref(true);

const handleScroll = () => {
  isAtTop.value = window.scrollY < 1;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <nav
    :class="[
      'text-white shadow-lg top-0 w-full z-50 fixed rounded-bl-2xl rounded-br-2xl sm:rounded-none transition-all duration-300',
      isAtTop ? 'bg-black/90' : ' bg-black/50 backdrop-filter backdrop-blur-lg',
    ]"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="h-full">
          <a href="/"
            ><img src="../assets/png/logo_byd.png" class="h-full p-3"
          /></a>
        </div>

        <div class="hidden md:flex items-center space-x-6">
          <div class="flex items-center space-x-10">
            <a
              v-for="link in navigationLinks"
              :key="link.name"
              :href="link.href"
              class="hover:bg-gray-700 px-3 py-2 rounded-md text-[18px] font-medium transition-colors"
            >
              {{ link.name }}
            </a>
          </div>
        </div>
        <div class="relative hidden lg:block">
          <!-- <UButton
            icon="tabler-arrow-narrow-right"
            label="Get Canva"
            size="xl"
            color="primary"
            variant="solid"
            class="rounded-4xl"
            trailing
          /> -->
        </div>
        <div class="md:hidden flex items-center">
          <UButton
            icon="i-lucide-menu"
            size="xl"
            color="primary"
            variant="ghost"
            class="focus:outline-none"
            aria-label="Open mobile menu"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          />
        </div>
      </div>
    </div>

    <div v-show="isMobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a
          v-for="link in navigationLinks"
          :key="link.name"
          :href="link.href"
          class="block text-base font-medium text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          {{ link.name }}
        </a>
      </div>
      <div class="relative lg:block">
        <!-- <UButton
          icon="tabler-arrow-narrow-right"
          label="Get Canva"
          size="xl"
          color="primary"
          variant="solid"
          class="rounded-4xl m-5"
          trailing
        /> -->
      </div>
    </div>
  </nav>
</template>
