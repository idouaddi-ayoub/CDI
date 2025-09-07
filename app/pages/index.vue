<script setup lang="ts">
import bgImg from "../assets/webp/hero-bg.webp";
import { onMounted } from "vue";
import { gsap } from "gsap";

const heroRef = ref(null);
defineExpose({ heroRef });

onMounted(() => {
  const path = document.querySelector<SVGPathElement>(".lock-shape");
  if (!path) return;

  const length = path.getTotalLength();

  gsap.to(".title", {
    delay: 2,
    opacity: 1,
    scale: 1,
    duration: 3,
    ease: "back.out(1.7)",
  });

  gsap.to(heroRef.value, {
    filter: "blur(40px)",
    duration: 3,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  });

  // Initial state: invisible path
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
    fill: "none",
    scale: 1,
    transformOrigin: "50% 50%",
  });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, delay: 2 });

  tl.to(path, {
    stroke: "green",
    fill: "none",
  });

  tl.to(path, {
    strokeDashoffset: 0,
    duration: 2.5,
    ease: "power2.inOut",
  });

  tl.to(path, {
    fill: "rgba(0, 255, 100, 0.6)",
    duration: 1.05,
    ease: "power1.inOut",
  });

  tl.to(path, {
    stroke: "#00ff88",
    scale: 1.05,
    duration: 1.2,
    yoyo: true,
    repeat: 3,
    ease: "power1.inOut",
  });

  tl.to(path, {
    fill: "rgba(0, 255, 100, 0.0)",
    duration: 1.5,
    ease: "power1.inOut",
  });

  tl.to(path, {
    strokeDashoffset: length,
    duration: 2.5,
    ease: "power2.inOut",
  });
});
</script>
<template>
  <div class="h-screen relative">
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center opacity-30 bg-hero"
        :style="{ backgroundImage: `url(${bgImg})` }"
      />
    </div>
    <div
      class="absolute inset-x-0 h-full bg-gradient-to-t from-black to-transparent"
    ></div>

    <div class="flex z-10 justify-center items-center h-screen mr-10 ml-10">
      <div
        class="flex flex-col text-center text-3xl sm:text-7xl font-bold blur-sm title"
      >
        <h1>BECOME MORE WITH<br /></h1>
        <p class="text-green-default">CDI ENCG Agadir</p>
      </div>
      <svg
        class="absolute scale-80 sm:scale-40 mb-40"
        fill="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-40 -50 500 500"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        enable-background="new 0 0 421 421"
      >
        <path
          class="lock-shape"
          fill="none"
          stroke="none"
          stroke-width="7"
          d="m334.825,175.015h-19.615v-70.305c0-57.737-46.972-104.71-104.71-104.71s-104.71,46.973-104.71,104.71v70.305h-19.615c-4.143,0-7.5,3.358-7.5,7.5v230.985c0,4.142 3.357,7.5 7.5,7.5h248.649c4.143,0 7.5-3.358 7.5-7.5v-230.985c0.001-4.142-3.357-7.5-7.499-7.5zm-214.034-70.305c0-49.466 40.244-89.71 89.71-89.71s89.71,40.244 89.71,89.71v70.305h-24v-70.305c0-36.233-29.478-65.71-65.71-65.71s-65.71,29.477-65.71,65.71v70.305h-24v-70.305zm140.419,70.305h-101.42v-70.305c0-27.962 22.748-50.71 50.71-50.71s50.71,22.748 50.71,50.71v70.305zm66.115,230.985h-60.225v-12.893l20.402-20.402c2.2,0.834 4.574,1.312 7.062,1.312 11.028,0 20-8.972 20-20s-8.972-20-20-20-20,8.972-20,20c0,3.039 0.701,5.911 1.919,8.493l-22.188,22.188c-1.406,1.406-2.196,3.314-2.196,5.303v16h-17.5v-98.893l13.857-13.857c2.491,1.116 5.242,1.75 8.143,1.75 11.028,0 20-8.972 20-20s-8.972-20-20-20-20,8.972-20,20c0,2.631 0.524,5.139 1.451,7.442l-16.255,16.255c-1.406,1.406-2.196,3.314-2.196,5.303v102h-18.2v-142.211c0-1.989-0.79-3.896-2.195-5.302l-15.161-15.169c1.36-2.699 2.144-5.736 2.144-8.959 0-11.028-8.972-20-20-20s-20,8.972-20,20 8.972,20 20,20c2.299,0 4.5-0.409 6.557-1.127l13.655,13.662v139.105h-17.5v-56c0-1.989-0.79-3.897-2.196-5.303l-22.187-22.187c1.218-2.582 1.919-5.454 1.919-8.493 0-11.028-8.972-20-20-20s-20,8.972-20,20 8.972,20 20,20c2.488,0 4.862-0.478 7.062-1.312l20.402,20.402v52.893h-60.224v-215.985h233.649v215.985zm-37.759-51.984c0-2.757 2.243-5 5-5s5,2.243 5,5-2.243,5-5,5-5-2.243-5-5zm-37.965-79.016c0-2.757 2.243-5 5-5s5,2.243 5,5-2.243,5-5,5-5-2.243-5-5zm-85.412-35.64c-2.757,0-5-2.243-5-5s2.243-5 5-5 5,2.243 5,5-2.243,5-5,5zm-39.752,79.656c-2.757,0-5-2.243-5-5s2.243-5 5-5 5,2.243 5,5-2.243,5-5,5z"
        />
      </svg>
      <div class="absolute bottom-10 inset-x-0 flex justify-center z-20">
        <Timer />
      </div>
    </div>
  </div>
</template>
<style lang="css">
.title {
  opacity: 0;
  transform: scale(0.5);
}

.bg-hero {
  animation: glitch 3s;
}

@keyframes glitch {
  0% {
    clip-path: inset(0 0 0 0);
    transform: translate(0);
  }
  20% {
    clip-path: inset(10% 0 85% 0);
    transform: translate(-5px, -3px);
  }
  40% {
    clip-path: inset(80% 0 5% 0);
    transform: translate(5px, 3px);
  }
  60% {
    clip-path: inset(20% 0 70% 0);
    transform: translate(-3px, 2px);
  }
  80% {
    clip-path: inset(40% 0 50% 0);
    transform: translate(3px, -2px);
  }
  100% {
    clip-path: inset(0 0 0 0);
    transform: translate(0);
  }
}

.bg-hero::before,
.bg-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: inherit;
  background-size: cover;
  mix-blend-mode: screen;
  opacity: 0.6;
}

.bg-hero::before {
  transform: translate(-3px, 0);
  filter: hue-rotate(90deg);
  animation: glitchShift 2s infinite;
}

.bg-hero::after {
  transform: translate(3px, 0);
  filter: hue-rotate(-90deg);
  animation: glitchShift 2s infinite reverse;
}

@keyframes glitchShift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  20% {
    transform: translate(-5px, 2px);
  }
  40% {
    transform: translate(5px, -2px);
  }
  60% {
    transform: translate(-2px, -5px);
  }
  80% {
    transform: translate(3px, 2px);
  }
}
</style>
