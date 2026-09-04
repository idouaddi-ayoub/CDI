<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useFps } from "@vueuse/core";
import { LINKS, EXTERNAL_ATTRS } from "@/utils/links";

gsap.registerPlugin(ScrollTrigger, SplitText);

const { rendersCanvas, downgrade } = useMotionTier();
const introComplete = useIntroComplete();

const root = useTemplateRef<HTMLElement>("root");
const heading = useTemplateRef<HTMLParagraphElement>("heading");
const sub = useTemplateRef<HTMLParagraphElement>("sub");
const cta = useTemplateRef<HTMLDivElement>("cta");

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
    if (lowSince === null) lowSince = performance.now();
    else if (performance.now() - lowSince >= SUSTAINED_MS) downgrade();
});

let ctx: gsap.Context | undefined;
let entranceStarted = false;
let firstSplitDone = false;

function buildEntrance() {
    if (entranceStarted || !heading.value) return;
    entranceStarted = true;

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
}

onMounted(async () => {
    await nextTick();
    if (resolveMotionTier() === "static") return;

    ctx = gsap.context(() => {
        gsap.to([heading.value, sub.value, cta.value], {
            yPercent: -30,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: root.value!,
                start: "top top",
                end: "bottom 40%",
                scrub: 0.4,
            },
        });

        if (introComplete.value) {
            buildEntrance();
            return;
        }

        const stop = watch(introComplete, (done) => {
            if (!done) return;
            buildEntrance();
            stop();
        });
    }, root.value ?? undefined);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<template>
    <section
        id="hero"
        ref="root"
        class="relative flex min-h-svh flex-col justify-center px-6 pt-28 pb-8 sm:px-10"
    >
        <h1 class="sr-only">{{ $t("home.hero.full") }}</h1>

        <div
            aria-hidden="true"
            class="scrim-b pointer-events-none absolute inset-x-0 bottom-0 top-1/4 -z-10"
        />

        <div class="relative mx-auto w-full max-w-7xl">
            <p ref="heading" aria-hidden="true" class="display display-xl">
                {{ $t("home.hero.line1") }}<br />{{ $t("home.hero.line2") }}
            </p>

            <p
                ref="sub"
                class="mt-8 max-w-md text-base text-fg-muted sm:text-lg"
            >
                {{ $t("home.hero.sub") }}
            </p>

            <div ref="cta" class="mt-10 flex flex-wrap items-center gap-4">
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
    </section>
</template>
