<script setup lang="ts">
import Canva from "../../assets/webp/canvapro.webp";
import Chatgpt from "../../assets/webp/chatgpt-logo.webp";
import Capcut from "../../assets/webp/capcut-logo-pc.webp";
import Perplexity from "../../assets/webp/Perplexity.webp";
import Gemini from "../../assets/webp/Gemini.webp";
import Tiktok from "../../assets/webp/Tiktok.webp";
import Netflix from "../../assets/webp/Netflix.webp";
import Spotify from "../../assets/webp/spotify.webp";
import CDI from "../../assets/webp/CDI_bg.webp";

const showCard = ref(false);
const canva = ref(false);
const capcut = ref(false);
const chatgpt = ref(false);
const perplexity = ref(false);
const gemini = ref(false);
const netflix = ref(false);
const spotify = ref(false);

onMounted(() => {
  setTimeout(() => {
    showCard.value = true;
  }, 1000);
});
</script>
<template>
  <UContainer
    v-if="showCard"
    class="flex flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-6 pb-10"
  >
    <div @click="canva = true" class="cursor-pointer">
      <LazyDigitalCard title="Canva Pro" :image="Canva">
        <template #description>
          <div class="grid grid-cols-2 gap-y-1">
            <span class="font-bold text-xl text-gray-400">1 month</span>
            <span class="font-bold text-xl text-gray-400 text-right">19DH</span>
          </div>
        </template>
      </LazyDigitalCard>
    </div>
    <UModal
      v-model:open="canva"
      title="Buy Canva Pro"
      description="Contact us to buy your Canva Pro access."
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <a href="https://wa.me/212708609901">
          <UBadge class="text-lg" label="Contact Us" />
        </a>
      </template>
    </UModal>
    <div @click="capcut = true" class="cursor-pointer">
      <LazyDigitalCard title="CapCut Pro" :image="Capcut">
        <template #description>
          <div class="grid grid-cols-2 gap-y-1">
            <span class="font-bold text-xl text-gray-400">1 month</span>
            <span class="font-bold text-xl text-gray-400 text-right">50DH</span>
            <span class="font-bold text-xl text-gray-400">6 months</span>
            <span class="font-bold text-xl text-gray-400 text-right"
              >120DH</span
            >
            <span class="font-bold text-xl text-gray-400">12 months</span>
            <span class="font-bold text-xl text-gray-400 text-right"
              >200DH</span
            >
          </div>
        </template>
      </LazyDigitalCard>
    </div>
    <UModal
      v-model:open="capcut"
      title="Buy CapCut Pro"
      description="Contact us to buy your CapCut Pro access."
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <a href="https://wa.me/212708609901">
          <UBadge class="text-lg" label="Contact Us" />
        </a>
      </template>
    </UModal>
    <div @click="chatgpt = true" class="cursor-pointer">
      <LazyDigitalCard title="ChatGPT Pro" :image="Chatgpt">
        <template #description>
          <div class="grid grid-cols-2 gap-y-1">
            <span class="font-bold text-xl text-gray-400">1 month</span>
            <span class="font-bold text-xl text-gray-400 text-right">50DH</span>
            <span class="font-bold text-xl text-gray-400">6 months</span>
            <span class="font-bold text-xl text-gray-400 text-right"
              >120DH</span
            >
            <span class="font-bold text-xl text-gray-400">12 months</span>
            <span class="font-bold text-xl text-gray-400 text-right"
              >200DH</span
            >
          </div>
        </template>
      </LazyDigitalCard>
    </div>
    <UModal
      v-model:open="chatgpt"
      title="Buy Chatgpt Pro"
      description="Contact us to buy your Chatgpt Pro access."
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <a href="https://wa.me/212708609901">
          <UBadge class="text-lg" label="Contact Us" />
        </a>
      </template>
    </UModal>

    <div @click="perplexity = true" class="cursor-pointer">
      <LazyDigitalCard title="Perplexity pro" :image="Perplexity">
        <template #description>
          <div class="grid grid-cols-2 gap-y-1">
            <span class="font-bold text-xl text-gray-400">1 month</span>
            <span class="font-bold text-xl text-gray-400 text-right">60DH</span>
            <span class="font-bold text-xl text-gray-400">6 months</span>
            <span class="font-bold text-xl text-gray-400 text-right"
              >170DH</span
            >
            <span class="font-bold text-xl text-gray-400">12 months</span>
            <span class="font-bold text-xl text-gray-400 text-right"
              >220DH</span
            >
          </div>
        </template>
      </LazyDigitalCard>
    </div>
    <UModal
      v-model:open="perplexity"
      title="Buy Perplexity Pro"
      description="Contact us to buy your Perplexity Pro access."
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <a href="https://wa.me/212708609901">
          <UBadge class="text-lg" label="Contact Us" />
        </a>
      </template>
    </UModal>
    <div @click="gemini = true" class="cursor-pointer">
      <LazyDigitalCard v-model:open="gemini" title="Gemini Pro" :image="Gemini">
        <template #description>
          <div class="grid grid-cols-2 gap-y-1">
            <span class="font-bold text-xl text-gray-400">1 month</span>
            <span class="font-bold text-xl text-gray-400 text-right">50DH</span>
            <span class="font-bold text-xl text-gray-400">6 months</span>
            <span class="font-bold text-xl text-gray-400 text-right"
              >170DH</span
            >
            <span class="font-bold text-xl text-gray-400">12 months</span>
            <span class="font-bold text-xl text-gray-400 text-right"
              >250DH</span
            >
          </div>
        </template>
      </LazyDigitalCard>
    </div>
    <UModal
      v-model:open="gemini"
      title="Buy Gemini Pro"
      description="Contact us to buy your Gemini Pro access."
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <a href="https://wa.me/212708609901">
          <UBadge class="text-lg" label="Contact Us" />
        </a>
      </template>
    </UModal>
    <div @click="netflix = true" class="cursor-pointer">
      <LazyDigitalCard title="Netflix" :image="Netflix">
        <template #description>
          <div class="grid grid-cols-2 gap-y-1">
            <span class="font-bold text-xl text-gray-400">1 month</span>
            <span class="font-bold text-xl text-gray-400 text-right">40DH</span>
            <span class="font-bold text-xl text-gray-400">6 months</span>
            <span class="font-bold text-xl text-gray-400 text-right"
              >100DH</span
            >
            <span class="font-bold text-xl text-gray-400">12 months</span>
            <span class="font-bold text-xl text-gray-400 text-right"
              >170DH</span
            >
          </div>
        </template>
      </LazyDigitalCard>
    </div>
    <UModal
      v-model:open="netflix"
      title="Buy Netflix"
      description="Contact us to buy your Netflix access."
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <a href="https://wa.me/212708609901">
          <UBadge class="text-lg" label="Contact Us" />
        </a>
      </template>
    </UModal>
    <LazyDigitalCard
      title="Spotify"
      description="Coming Soon..."
      :image="Spotify"
      disabled
    />
    <LazyDigitalCard
      title="Tiktok Beta"
      description="Coming Soon..."
      :image="Tiktok"
      disabled
    />
    <LazyDigitalCard
      title="More soon"
      description="Coming Soon..."
      :image="CDI"
      disabled
    />
  </UContainer>
</template>
