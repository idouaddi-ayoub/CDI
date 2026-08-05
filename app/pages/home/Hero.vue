<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useFps } from "@vueuse/core";
import { LINKS, EXTERNAL_ATTRS } from "@/utils/links";

gsap.registerPlugin(ScrollTrigger, SplitText);

const { tier, isFull, animates, rendersCanvas, downgrade } = useMotionTier();
const introComplete = useIntroComplete();

const root = useTemplateRef<HTMLElement>("root");
const heading = useTemplateRef<HTMLHeadingElement>("heading");
const sub = useTemplateRef<HTMLParagraphElement>("sub");
const cta = useTemplateRef<HTMLDivElement>("cta");

const scrollProgress = ref(0);

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

let ctx: gsap.Context | undefined;
let entranceStarted = false;
let firstSplitDone = false;

function buildEntrance() {
    if (entranceStarted || !heading.value) return;
    entranceStarted = true;

    // Must stay in sync with the tween below: SplitText only fills `self.lines`
    // when the type asks for lines, and a tween on the resulting empty array
    // silently does nothing (GSAP logs "target  not found").
    SplitText.create(heading.value, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
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

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: root.value,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 0.6,

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
    await nextTick();

    ctx = gsap.context(() => {
        if (!animates.value) return;

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
                <LazyHeroCanvas :scroll="scrollProgress" :full="isFull" />
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
