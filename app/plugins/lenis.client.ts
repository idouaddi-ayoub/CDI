import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Reduced-motion users get native scrolling. Lenis is smooth-scroll
  // interpolation, which is exactly the kind of motion they've opted out of.
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
    // Lenis drives its own frame loop off the GSAP ticker; lag smoothing would
    // let GSAP skip time and desync the two.
    gsap.ticker.lagSmoothing(0);
  }

  // Pin positions are measured from laid-out geometry. The display font is
  // ~13vw, so swapping it shifts every section boundary — without this refresh
  // each pin starts and ends at coordinates computed against fallback metrics.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  // Without this, each HMR pass leaves its predecessor's RAF loop running and
  // scrolling accelerates with every save.
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }

  return {
    // Null under prefers-reduced-motion — callers must guard before scrollTo.
    provide: { lenis },
  };
});
