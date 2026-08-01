/**
 * The one place that decides how much motion this visitor gets.
 *
 *   full   — desktop, fine pointer, motion allowed: pinning, cursor, post-fx
 *   lite   — touch or small viewport: canvas and reveals, no pin, no cursor
 *   static — prefers-reduced-motion: everything visible, nothing animates
 *
 * The canvas is deliberately *not* one of the things `full` gates. It is the
 * hero's subject on a phone exactly as it is on a desktop; what a small touch
 * device can't afford is pinned scroll-scrubbing and a full-screen bloom pass.
 * Read `rendersCanvas` for it, never `isFull`.
 *
 * Every timeline branches on this rather than re-testing media queries, so the
 * three tiers stay in sync and a section can't accidentally pin on mobile.
 */
export type MotionTier = "full" | "lite" | "static";

/** Below this, pinning costs more than it communicates. Matches Tailwind `lg`. */
const DESKTOP_MIN_WIDTH = 1024;

export function useMotionTier() {
  // Shared across every caller via useState, not per-component refs. Seven
  // components read the tier, and the FPS watchdog in the hero downgrades it
  // for all of them — with local refs the canvas would unmount while the
  // cursor and pinned timelines carried on as if nothing had happened.
  //
  // SSR seeds the safe tier: `/` is prerendered, so the static HTML must not
  // assume any capability. The client corrects it on mount.
  const tier = useState<MotionTier>("motion-tier", () => "static");

  /**
   * Set once a sustained-low-FPS reading has fired. Latched deliberately: a
   * device that couldn't cope shouldn't get the canvas back on the next resize.
   */
  const downgraded = useState<boolean>("motion-downgraded", () => false);

  /**
   * Whether this browser can give us a context at all. `null` until probed.
   * Shared state, not a local: the probe costs a real GL context and seven
   * components call this composable.
   */
  const webgl = useState<boolean | null>("motion-webgl", () => null);

  let queries: MediaQueryList[] = [];

  /**
   * Deliberately a feature check and not a trial context. Creating one costs a
   * driver init on the main thread, and the first component to call this
   * composable is the preloader — so the probe landed exactly on the frames
   * the intro animation needs. A browser with the API missing is the case
   * worth catching; a blocklisted driver is left to the canvas itself.
   */
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

  /** Drop to `lite` for the rest of the session — used by the FPS watchdog. */
  function downgrade() {
    downgraded.value = true;
    update();
  }

  onMounted(() => {
    // Before update(), so `rendersCanvas` never reports true for a browser
    // that has no WebGL to give.
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
    /** Pinning, scrubbed timelines, custom cursor, post-processing. */
    isFull: computed(() => tier.value === "full"),
    /** Any motion at all — false only under prefers-reduced-motion. */
    animates: computed(() => tier.value !== "static"),
    /**
     * The WebGL canvas: every tier that animates, touch included. The latched
     * downgrade is checked directly rather than through the tier, because a
     * downgrade only moves `full` to `lite` — and `lite` renders the canvas
     * too, so without this the watchdog would have nothing left to take away.
     */
    rendersCanvas: computed(
      () =>
        tier.value !== "static" && !downgraded.value && webgl.value !== false,
    ),
    downgrade,
  };
}
