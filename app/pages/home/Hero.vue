<script setup lang="ts">
import { gsap, SplitText } from "~/utils/gsap";
import { useFps } from "@vueuse/core";
import { LINKS } from "@/utils/links";
import { useJumpTo } from "~/composables/useJump";

const { jumpTo } = useJumpTo();
const { rendersCanvas, downgrade } = useMotionTier();
const introComplete = useIntroComplete();
const isJoinModalOpen = ref(false);
const active = ref<string>("hero");

const ctaWrap = useTemplateRef<HTMLElement>("ctaWrap");
let idle: gsap.core.Tween | undefined;
let orbit: gsap.core.Tween | undefined;
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

onMounted(() => {
    if (!ctaWrap.value) return;

    idle = gsap.to(ctaWrap.value, {
        "--glow": 1,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
    });

    orbit = gsap.to(ctaWrap.value, {
        "--angle": 360,
        duration: 3,
        repeat: -1,
        ease: "none",
    });
});

function onEnter() {
    idle?.pause();
    gsap.to(ctaWrap.value, {
        "--glow": 1.6,
        duration: 0.3,
        ease: "power2.out",
    });
    orbit?.timeScale(2.2);
}

function onLeave() {
    gsap.to(ctaWrap.value, {
        "--glow": 0.4,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => idle?.resume(),
    });
    orbit?.timeScale(1);
}

function jumpToPath() {
    isJoinModalOpen.value = false;
    jumpTo(NAV_ITEMS[2].id);
}

onUnmounted(() => {
    idle?.kill();
    orbit?.kill();
});

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
            class="scrim-b pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-full"
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
                <UModal
                    v-model:open="isJoinModalOpen"
                    :title="$t('home.hero.ctaStudent')"
                    :ui="{
                        overlay: 'bg-black/80 backdrop-blur-sm',
                        content:
                            'bg-neutral-950 border border-primary-500/30 rounded-2xl shadow-[0_0_40px_-10px_rgba(34,197,94,0.4)]',
                        header: 'border-b border-white/10',
                        title: 'text-white font-semibold',
                        body: 'text-fg-muted',
                        close: 'text-white/60 hover:text-white',
                    }"
                >
                    <div ref="ctaWrap" class="neon-wrap inline-block">
                        <UButton
                            size="xl"
                            color="primary"
                            class="neon-cta px-8"
                            @mouseenter="onEnter"
                            @mouseleave="onLeave"
                        >
                            {{ $t("home.hero.ctaStudent") }}
                        </UButton>
                    </div>

                    <template #body>
                        <p class="text-sm text-gray-400 mb-4">
                            {{ $t("home.hero.joinModal.body") }}
                        </p>
                        <UButton color="primary" block @click="jumpToPath">
                            {{ $t(`home.nav.${NAV_ITEMS[2].key}`) }}
                        </UButton>
                    </template>
                </UModal>
            </div>
        </div>
    </section>
</template>
<style scoped>
.neon-wrap {
    --glow: 0.4;
    --angle: 0;
    --neon-color: #3fe822;
    position: relative;
    border-radius: 9999px;
    padding: 3px;
}

.neon-wrap::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background: conic-gradient(
        from calc(var(--angle) * 1deg),
        transparent 0deg,
        var(--neon-color) 25deg,
        transparent 70deg,
        transparent 360deg
    );
    -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    filter: blur(1px);
    pointer-events: none;
}

:deep(.neon-cta) {
    box-shadow:
        0 0 calc(8px * var(--glow)) var(--neon-color),
        0 0 calc(24px * var(--glow)) var(--neon-color),
        0 0 calc(48px * var(--glow))
            color-mix(in srgb, var(--neon-color) 60%, transparent);
}
</style>
