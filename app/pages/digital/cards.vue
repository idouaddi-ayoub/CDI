<script setup lang="ts">
import canva from "../../assets/webp/canvapro.webp";
import chatgpt from "../../assets/webp/chatgpt-logo.webp";
import capcut from "../../assets/webp/capcut-logo-pc.webp";
import Perplexity from "../../assets/webp/Perplexity.webp";
import Gemini from "../../assets/webp/Gemini.webp";
import Tiktok from "../../assets/webp/Tiktok.webp";
import Netflix from "../../assets/webp/Netflix.webp";
import Spotify from "../../assets/webp/spotify.webp";
import CDI from "../../assets/webp/CDI_bg.webp";

const showCard = ref(false);
const open = ref(false);

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
    <div @click="open = true" class="cursor-pointer">
      <LazyDigitalCard title="Canva Pro" :image="canva">
        <template #description>
          <span class="font-bold text-3xl">20DH</span>
        </template>
      </LazyDigitalCard>
    </div>
    <UModal
      v-model:open="open"
      title="Buy Canva Pro"
      description="Cotnact us to buy your Canva Pro access."
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <a href="https://wa.me/212708609901">
          <UBadge class="text-lg" label="Contac Us" />
        </a>
      </template>
    </UModal>
    <LazyDigitalCard
      title="CapCut Pro"
      description="Coming Soon..."
      :image="capcut"
      disabled
    />
    <LazyDigitalCard
      title="ChatGPT Pro"
      description="Coming Soon..."
      :image="chatgpt"
      disabled
    /><LazyDigitalCard
      title="Perplixity pro"
      description="Coming Soon..."
      :image="Perplexity"
      disabled
    /><LazyDigitalCard
      title="Gemini Pro"
      description="Coming Soon..."
      :image="Gemini"
      disabled
    /><LazyDigitalCard
      title="Tiktok Beta"
      description="Coming Soon..."
      :image="Tiktok"
      disabled
    /><LazyDigitalCard
      title="Netflix"
      description="Coming Soon..."
      :image="Netflix"
      disabled
    /><LazyDigitalCard
      title="Spotify"
      description="Coming Soon..."
      :image="Spotify"
      disabled
    /><LazyDigitalCard
      title="More soon"
      description="Coming Soon..."
      :image="CDI"
      disabled
    />
  </UContainer>
</template>
