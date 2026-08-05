<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useFps } from "@vueuse/core";
import Scene from "@/components/Scene.vue";
import { LINKS, EXTERNAL_ATTRS } from "@/utils/links";

gsap.registerPlugin(ScrollTrigger, SplitText);

const { tier, isFull, animates, rendersCanvas, downgrade } = useMotionTier();
const introComplete = useIntroComplete();

const root = useTemplateRef<HTMLElement>("root");
const heading = useTemplateRef<HTMLHeadingElement>("heading");
const sub = useTemplateRef<HTMLParagraphElement>("sub");
const cta = useTemplateRef<HTMLDivElement>("cta");

/** 0 at rest, 1 when the hero has fully scrolled away. Read by <Scene>. */
const scrollProgress = ref(0);

const gl = { clearColor: "#000000", alpha: true, antialias: true };

/* ---------------------------------------------------------------------- *
 * Performance watchdog
 *
 * Replaces an on-screen FPS counter and a "your animations are slow" toast
 * that shipped to production. A visitor whose device is struggling should not
 * be asked to diagnose it — take the canvas away and say nothing.
 *
 * Watches whenever the canvas is up, not just at the full tier: phones are
 * where this is most likely to fire, and since the downgrade is what unmounts
 * the canvas, guarding on `rendersCanvas` also stops it re-arming afterwards.
 * ---------------------------------------------------------------------- */
const fps = useFps({ every: 10 });
const FPS_FLOOR = 30;
const SUSTAINED_MS = 2500;
let lowSince: number | null = null;

watch(fps, (value) => {
    if (!rendersCanvas.value) return;
    if (value >= FPS_FLOOR) {
        lowSince = null;
        return;
    }
    if (lowSince === null) {
        lowSince = performance.now();
    } else if (performance.now() - lowSince >= SUSTAINED_MS) {
        downgrade();
    }
});

/* ---------------------------------------------------------------------- *
 * Timelines
 * ---------------------------------------------------------------------- */
let ctx: gsap.Context | undefined;
let entranceStarted = false;
let firstSplitDone = false;

function buildEntrance() {
    if (entranceStarted || !heading.value) return;
    entranceStarted = true;

    // autoSplit re-splits when the webfont swaps in or the box is resized.
    // Without it, lines measured against fallback metrics keep their old wrap
    // points and the masks clip mid-word.
    // Must stay in sync with the tween below: SplitText only fills `self.lines`
    // when the type asks for lines, and a tween on the resulting empty array
    // silently does nothing (GSAP logs "target  not found").
    SplitText.create(heading.value, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
            // Only the first split is an entrance; later ones are reflows
            // (font swap, resize) and must leave the type where it is.
            if (firstSplitDone) return;
            firstSplitDone = true;
            return gsap.from(self.lines, {
                yPercent: 115,
                duration: 1.1,
                stagger: 0.11,
                ease: "power4.out",
            });
        },
    });

    gsap.from([sub.value, cta.value], {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.45,
        ease: "power3.out",
    });
}

function buildScrollTimeline() {
    if (!root.value) return;

    // Pinned hand-off: the type lifts and fades while <Scene> turns the
    // wordmark edge-on and pushes it back, so the two exits read as one move.
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: root.value,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 0.6,
            // Refreshed before every other trigger on the page. This pin is
            // built a tick late (see onMounted), so in creation order it lands
            // *after* the sections below it — and ScrollTrigger refreshes in
            // creation order unless some trigger declares a priority. Without
            // this, everything downstream measures its start with the hero's
            // 150% pin spacer missing and fires a viewport and a half early.
            refreshPriority: 2,
            onUpdate: (self) => {
                scrollProgress.value = self.progress;
            },
        },
    });

    tl.to(heading.value, { yPercent: -55, opacity: 0, ease: "none" }, 0)
        .to(sub.value, { yPercent: -80, opacity: 0, ease: "none" }, 0.02)
        .to(cta.value, { yPercent: -110, opacity: 0, ease: "none" }, 0.04);
}

onMounted(async () => {
    // The tier resolves in useMotionTier's onMounted, immediately before this
    // one, which swaps the `v-if` headline. Without a tick, `heading` still
    // points at the element that is about to be discarded.
    await nextTick();

    ctx = gsap.context(() => {
        if (!animates.value) return;

        // The entrance waits behind the preloader; the scroll timeline does
        // not, because the visitor may already have scrolled by then.
        if (isFull.value) buildScrollTimeline();

        if (introComplete.value) {
            buildEntrance();
        } else {
            const stop = watch(introComplete, (done) => {
                if (!done) return;
                buildEntrance();
                stop();
            });
        }
    }, root.value ?? undefined);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<template>
    <section
        id="hero"
        ref="root"
        class="relative flex h-svh items-center overflow-hidden"
    >
        <div v-if="rendersCanvas" class="absolute inset-0 -z-10">
            <ClientOnly>
                <!-- Phones carry a 3x device ratio on a GPU that can't spend
                     it. Capping lower there costs a little edge crispness and
                     roughly halves the fragments the wordmark has to shade. -->
                <TresCanvas v-bind="gl" :dpr="isFull ? [1, 1.75] : [1, 1.5]">
                    <Suspense>
                        <Scene :scroll="scrollProgress" />
                    </Suspense>
                    <!-- Desktop only. A full-screen mipmap-blur bloom is the
                         single most expensive thing in this scene, and on a
                         phone it would spend the frame budget that keeps the
                         wordmark itself on screen. -->
                    <Suspense v-if="isFull">
                        <EffectComposerPmndrs>
                            <BloomPmndrs
                                :intensity="0.45"
                                :luminance-threshold="0.55"
                                :luminance-smoothing="0.5"
                                :radius="0.7"
                                :mipmap-blur="true"
                            />
                        </EffectComposerPmndrs>
                    </Suspense>
                </TresCanvas>
            </ClientOnly>
        </div>

        <div
            v-else
            class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_70%_45%,rgba(34,197,94,0.16),transparent_70%)]"
            aria-hidden="true"
        />

        <p class="eyebrow absolute inset-x-6 top-24 sm:inset-x-10">
            CDI — ENCG Agadir
        </p>

        <h1 class="sr-only">{{ $t("home.hero.full") }}</h1>

        <div
            class="absolute inset-x-0 bottom-24 mx-auto w-full max-w-7xl px-6 sm:px-10"
        >
            <p
                v-if="rendersCanvas"
                ref="heading"
                aria-hidden="true"
                class="display text-4xl sm:text-6xl lg:text-7xl"
            >
                {{ $t("home.hero.lead") }}
            </p>
            <!-- No canvas, so the HTML has to render the whole headline —
                 otherwise the page reads "Become more with" and stops. This
                 tracks the canvas, not the tier: the lead-in only makes sense
                 when the wordmark is on screen to finish the sentence. -->
            <p
                v-else
                ref="heading"
                aria-hidden="true"
                class="display display-xl"
            >
                {{ $t("home.hero.line1") }}<br />{{ $t("home.hero.line2") }}
            </p>

            <p ref="sub" class="mt-6 max-w-md text-lg text-fg-muted sm:text-xl">
                {{ $t("home.hero.sub") }}
            </p>

            <div ref="cta" class="mt-8 flex flex-wrap items-center gap-4">
                <UButton
                    :to="LINKS.join"
                    v-bind="EXTERNAL_ATTRS"
                    size="xl"
                    color="primary"
                    class="px-8"
                >
                    {{ $t("home.hero.ctaStudent") }}
                </UButton>
                <UButton
                    :to="LINKS.business"
                    size="xl"
                    variant="outline"
                    class="px-8"
                >
                    {{ $t("home.hero.ctaBusiness") }}
                </UButton>
            </div>
        </div>

        <div
            class="absolute inset-x-6 bottom-8 flex items-end justify-between text-xs uppercase tracking-[0.24em] text-fg-muted/70 sm:inset-x-10"
        >
            <span class="flex items-center gap-3">
                {{ $t("home.hero.scroll") }}
                <UIcon
                    name="i-lucide-arrow-down"
                    class="size-4"
                    :class="tier !== 'static' && 'animate-bounce'"
                />
            </span>
            <span>{{ $t("home.hero.since") }}</span>
        </div>
    </section>
</template>
