<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";

interface Props {
  title: string;
  description?: string;
  notice?: string;
  image: string;
  disabled?: boolean;
}

const props = defineProps<Props>();

const cardRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);
const borderRef = ref<HTMLElement | null>(null);

const isMobile = () => window.innerWidth < 768;

onMounted(() => {
  if (cardRef.value && imageRef.value && textRef.value && borderRef.value) {
    gsap.from(cardRef.value, {
      opacity: 0,
      y: 50,
      duration: 1.25,
      delay: 3,
      ease: "power3.out",
    });
    gsap.from(imageRef.value, {
      opacity: 0,
      scale: 1,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
    });
    gsap.from(textRef.value, {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.4,
      ease: "power3.out",
    });
    if (isMobile()) return;
    gsap.to(borderRef.value, {
      opacity: 1,
      boxShadow: "0 0 30px 5px rgba(255,0,0,1)",
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
});

const handleMouseEnter = (event: MouseEvent) => {
  if (isMobile() || !cardRef.value || props.disabled) return;
  const rect = cardRef.value.getBoundingClientRect();
  const x = (event.clientX - rect.left - rect.width / 2) / 20;
  const y = (event.clientY - rect.top - rect.height / 2) / 20;
  gsap.to(cardRef.value, {
    scale: 1.08,
    rotateX: -y,
    rotateY: x,
    boxShadow: "0 20px 50px rgba(255,0,0,0.6)",
    transformPerspective: 800,
    duration: 0.4,
    ease: "power3.out",
  });
};

const handleMouseMove = (event: MouseEvent) => {
  if (isMobile() || !cardRef.value || props.disabled) return;
  const rect = cardRef.value.getBoundingClientRect();
  const x = (event.clientX - rect.left - rect.width / 2) / 20;
  const y = (event.clientY - rect.top - rect.height / 2) / 20;
  gsap.to(cardRef.value, { rotateY: x, rotateX: -y, duration: 0.3 });
};

const handleMouseLeave = () => {
  if (isMobile() || !cardRef.value || props.disabled) return;
  gsap.to(cardRef.value, {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    boxShadow: "0 5px 15px rgba(255,0,0,0.8)",
    duration: 0.4,
    ease: "power3.out",
  });
};
</script>

<template>
  <UContainer>
    <div
      ref="cardRef"
      class="w-80 sm:w-120 h-130 bg-gradient-to-tr bg-black rounded-2xl overflow-hidden relative border border-red-600 scale-90 sm:scale-100"
      :class="[
        props.disabled
          ? 'grayscale opacity-50 cursor-not-allowed '
          : 'cursor-pointer scale-50 sm:scale-100',
      ]"
      @mouseenter="handleMouseEnter"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <div
        ref="imageRef"
        class="flex flex-col h-70 w-full x overflow-hidden relative"
      >
        <img
          :src="props.image"
          alt="Card Image"
          class="w-full h-full object-cover brightness-90"
          :class="{ 'opacity-60': props.disabled }"
        />
        <div
          class="absolute inset-0 bg-cyan-400 opacity-20 mix-blend-screen pointer-events-none"
        ></div>
      </div>
      <div ref="textRef" class="p-6 text-white">
        <h2 class="text-2xl font-bold mb-2 drop-shadow-md">
          {{ props.title }}
        </h2>
        <p class="text-gray-200 drop-shadow-sm">
          <slot name="description">
            {{ props.description }}
          </slot>
        </p>
        <p class="text-gray-200 drop-shadow-sm pt-5">
          <slot name="notice">
            {{ props.notice }}
          </slot>
        </p>
      </div>
      <div
        ref="borderRef"
        class="absolute inset-0 border-2 border-cyan-400 rounded-2xl pointer-events-none blur-md opacity-30"
      ></div>
    </div>
  </UContainer>
</template>
