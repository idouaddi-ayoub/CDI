export type MotionTier = "full" | "lite" | "static";

const DESKTOP_MIN_WIDTH = 1024;

export function useMotionTier() {
  const tier = useState<MotionTier>("motion-tier", () => "static");

  const downgraded = useState<boolean>("motion-downgraded", () => false);

  const webgl = useState<boolean | null>("motion-webgl", () => null);

  let queries: MediaQueryList[] = [];

  function supportsWebGL() {
    return (
      typeof WebGL2RenderingContext !== "undefined" ||
      typeof WebGLRenderingContext !== "undefined"
    );
  }

  function resolve() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return "static" as const;
    }
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const wide = window.innerWidth >= DESKTOP_MIN_WIDTH;
    if (downgraded.value || !finePointer || !wide) return "lite" as const;
    return "full" as const;
  }

  function update() {
    tier.value = resolve();
  }

  function downgrade() {
    downgraded.value = true;
    update();
  }

  onMounted(() => {
    if (webgl.value === null) webgl.value = supportsWebGL();

    queries = [
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(pointer: fine)"),
      window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`),
    ];
    queries.forEach((q) => q.addEventListener("change", update));
    update();
  });

  onUnmounted(() => {
    queries.forEach((q) => q.removeEventListener("change", update));
  });

  return {
    tier: readonly(tier),
    isFull: computed(() => tier.value === "full"),
    animates: computed(() => tier.value !== "static"),

    rendersCanvas: computed(
      () =>
        tier.value !== "static" && !downgraded.value && webgl.value !== false,
    ),
    downgrade,
  };
}
