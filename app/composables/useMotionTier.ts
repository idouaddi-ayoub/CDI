export type MotionTier = "full" | "lite" | "static";

const DESKTOP_MIN_WIDTH = 1024;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const FINE_POINTER = "(pointer: fine)";
const WIDE_VIEWPORT = `(min-width: ${DESKTOP_MIN_WIDTH}px)`;

export function resolveMotionTier(downgraded = false): MotionTier {
  if (!import.meta.client) return "static";
  if (window.matchMedia(REDUCED_MOTION).matches) return "static";
  if (downgraded) return "lite";
  if (!window.matchMedia(FINE_POINTER).matches) return "lite";
  if (!window.matchMedia(WIDE_VIEWPORT).matches) return "lite";
  return "full";
}

function probeWebGL(): boolean {
  if (!import.meta.client) return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    if (!gl) return false;
    const lose = (gl as WebGLRenderingContext).getExtension(
      "WEBGL_lose_context",
    ) as { loseContext(): void } | null;
    lose?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function useMotionTier() {
  const tier = useState<MotionTier>("motion-tier", () => "static");
  const downgraded = useState<boolean>("motion-downgraded", () => false);
  const webgl = useState<boolean | null>("motion-webgl", () => null);

  let queries: MediaQueryList[] = [];

  function update() {
    tier.value = resolveMotionTier(downgraded.value);
  }

  function downgrade() {
    if (downgraded.value) return;
    downgraded.value = true;
    update();
  }

  onMounted(() => {
    if (webgl.value === null) webgl.value = probeWebGL();

    queries = [REDUCED_MOTION, FINE_POINTER, WIDE_VIEWPORT].map((q) =>
      window.matchMedia(q),
    );
    queries.forEach((q) => q.addEventListener("change", update));
    update();
  });

  onUnmounted(() => {
    queries.forEach((q) => q.removeEventListener("change", update));
    queries = [];
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
