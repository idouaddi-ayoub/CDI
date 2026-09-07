export function useJumpTo() {
  const { $lenis } = useNuxtApp();

  function jumpTo(id: string) {
    const { $lenis, $ScrollTrigger } = useNuxtApp();
    const el = document.getElementById(id);
    if (!el) return;

    const pin = $ScrollTrigger.getAll().find((t) => t.pin && t.trigger === el);

    if ($lenis) $lenis.scrollTo(pin ? pin.end : el, { offset: 0 });
    else if (pin) window.scrollTo(0, pin.end);
    else el.scrollIntoView({ behavior: "auto", block: "start" });
  }

  return { jumpTo };
}
