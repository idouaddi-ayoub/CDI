<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const preloaderReady = ref(false);

onMounted(() => {
  document.body.style.overflow = "hidden";

  const showPreloader = ref(true);
  const paths = document.querySelectorAll<SVGPathElement>(".shapePreloader");
  const pagePaths = document.querySelectorAll<SVGPathElement>(
    ".shapePrePageloader"
  );

  pagePaths.forEach((path, i) => {
    const length = path.getTotalLength();

    gsap.set(path, {
      stroke: "white",
      strokeWidth: 0.5,
      fill: "none",
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.2,
      delay: i * 0.1,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(path, { fill: "white", duration: 0.5 });
        gsap.to(path, { fill: "green", delay: 0.55, scale: 0 });
      },
    });
  });

  paths.forEach((path, i) => {
    const length = path.getTotalLength();

    gsap.set(path, {
      stroke: "white",
      strokeWidth: 0.5,
      fill: "none",
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.2,
      delay: i * 0.1,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(path, { fill: "white", duration: 0.5 });
        gsap.to(path, { fill: "green", delay: 0.55, scale: 0 });
      },
    });
  });

  gsap.set(".blinder", {
    yPercent: 0,
    onComplete: () => {
      gsap.to(".blinder", { opacity: 0, delay: 2, duration: 2 });
    },
  });

  gsap.set(".HeroHomeTitle", {
    y: 40,
    opacity: 0,
  });

  gsap.set(".mobile-blinder", {
    xPercent: 0,
    onComplete: () => {
      gsap.to(".mobile-blinder", { opacity: 0, delay: 2, duration: 2 });
    },
  });

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  tl.to(".blinder", {
    yPercent: -100,
    stagger: 0.15,
    duration: 1.5,
  })
    .to(".preloader-bg", { opacity: 0, duration: 0.8 }, "-=0.4")
    .to(".preloader", { pointerEvents: "none" })
    .to(".mobile-blinder", {
      xPercent: 100,
      stagger: 0.05,
      duration: 0.5,
      ease: "power2.inOut",
    })
    .to(".HeroHomeTitle", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

  setTimeout(() => {
    preloaderReady.value = true;
    document.body.style.overflow = "";
  }, 3000);

  window.addEventListener("load", () => {
    gsap.to(".preloader", {
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        showPreloader.value = false;
        document.body.style.overflow = ""; // restore scroll
      },
    });
  });
});
</script>

<template>
  <div
    v-if="route.path === '/'"
    :class="[
      'preloader fixed inset-0 flex items-center justify-center h-[100vh] w-full transition-all',
      !preloaderReady ? 'z-[9999]' : 'pointer-events-none',
    ]"
  >
    <div class="preloader-bg absolute inset-0 bg-black z-0"></div>
    <!-- Blinders -->
    <div class="hidden md:flex absolute top-0 w-full h-full origin-top z-10">
      <div class="blinder flex flex-1 bg-green-900"></div>
      <div class="blinder flex flex-1 bg-green-700"></div>
      <div class="blinder flex flex-1 bg-green-500"></div>
      <div class="blinder flex flex-1 bg-green-300"></div>
    </div>

    <!-- Mobile blinders -->
    <div
      class="md:hidden absolute top-0 left-0 w-full h-full flex flex-col z-10 overflow-hidden"
    >
      <div class="mobile-blinder h-1/4 w-full bg-green-900"></div>
      <div class="mobile-blinder h-1/4 w-full bg-green-700"></div>
      <div class="mobile-blinder h-1/4 w-full bg-green-500"></div>
      <div class="mobile-blinder h-1/4 w-full bg-green-300"></div>
    </div>

    <!-- Logo -->
    <div class="flex items-center justify-center w-full h-full relative z-20">
      <svg
        viewBox="-5 0 100 100"
        class="w-40 h-40 md:w-56 md:h-56 scale-200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="main-shapes">
          <path
            class="shapePreloader"
            style="fill: none; stroke-width: 0.2"
            d="M60 20 H25 L0 75 L62.5 75 L67.5 65 L16 65 L32.5 30 L55 30Z"
          />
          <path
            class="shapePreloader"
            style="fill: none; stroke-width: 0.2"
            d="M75 20 H65 L57.5 35 L35 35 L41 42.5 L55 42.5 L49.5 53 L55 60Z"
          />
          <path
            class="shapePreloader"
            style="fill: none; stroke-width: 0.2"
            d="M22.5 60 L55 60 L49.5 53 L36 53 L41 42.5 L35 35Z"
          />
          <path
            class="shapePreloader"
            style="fill: none; stroke-width: 0.2"
            d="M90 20 H80 L75 30 L85 30Z"
          />
          <path
            class="shapePreloader"
            style="fill: none; stroke-width: 0.2"
            d="M82.5 35 H72.5 L60 60 L70 60Z"
          />
        </g>
      </svg>
    </div>
  </div>
  <div
    v-if="route.path !== '/'"
    :class="[
      'preloader fixed inset-0 flex items-center justify-center h-[100vh] w-full transition-all',
      !preloaderReady ? 'z-[9999]' : 'pointer-events-none',
    ]"
  >
    <div class="preloader-bg absolute inset-0 bg-black z-0"></div>
    <!-- Logo -->
    <div class="flex items-center justify-center w-full h-full relative z-20">
      <svg
        viewBox="-5 0 100 100"
        class="w-40 h-40 md:w-56 md:h-56"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="main-shapes">
          <path
            class="shapePrePageloader"
            d="M60 20 H25 L0 75 L62.5 75 L67.5 65 L16 65 L32.5 30 L55 30Z"
          />
          <path
            class="shapePrePageloader"
            d="M75 20 H65 L57.5 35 L35 35 L41 42.5 L55 42.5 L49.5 53 L55 60Z"
          />
          <path
            class="shapePrePageloader"
            d="M22.5 60 L55 60 L49.5 53 L36 53 L41 42.5 L35 35Z"
          />
          <path class="shapePrePageloader" d="M90 20 H80 L75 30 L85 30Z" />
          <path class="shapePrePageloader" d="M82.5 35 H72.5 L60 60 L70 60Z" />
        </g>
      </svg>
    </div>
  </div>
</template>
<style>
.blinder {
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
  background: linear-gradient(45deg, #00ff0090, #00862890, #15ab0190);
  background-size: 300% 300%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.mobile-blinder {
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
  background: linear-gradient(45deg, #00ff0090, #00862890, #15ab0190);
  background-size: 300% 300%;
  animation: mobileGradientShift 3s ease infinite;
}

@keyframes mobileGradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
