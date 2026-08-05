import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Ref } from "vue";

/**
 * Baseline reveal for secondary elements: add `data-reveal` (optionally
 * `="left"` / `="right"`) and it fades in on entry.
 *
 * This is the *only* system allowed to touch a `[data-reveal]` node. Sections
 * running a bespoke timeline must not also mark their animated elements — two
 * systems writing the same opacity is how an element ends up stuck invisible.
 */
export function useScrollReveal(scope?: Ref<HTMLElement | null>) {
  let ctx: gsap.Context | null = null;

  onMounted(async () => {
    gsap.registerPlugin(ScrollTrigger);

    const root = scope?.value ?? document.body;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      gsap.set(els, { opacity: 1, x: 0, y: 0 });
      return;
    }

    ctx = gsap.context(() => {
      els.forEach((el) => {
        const dir = el.dataset.reveal || "up";
        const vars: gsap.TweenVars = { opacity: 0 };
        if (dir === "up") vars.y = 40;
        if (dir === "left") vars.x = -40;
        if (dir === "right") vars.x = 40;
        gsap.set(el, vars);
      });

      ScrollTrigger.batch(els, {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: true,
            // Release the compositor layer that main.css requests via
            // will-change; with pinned sections on the same page, stale layers
            // accumulate quickly.
            onComplete: () => gsap.set(batch, { willChange: "auto" }),
          }),
      });
    }, root);

    await nextTick();
    ScrollTrigger.refresh();
  });

  onUnmounted(() => ctx?.revert());
}
