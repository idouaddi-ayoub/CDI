<script setup>
import { ref, computed } from "vue";
import { useMouseInElement } from "@vueuse/core";
import PlaceHolder from "../assets/jpg/PlaceHolder.jpg";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    default: PlaceHolder,
  },
});

const currentImageSrc = ref(props.imageSrc);

const onImageError = () => {
  currentImageSrc.value = PlaceHolder;
};

const target = ref(null);
const { elementX, elementY, isOutside, elementHeight, elementWidth } =
  useMouseInElement(target);

const cardStyle = computed(() => {
  const MAX_ROTATION = 10;

  const rotateX = (
    MAX_ROTATION / 2 -
    (elementY.value / elementHeight.value) * MAX_ROTATION
  ).toFixed(2);

  const rotateY = (
    (elementX.value / elementWidth.value) * MAX_ROTATION -
    MAX_ROTATION / 2
  ).toFixed(2);

  return isOutside.value
    ? ""
    : `perspective(${elementWidth.value}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
</script>

<template>
  <div class="card group">
    <div
      ref="target"
      class="relative w-40 h-70 sm:w-50 sm:h-90 overflow-hidden rounded-4xl shadow-lg hover:shadow-2xl transition-transform duration-300 group-hover:scale-125"
    >
      <img
        :src="currentImageSrc"
        @error="onImageError"
        class="w-full h-full object-cover"
      />
      <p
        class="flex absolute bottom-0 w-full text-center bg-black/50 text-white py-2 text-xl h-20 items-center justify-center transition-all duration-300"
      >
        {{ title }}
      </p>
    </div>
  </div>
</template>
<style lang="css">
.card {
  transform: v-bind(cardStyle);
  transition: transform 0.25s ease-out;
}
</style>
