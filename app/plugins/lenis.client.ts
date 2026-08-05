import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const lenis = reduce
    ? null
    : new Lenis({
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

  let tick: ((time: number) => void) | null = null;

  if (lenis) {
    lenis.on("scroll", ScrollTrigger.update);
    tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);

    gsap.ticker.lagSmoothing(0);
  }

  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }

  return {
    provide: { lenis },
  };
});
