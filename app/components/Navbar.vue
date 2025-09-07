<script setup lang="ts">
import gsap from "gsap";
import { ref } from "vue";

const isAtTop = ref(true);

const handleScroll = () => {
  isAtTop.value = window.scrollY < 1;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  const paths = document.querySelectorAll<SVGPathElement>(".shape");

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
      delay: i * 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(path, { fill: "white", duration: 0.5 });
      },
    });
  });
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
          <a href="/">
            <svg viewBox="-5 0 100 100" width="70">
              <g id="main-shapes">
                <path
                  class="shape"
                  fill="none"
                  stroke="none"
                  stroke-width="0.1"
                  d="M60 20 H25 L0 75 L62.5 75 L67.5 65 L16 65 L32.5 30 L55 30Z"
                />
                <path
                  class="shape"
                  fill="none"
                  stroke="none"
                  stroke-width="0.1"
                  d="M75 20 H65 L57.5 35 L35 35 L41 42.5 L55 42.5 L49.5 53 L55 60 L55 60Z"
                />
                <path
                  class="shape"
                  fill="none"
                  stroke="none"
                  stroke-width="0.1"
                  d="M22.5 60 L55 60 L49.5 53 L36 53 L41 42.5 L35 35Z"
                />
                <path
                  class="shape"
                  fill="none"
                  stroke="none"
                  stroke-width="0.1"
                  d="M90 20 H80 L75 30 L85 30Z"
                />
                <path
                  class="shape"
                  fill="none"
                  stroke="none"
                  stroke-width="0.1"
                  d="M82.5 35 H72.5 L60 60 L70 60Z"
                />
              </g>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
