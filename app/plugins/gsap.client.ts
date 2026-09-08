import { gsap, ScrollTrigger } from "~/utils/gsap";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  };
});
