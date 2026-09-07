import { gsap, ScrollTrigger, SplitText } from "~/utils/gsap";

export const ENTER = "top 82%";

type Trigger = Element | undefined | null;

export function revealLines(
  el: Trigger,
  trigger: Trigger,
  vars: gsap.TweenVars = {},
) {
  if (!el) return undefined;
  let played = false;

  return SplitText.create(el as HTMLElement, {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      if (played) return;
      return gsap.from(self.lines, {
        yPercent: 115,
        duration: 1.1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: trigger ?? (el as Element),
          start: ENTER,
          once: true,
        },
        ...vars,
        onComplete: () => {
          played = true;
        },
      });
    },
  });
}

export function riseIn(
  targets: gsap.TweenTarget,
  trigger: Trigger,
  vars: gsap.TweenVars = {},
) {
  return gsap.from(targets, {
    y: 40,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: { trigger: trigger ?? undefined, start: ENTER, once: true },
    ...vars,
  });
}

export function drawRule(targets: gsap.TweenTarget, trigger: Trigger) {
  return gsap.from(targets, {
    scaleX: 0,
    duration: 1.1,
    ease: "power3.out",
    transformOrigin: "left center",
    scrollTrigger: { trigger: trigger ?? undefined, start: ENTER, once: true },
  });
}

export function countUp(el: HTMLElement) {
  const to = Number(el.dataset.count);
  const from = Number(el.dataset.countFrom ?? 0);
  const suffix = el.dataset.countSuffix ?? "";
  if (!Number.isFinite(to)) return undefined;

  const counter = { value: from };
  el.textContent = from + suffix;

  return gsap.to(counter, {
    value: to,
    duration: 1.6,
    ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 88%", once: true },
    onUpdate: () => {
      el.textContent = Math.round(counter.value) + suffix;
    },
  });
}
