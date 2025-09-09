<script setup lang="ts">
import { UContainer } from "#components";
import { useCountdown } from "#imports";
import { onMounted } from "vue";
import { gsap } from "gsap";

const targetDate = new Date("September 11, 2025 23:00:00");

const { days, hours, minutes, seconds, isFinished } = useCountdown(targetDate);

onMounted(() => {
  watch([seconds, minutes, hours, days], () => {
    gsap.fromTo(
      ".timer-box span",
      { scale: 1.2 },
      { scale: 1, duration: 0.3, ease: "power2.out" }
    );
  });

  gsap.to(".timer-box", {
    delay: 2,
    opacity: 1,
    scale: 0.7,
    duration: 1.5,
    ease: "back.out(1.7)",
  });
});
</script>

<template>
  <UContainer
    class="flex flex-col items-center justify-center text-white w-screen"
  >
    <div v-if="!isFinished" class="text-center scale-75 sm:scale-100 timer-box">
      <div class="flex items-center justify-center gap-4 md:gap-8">
        <div
          class="flex flex-col items-center justify-center bg-green-dark rounded-lg p-4 w-26 md:w-40"
        >
          <transition name="flip">
            <span
              :key="days"
              class="text-4xl sm:text-5xl md:text-6xl font-bold block overflow-hidden"
              >{{ days }}</span
            ></transition
          >
          <span class="text-lg uppercase mt-2">Days</span>
        </div>
        <div
          class="flex flex-col items-center justify-center bg-green-dark rounded-lg p-4 w-26 md:w-40"
        >
          <transition name="flip">
            <span
              :key="days"
              class="text-4xl sm:text-5xl md:text-6xl font-bold block overflow-hidden"
              >{{ hours }}</span
            ></transition
          >
          <span class="text-lg uppercase mt-2">Hours</span>
        </div>
        <div
          class="flex flex-col items-center justify-center bg-green-dark rounded-lg p-4 w-26 md:w-40"
        >
          <transition name="flip">
            <span
              :key="days"
              class="text-4xl sm:text-5xl md:text-6xl font-bold block overflow-hidden"
              >{{ minutes }}</span
            ></transition
          >
          <span class="text-lg uppercase mt-2">Minutes</span>
        </div>
        <div
          class="flex flex-col items-center justify-center bg-green-dark rounded-lg p-4 w-26 md:w-40"
        >
          <transition name="flip">
            <span
              :key="days"
              class="text-4xl sm:text-5xl md:text-6xl font-bold block overflow-hidden"
              >{{ seconds }}</span
            ></transition
          >
          <span class="text-lg uppercase mt-2">Seconds</span>
        </div>
      </div>
      <p class="mt-8 text-lg opacity-80">
        Counting down to the most wonderful time of the year!
      </p>
    </div>
    <div v-else class="text-center">
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold">
        WELCOME TO CDI
      </h1>
      <p class="mt-4 text-lg">The countdown is over.</p>
    </div>
  </UContainer>
</template>
<style lang="css">
.timer-box {
  opacity: 0;
  transform: scale(0.8);
}

.flip-enter-active,
.flip-leave-active {
  transition: all 0.4s ease;
  display: inline-block;
}
.flip-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
.flip-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.flip-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.flip-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
